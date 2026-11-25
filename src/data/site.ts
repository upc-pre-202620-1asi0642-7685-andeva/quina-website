// URLs y datos globales del sitio. Los valores vienen de las variables de entorno
// (ver .env.example) con valores por defecto provisionales.
// La navegación vive en src/i18n/ui.ts porque depende del idioma.
import {
  PUBLIC_ANALYTICS_ID,
  PUBLIC_APP_URL,
  PUBLIC_ARCO_EMAIL,
  PUBLIC_CONTACT_EMAIL,
  PUBLIC_LEGAL_ADDRESS,
  PUBLIC_LEGAL_ENTITY,
  PUBLIC_LEGAL_RUC,
  PUBLIC_TURNSTILE_SITE_KEY,
} from 'astro:env/client';

const appUrl = PUBLIC_APP_URL.replace(/\/$/, '');

export const site = {
  name: 'Quina',
  url: 'https://quina.andeva.tech',
  // Quina es un producto de Andeva
  companyUrl: 'https://andeva.tech',
  appSignupUrl: `${appUrl}/register`,
  appLoginUrl: `${appUrl}/login`,
  contactEmail: PUBLIC_CONTACT_EMAIL,
  arcoEmail: PUBLIC_ARCO_EMAIL,
  analyticsId: PUBLIC_ANALYTICS_ID.trim(),
  turnstileSiteKey: PUBLIC_TURNSTILE_SITE_KEY.trim(),
  legal: {
    entity: PUBLIC_LEGAL_ENTITY,
    ruc: PUBLIC_LEGAL_RUC,
    address: PUBLIC_LEGAL_ADDRESS,
    jurisdiction: 'Lima, Perú',
  },
};
