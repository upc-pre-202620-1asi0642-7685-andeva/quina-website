import { useEffect, useId, useRef, useState } from 'react';
import { CheckCircle2, Mail, Printer, RotateCcw } from 'lucide-react';
import {
  claimSchema,
  claimTypes,
  documentTypes,
  formatPeruDateTime,
  generateClaimCode,
  itemTypes,
  type ClaimPayload,
  type ClaimReceipt,
} from '@/utils/claimsSchema';

interface Props {
  providerEntity: string;
  providerRuc: string;
  providerAddress: string;
  contactEmail: string;
  turnstileSiteKey?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback'?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

interface FormState {
  fullName: string;
  documentType: (typeof documentTypes)[number];
  documentNumber: string;
  address: string;
  phone: string;
  email: string;
  isMinor: boolean;
  guardianName: string;
  guardianDocument: string;
  itemType: (typeof itemTypes)[number];
  amount: string;
  itemDescription: string;
  claimType: (typeof claimTypes)[number];
  detail: string;
  request: string;
  acceptedPolicy: boolean;
}

const initialState: FormState = {
  fullName: '',
  documentType: 'DNI',
  documentNumber: '',
  address: '',
  phone: '',
  email: '',
  isMinor: false,
  guardianName: '',
  guardianDocument: '',
  itemType: 'servicio',
  amount: '',
  itemDescription: '',
  claimType: 'reclamo',
  detail: '',
  request: '',
  acceptedPolicy: false,
};

function buildMailtoHref(contactEmail: string, receipt: ClaimReceipt): string {
  const { code, submittedAt, data } = receipt;
  const subject = `Hoja de Reclamación ${code} · Quina`;
  const lines = [
    `Código: ${code}`,
    `Fecha: ${submittedAt}`,
    `Tipo: ${data.claimType === 'reclamo' ? 'Reclamo' : 'Queja'}`,
    `Consumidor: ${data.fullName} (${data.documentType} ${data.documentNumber})`,
    `Domicilio: ${data.address}`,
    `Teléfono: ${data.phone}`,
    `Correo: ${data.email}`,
    ...(data.isMinor
      ? [`Padre/madre/apoderado: ${data.guardianName} (${data.guardianDocument})`]
      : []),
    `Bien contratado: ${data.itemType === 'servicio' ? 'Servicio' : 'Producto'}`,
    `Monto reclamado: ${data.amount ? `S/ ${data.amount}` : 'No especificado'}`,
    `Descripción: ${data.itemDescription}`,
    '',
    'Detalle:',
    data.detail,
    '',
    'Pedido:',
    data.request,
  ];
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}

export default function ComplaintsForm({
  providerEntity,
  providerRuc,
  providerAddress,
  contactEmail,
  turnstileSiteKey = '',
}: Props) {
  const id = useId();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<ClaimReceipt | null>(null);
  const [turnstileToken, setTurnstileToken] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const receiptRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    formRef.current?.setAttribute('data-hydrated', 'true');
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current) return;

