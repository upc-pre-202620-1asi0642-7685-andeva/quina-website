// URLs y datos globales del sitio. Los valores vienen de las variables de entorno
// (ver .env.example) con valores por defecto provisionales.
// La navegación vive en src/i18n/ui.ts porque depende del idioma.
import { PUBLIC_APP_URL, PUBLIC_ARCO_EMAIL, PUBLIC_CONTACT_EMAIL } from 'astro:env/client';

const appUrl = PUBLIC_APP_URL.replace(/\/$/, '');

export const site = {
  name: 'Quina',
  url: 'https://quina.andeva.tech',
  appSignupUrl: `${appUrl}/register`,
  appLoginUrl: `${appUrl}/login`,
  contactEmail: PUBLIC_CONTACT_EMAIL,
  arcoEmail: PUBLIC_ARCO_EMAIL,
};
