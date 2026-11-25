import type { APIRoute } from 'astro';
import { CLAIMS_FROM_EMAIL, RESEND_API_KEY, TURNSTILE_SECRET_KEY } from 'astro:env/server';
import { site } from '@/data/site';
import {
  claimSchema,
  formatPeruDateTime,
  generateClaimCode,
  type ClaimPayload,
} from '@/utils/claimsSchema';

export const prerender = false;

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildEmailHtml(code: string, submittedAt: string, data: ClaimPayload): string {
  const rows: [string, string][] = [
    ['Código de hoja de reclamación', code],
    ['Fecha y hora (Perú)', submittedAt],
    ['Proveedor', `${site.legal.entity} (RUC: ${site.legal.ruc})`],
    ['Domicilio del proveedor', site.legal.address],
    ['Consumidor', data.fullName],
    ['Documento', `${data.documentType} ${data.documentNumber}`],
    ['Domicilio', data.address],
    ['Teléfono', data.phone],
    ['Correo electrónico', data.email],
    ...(data.isMinor
      ? ([['Padre / madre / apoderado', `${data.guardianName} (${data.guardianDocument})`]] as [
          string,
          string,
        ][])
      : []),
    ['Bien contratado', data.itemType === 'servicio' ? 'Servicio' : 'Producto'],
    ['Monto reclamado', data.amount ? `S/ ${data.amount}` : 'No especificado'],
    ['Descripción del bien', data.itemDescription],
    ['Tipo', data.claimType === 'reclamo' ? 'Reclamo' : 'Queja'],
    ['Detalle', data.detail],
    ['Pedido del consumidor', data.request],
  ];

  const bodyRows = rows
    .map(
      ([label, val]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e3e6e1;font-weight:600;color:#0f1a13;width:36%;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #e3e6e1;color:#262626;white-space:pre-wrap;">${escapeHtml(val)}</td></tr>`,
    )
    .join('');

  return `
    <div style="font-family:'Albert Sans',Arial,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#0f1a13;">
      <h1 style="font-size:22px;margin:0 0 8px;">Hoja de Reclamación ${escapeHtml(code)}</h1>
      <p style="margin:0 0 20px;color:#4a564e;">
        Constancia de registro en el Libro de Reclamaciones Virtual de Quina (D.S. N.° 011-2011-PCM).
        Responderemos dentro de un plazo máximo improrrogable de <strong>15 días hábiles</strong>.
      </p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e3e6e1;border-radius:12px;">
        <tbody>${bodyRows}</tbody>
      </table>
      <p style="margin:20px 0 0;font-size:12px;color:#4a564e;">
        La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es
        requisito previo para interponer una denuncia ante el INDECOPI.
      </p>
    </div>
  `;
}

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;

  const form = new URLSearchParams();
  form.set('secret', TURNSTILE_SECRET_KEY);
  form.set('response', token);
  if (ip) form.set('remoteip', ip);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  });
  if (!res.ok) return false;
  const result = (await res.json()) as { success?: boolean };
  return result.success === true;
}

async function sendResendEmail(to: string[], subject: string, html: string): Promise<boolean> {
  if (!RESEND_API_KEY) return false;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: CLAIMS_FROM_EMAIL,
      to,
      subject,
      html,
    }),
  });
  return res.ok;
}

export const POST: APIRoute = async ({ request }) => {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Solicitud inválida.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const parsed = claimSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'Revisa los campos marcados antes de enviar tu hoja de reclamación.',
        fieldErrors,
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
  const verified = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!verified) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'No pudimos completar la verificación de seguridad. Intenta nuevamente.',
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const now = new Date();
  const code = generateClaimCode(now);
  const submittedAt = formatPeruDateTime(now);
  const html = buildEmailHtml(code, submittedAt, parsed.data);
  const subject = `Hoja de Reclamación ${code} · Quina`;

  let emailDispatched = false;
  if (RESEND_API_KEY) {
    const [toCustomer, toProvider] = await Promise.all([
      sendResendEmail([parsed.data.email], subject, html),
      sendResendEmail([site.contactEmail], `[Nuevo ${parsed.data.claimType}] ${subject}`, html),
    ]);
    emailDispatched = toCustomer && toProvider;
  }

  return new Response(
    JSON.stringify({
      ok: true,
      code,
      submittedAt,
      deadlineText: '15 días hábiles improrrogables',
      emailDispatched,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
};
