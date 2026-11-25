import { z } from 'zod';

export const documentTypes = ['DNI', 'CE', 'Pasaporte', 'RUC'] as const;
export const itemTypes = ['servicio', 'producto'] as const;
export const claimTypes = ['reclamo', 'queja'] as const;

export const claimSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, 'Ingresa tu nombre y apellidos completos.')
      .max(140, 'El nombre no puede superar 140 caracteres.'),
    documentType: z.enum(documentTypes, {
      error: 'Selecciona un tipo de documento válido.',
    }),
    documentNumber: z
      .string()
      .trim()
      .min(6, 'Ingresa un número de documento válido.')
      .max(20, 'El número de documento es demasiado largo.'),
    address: z
      .string()
      .trim()
      .min(5, 'Ingresa tu domicilio.')
      .max(220, 'El domicilio no puede superar 220 caracteres.'),
    phone: z
      .string()
      .trim()
      .min(7, 'Ingresa un teléfono o celular de contacto.')
      .max(24, 'El teléfono es demasiado largo.'),
    email: z.string().trim().pipe(z.email('Ingresa un correo electrónico válido.')),
    isMinor: z.boolean().default(false),
    guardianName: z.string().trim().max(140).optional().default(''),
    guardianDocument: z.string().trim().max(20).optional().default(''),
    itemType: z.enum(itemTypes, {
      error: 'Indica si se trata de un servicio o producto.',
    }),
    amount: z
      .string()
      .trim()
      .max(20)
      .optional()
      .default('')
      .refine((v) => v === '' || /^\d+(\.\d{1,2})?$/.test(v), {
        message: 'Ingresa un monto válido en soles (por ejemplo, 29 o 29.00).',
      }),
    itemDescription: z
      .string()
      .trim()
      .min(4, 'Describe brevemente el plan o servicio contratado.')
      .max(240, 'La descripción no puede superar 240 caracteres.'),
    claimType: z.enum(claimTypes, {
      error: 'Selecciona si deseas registrar un reclamo o una queja.',
    }),
    detail: z
      .string()
      .trim()
      .min(15, 'Detalla lo ocurrido con al menos 15 caracteres.')
      .max(3000, 'El detalle no puede superar 3000 caracteres.'),
    request: z
      .string()
      .trim()
      .min(10, 'Indica tu pedido concreto con al menos 10 caracteres.')
      .max(1500, 'El pedido no puede superar 1500 caracteres.'),
    acceptedPolicy: z.literal(true, {
      error: 'Debes confirmar la veracidad de tus datos y la lectura de la Política de privacidad.',
    }),
    turnstileToken: z.string().optional().default(''),
  })
  .superRefine((data, ctx) => {
    if (data.documentType === 'DNI' && !/^\d{8}$/.test(data.documentNumber)) {
      ctx.addIssue({
        code: 'custom',
        path: ['documentNumber'],
        message: 'El DNI peruano debe tener exactamente 8 dígitos.',
      });
    }
    if (data.documentType === 'RUC' && !/^\d{11}$/.test(data.documentNumber)) {
      ctx.addIssue({
        code: 'custom',
        path: ['documentNumber'],
        message: 'El RUC peruano debe tener exactamente 11 dígitos.',
      });
    }
    if (data.isMinor) {
      if (data.guardianName.length < 3) {
        ctx.addIssue({
          code: 'custom',
          path: ['guardianName'],
          message: 'Ingresa el nombre completo del padre, madre o apoderado.',
        });
      }
      if (data.guardianDocument.length < 6) {
        ctx.addIssue({
          code: 'custom',
          path: ['guardianDocument'],
          message: 'Ingresa el documento de identidad del padre, madre o apoderado.',
        });
      }
    }
  });

export type ClaimPayload = z.infer<typeof claimSchema>;

export interface ClaimReceipt {
  code: string;
  submittedAt: string;
  deadlineText: string;
  emailDispatched: boolean;
  data: ClaimPayload;
}

export function generateClaimCode(date = new Date()): string {
  const year = date.getFullYear();
  const suffix = Math.floor(10000 + Math.random() * 90000);
  return `LR-${year}-${suffix}`;
}

export function formatPeruDateTime(date = new Date()): string {
  return new Intl.DateTimeFormat('es-PE', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Lima',
  }).format(date);
}