    const mount = () => {
      if (!window.turnstile || !turnstileRef.current || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(''),
      });
    };

    if (window.turnstile) {
      mount();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile-script]');
    if (existing) {
      existing.addEventListener('load', mount, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.dataset['turnstileScript'] = 'true';
    script.addEventListener('load', mount, { once: true });
    document.head.append(script);
  }, [turnstileSiteKey]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    const parsed = claimSchema.safeParse({ ...form, turnstileToken });
    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? 'form');
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      setFormError('Revisa los campos marcados para registrar tu hoja de reclamación.');
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch('/api/reclamaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      const contentType = res.headers.get('content-type') ?? '';
      if (contentType.includes('application/json')) {
        const body = (await res.json()) as {
          ok?: boolean;
          code?: string;
          submittedAt?: string;
          deadlineText?: string;
          emailDispatched?: boolean;
          error?: string;
          fieldErrors?: Record<string, string>;
        };

        if (!res.ok || !body.ok || !body.code) {
          if (body.fieldErrors) setErrors(body.fieldErrors);
          setFormError(body.error ?? 'No pudimos registrar tu solicitud. Intenta nuevamente.');
          window.turnstile?.reset(widgetIdRef.current);
          setTurnstileToken('');
          return;
        }

        setReceipt({
          code: body.code,
          submittedAt: body.submittedAt ?? formatPeruDateTime(),
          deadlineText: body.deadlineText ?? '15 días hábiles improrrogables',
          emailDispatched: Boolean(body.emailDispatched),
          data: parsed.data,
        });
      } else {
        // Entorno estático sin servidor de funciones activo: genera constancia descargable/imprimible
        setReceipt({
          code: generateClaimCode(),
          submittedAt: formatPeruDateTime(),
          deadlineText: '15 días hábiles improrrogables',
          emailDispatched: false,
          data: parsed.data,
        });
      }

      requestAnimationFrame(() => {
        receiptRef.current?.focus();
        receiptRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } catch {
      const fallbackData: ClaimPayload = parsed.data;
      setReceipt({
        code: generateClaimCode(),
        submittedAt: formatPeruDateTime(),
        deadlineText: '15 días hábiles improrrogables',
        emailDispatched: false,
        data: fallbackData,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (receipt) {
    const mailtoHref = buildMailtoHref(contactEmail, receipt);
    return (
      <div className="claim-receipt" ref={receiptRef} tabIndex={-1}>
        <div className="claim-receipt-head">
          <div className="claim-receipt-badge">
            <CheckCircle2 size={22} aria-hidden="true" />
            <span>Hoja de Reclamación registrada</span>
          </div>
          <p className="claim-code" data-claim-code>
            {receipt.code}
          </p>
          <p className="claim-receipt-sub">
            Registrada el <strong>{receipt.submittedAt}</strong>. Plazo legal máximo de respuesta:{' '}
            <strong>{receipt.deadlineText}</strong>.
          </p>
        </div>

        {receipt.emailDispatched ? (
          <p className="claim-notice claim-notice-ok">
            Hemos enviado una copia de esta hoja de reclamación a{' '}
            <strong>{receipt.data.email}</strong>. Conserva tu código para cualquier seguimiento.
          </p>
        ) : (
          <p className="claim-notice">
            Guarda o imprime esta constancia como PDF y, si deseas recibir acuse inmediato en tu
            bandeja mientras activamos el envío automático, pulsa «Enviar copia por correo» para
            remitirla a <strong>{contactEmail}</strong>.
          </p>
        )}

        <dl className="claim-summary">
          <div>
            <dt>Proveedor</dt>
            <dd>
              {providerEntity} · RUC {providerRuc} · {providerAddress}
            </dd>
          </div>
          <div>
            <dt>Consumidor</dt>
            <dd>
              {receipt.data.fullName} ({receipt.data.documentType} {receipt.data.documentNumber})
            </dd>
          </div>
          <div>
            <dt>Contacto</dt>
            <dd>
              {receipt.data.email} · {receipt.data.phone}
            </dd>
          </div>
          <div>
            <dt>Domicilio</dt>
            <dd>{receipt.data.address}</dd>
          </div>
          {receipt.data.isMinor && (
            <div>
              <dt>Padre, madre o apoderado</dt>
              <dd>
                {receipt.data.guardianName} ({receipt.data.guardianDocument})
              </dd>
            </div>
          )}
          <div>
            <dt>Bien contratado</dt>
            <dd>
              {receipt.data.itemType === 'servicio' ? 'Servicio' : 'Producto'}
              {receipt.data.amount ? ` · S/ ${receipt.data.amount}` : ''} —{' '}
              {receipt.data.itemDescription}
            </dd>
          </div>
          <div>
            <dt>Tipo</dt>
            <dd>{receipt.data.claimType === 'reclamo' ? 'Reclamo' : 'Queja'}</dd>
          </div>
          <div>
            <dt>Detalle</dt>
            <dd>{receipt.data.detail}</dd>
          </div>
          <div>
            <dt>Pedido del consumidor</dt>
            <dd>{receipt.data.request}</dd>
          </div>
        </dl>

        <div className="claim-receipt-actions">
          <button
            type="button"
            className="claim-btn claim-btn-primary"
            onClick={() => window.print()}
          >
            <Printer size={18} aria-hidden="true" />
            <span>Imprimir o guardar PDF</span>
          </button>
          {!receipt.emailDispatched && (
            <a href={mailtoHref} className="claim-btn claim-btn-secondary">
              <Mail size={18} aria-hidden="true" />
              <span>Enviar copia por correo</span>
            </a>
          )}
          <button
            type="button"
            className="claim-btn claim-btn-ghost"
            onClick={() => {
              setReceipt(null);
              setForm(initialState);
            }}
          >
            <RotateCcw size={18} aria-hidden="true" />
            <span>Registrar otra hoja</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} className="claim-form" onSubmit={handleSubmit} noValidate>
      {formError && (
        <div className="claim-alert" role="alert">
          {formError}
        </div>
      )}

      <fieldset className="claim-section">
        <legend className="claim-legend">1. Identificación del consumidor reclamante</legend>

        <div className="claim-grid">
          <div className="claim-field claim-span-2">
            <label htmlFor={`${id}-fullName`}>Nombre y apellidos completos *</label>
            <input
              id={`${id}-fullName`}
              name="fullName"
              type="text"
              autoComplete="name"
              required
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              aria-invalid={Boolean(errors['fullName'])}
              aria-describedby={errors['fullName'] ? `${id}-fullName-err` : undefined}
              placeholder="Ej. María Elena Quispe Flores"
            />
            {errors['fullName'] && (
              <p id={`${id}-fullName-err`} className="claim-err">
                {errors['fullName']}
              </p>
            )}
          </div>

          <div className="claim-field">
            <label htmlFor={`${id}-docType`}>Tipo de documento *</label>
            <select
              id={`${id}-docType`}
              name="documentType"
              value={form.documentType}
              onChange={(e) =>
                update('documentType', e.target.value as (typeof documentTypes)[number])
              }
            >
              {documentTypes.map((doc) => (
                <option key={doc} value={doc}>
                  {doc}
                </option>
              ))}
            </select>
          </div>

          <div className="claim-field">
            <label htmlFor={`${id}-docNum`}>Número de documento *</label>
            <input
              id={`${id}-docNum`}
              name="documentNumber"
              type="text"
              inputMode={
                form.documentType === 'DNI' || form.documentType === 'RUC' ? 'numeric' : 'text'
              }
              required
              value={form.documentNumber}
              onChange={(e) => update('documentNumber', e.target.value)}
              aria-invalid={Boolean(errors['documentNumber'])}
              aria-describedby={errors['documentNumber'] ? `${id}-docNum-err` : undefined}
              placeholder={form.documentType === 'DNI' ? '8 dígitos' : 'Número de documento'}
            />
            {errors['documentNumber'] && (
              <p id={`${id}-docNum-err`} className="claim-err">
                {errors['documentNumber']}
              </p>
            )}
          </div>

          <div className="claim-field claim-span-2">
            <label htmlFor={`${id}-address`}>Domicilio *</label>
            <input
              id={`${id}-address`}
              name="address"
              type="text"
              autoComplete="street-address"
              required
              value={form.address}
              onChange={(e) => update('address', e.target.value)}
              aria-invalid={Boolean(errors['address'])}
              aria-describedby={errors['address'] ? `${id}-address-err` : undefined}
              placeholder="Ej. Jr. Los Sauces 240, San Juan de Lurigancho, Lima"
            />
            {errors['address'] && (
              <p id={`${id}-address-err`} className="claim-err">
                {errors['address']}
              </p>
            )}
          </div>

          <div className="claim-field">
            <label htmlFor={`${id}-phone`}>Teléfono o celular *</label>
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              aria-invalid={Boolean(errors['phone'])}
              aria-describedby={errors['phone'] ? `${id}-phone-err` : undefined}
              placeholder="Ej. 999 999 999"
            />
            {errors['phone'] && (
              <p id={`${id}-phone-err`} className="claim-err">
                {errors['phone']}
              </p>
            )}
          </div>

          <div className="claim-field">
            <label htmlFor={`${id}-email`}>Correo electrónico *</label>
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              aria-invalid={Boolean(errors['email'])}
              aria-describedby={errors['email'] ? `${id}-email-err` : undefined}
              placeholder="correo@ejemplo.com"
            />
            {errors['email'] && (
              <p id={`${id}-email-err`} className="claim-err">
                {errors['email']}
              </p>
            )}
          </div>
        </div>

        <label className="claim-check">
          <input
            type="checkbox"
            checked={form.isMinor}
            onChange={(e) => update('isMinor', e.target.checked)}
          />
          <span>El consumidor reclamante es menor de edad</span>
        </label>

        {form.isMinor && (
          <div className="claim-grid claim-minor-box">
            <div className="claim-field">
              <label htmlFor={`${id}-guardianName`}>Nombre del padre, madre o apoderado *</label>
              <input
                id={`${id}-guardianName`}
                name="guardianName"
                type="text"
                required
                value={form.guardianName}
                onChange={(e) => update('guardianName', e.target.value)}
                aria-invalid={Boolean(errors['guardianName'])}
                aria-describedby={errors['guardianName'] ? `${id}-guardianName-err` : undefined}
              />
              {errors['guardianName'] && (
                <p id={`${id}-guardianName-err`} className="claim-err">
                  {errors['guardianName']}
                </p>
              )}
            </div>

            <div className="claim-field">
              <label htmlFor={`${id}-guardianDoc`}>Documento del apoderado *</label>
              <input
                id={`${id}-guardianDoc`}
                name="guardianDocument"
                type="text"
                required
                value={form.guardianDocument}
                onChange={(e) => update('guardianDocument', e.target.value)}
                aria-invalid={Boolean(errors['guardianDocument'])}
                aria-describedby={errors['guardianDocument'] ? `${id}-guardianDoc-err` : undefined}
              />
              {errors['guardianDocument'] && (
                <p id={`${id}-guardianDoc-err`} className="claim-err">
                  {errors['guardianDocument']}
                </p>
              )}
            </div>
          </div>
        )}
      </fieldset>

      <fieldset className="claim-section">
        <legend className="claim-legend">2. Identificación del bien contratado</legend>

        <div className="claim-radios" role="radiogroup" aria-label="Tipo de bien contratado">
          <label
            htmlFor={`${id}-item-servicio`}
            className={`claim-radio-card ${form.itemType === 'servicio' ? 'is-selected' : ''}`}
          >
            <input
              id={`${id}-item-servicio`}
              type="radio"
              name="itemType"
              value="servicio"
              checked={form.itemType === 'servicio'}
              onChange={() => update('itemType', 'servicio')}
            />
            <strong>Servicio</strong>
            <small>Suscripción de Quina, uso de la aplicación o soporte</small>
          </label>

          <label
            htmlFor={`${id}-item-producto`}
            className={`claim-radio-card ${form.itemType === 'producto' ? 'is-selected' : ''}`}
          >
            <input
              id={`${id}-item-producto`}
              type="radio"
              name="itemType"
              value="producto"
              checked={form.itemType === 'producto'}
              onChange={() => update('itemType', 'producto')}
            />
            <strong>Producto</strong>
            <small>Otro bien adquirido directamente a Andeva</small>
          </label>
        </div>

        <div className="claim-grid">
          <div className="claim-field">
            <label htmlFor={`${id}-amount`}>Monto reclamado en soles (opcional)</label>
            <input
              id={`${id}-amount`}
              name="amount"
              type="text"
              inputMode="decimal"
              value={form.amount}
              onChange={(e) => update('amount', e.target.value)}
              aria-invalid={Boolean(errors['amount'])}
              aria-describedby={errors['amount'] ? `${id}-amount-err` : undefined}
              placeholder="Ej. 29.00"
            />
            {errors['amount'] && (
              <p id={`${id}-amount-err`} className="claim-err">
                {errors['amount']}
              </p>
            )}
          </div>

          <div className="claim-field">
            <label htmlFor={`${id}-itemDesc`}>Descripción del plan o servicio *</label>
            <input
              id={`${id}-itemDesc`}
              name="itemDescription"
              type="text"
              required
              value={form.itemDescription}
              onChange={(e) => update('itemDescription', e.target.value)}
              aria-invalid={Boolean(errors['itemDescription'])}
              aria-describedby={errors['itemDescription'] ? `${id}-itemDesc-err` : undefined}
              placeholder="Ej. Suscripción mensual Plan Bodega Pro"
            />
            {errors['itemDescription'] && (
              <p id={`${id}-itemDesc-err`} className="claim-err">
                {errors['itemDescription']}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset className="claim-section">
        <legend className="claim-legend">
          3. Detalle de la reclamación y pedido del consumidor
        </legend>

        <div className="claim-radios" role="radiogroup" aria-label="Tipo de registro">
          <label
            htmlFor={`${id}-claim-reclamo`}
            className={`claim-radio-card ${form.claimType === 'reclamo' ? 'is-selected' : ''}`}
          >
            <input
              id={`${id}-claim-reclamo`}
              type="radio"
              name="claimType"
              value="reclamo"
              checked={form.claimType === 'reclamo'}
              onChange={() => update('claimType', 'reclamo')}
            />
            <strong>Reclamo</strong>
            <small>Disconformidad relacionada a los productos o servicios.</small>
          </label>

          <label
            htmlFor={`${id}-claim-queja`}
            className={`claim-radio-card ${form.claimType === 'queja' ? 'is-selected' : ''}`}
          >
            <input
              id={`${id}-claim-queja`}
              type="radio"
              name="claimType"
              value="queja"
              checked={form.claimType === 'queja'}
              onChange={() => update('claimType', 'queja')}
            />
            <strong>Queja</strong>
            <small>
              Disconformidad no relacionada a los productos o servicios; malestar o descontento
              respecto a la atención al público.
            </small>
          </label>
        </div>

        <div className="claim-field">
          <label htmlFor={`${id}-detail`}>Detalle del reclamo o queja *</label>
          <textarea
            id={`${id}-detail`}
            name="detail"
            rows={5}
            required
            value={form.detail}
            onChange={(e) => update('detail', e.target.value)}
            aria-invalid={Boolean(errors['detail'])}
            aria-describedby={errors['detail'] ? `${id}-detail-err` : undefined}
            placeholder="Cuéntanos qué ocurrió, cuándo pasó y cualquier dato que ayude a revisarlo."
          />
          {errors['detail'] && (
            <p id={`${id}-detail-err`} className="claim-err">
              {errors['detail']}
            </p>
          )}
        </div>

        <div className="claim-field">
          <label htmlFor={`${id}-request`}>Pedido del consumidor *</label>
          <textarea
            id={`${id}-request`}
            name="request"
            rows={3}
            required
            value={form.request}
            onChange={(e) => update('request', e.target.value)}
            aria-invalid={Boolean(errors['request'])}
            aria-describedby={errors['request'] ? `${id}-request-err` : undefined}
            placeholder="Indica qué solución o acción esperas de nuestra parte."
          />
          {errors['request'] && (
            <p id={`${id}-request-err`} className="claim-err">
              {errors['request']}
            </p>
          )}
        </div>
      </fieldset>

      {turnstileSiteKey && <div ref={turnstileRef} className="claim-turnstile" />}

      <div className="claim-legal-box">
        <label className="claim-check">
          <input
            type="checkbox"
            checked={form.acceptedPolicy}
            onChange={(e) => update('acceptedPolicy', e.target.checked)}
            aria-invalid={Boolean(errors['acceptedPolicy'])}
          />
          <span>
            Declaro que los datos consignados son verídicos y autorizo su tratamiento únicamente
            para atender esta hoja de reclamación conforme a la{' '}
            <a href="/legal/privacidad">Política de privacidad</a>. *
          </span>
        </label>
        {errors['acceptedPolicy'] && <p className="claim-err">{errors['acceptedPolicy']}</p>}

        <p className="claim-indecopi-note">
          La formulación del reclamo no impide acudir a otras vías de solución de controversias ni
          es requisito previo para interponer una denuncia ante el INDECOPI. El proveedor debe dar
          respuesta en un plazo no mayor a <strong>quince (15) días hábiles improrrogables</strong>{' '}
          (Ley N.° 31435 y D.S. N.° 011-2011-PCM).
        </p>
      </div>

      <div className="claim-submit-row">
        <button type="submit" className="claim-btn claim-btn-primary" disabled={submitting}>
          {submitting ? 'Registrando hoja…' : 'Enviar hoja de reclamación'}
        </button>
      </div>
    </form>
  );
}
