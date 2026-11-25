// @ts-check
import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://quina.andeva.tech',
  output: 'static',
  devToolbar: { enabled: false },
  adapter: vercel(),
  integrations: [
    react(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-PE', en: 'en', qu: 'qu' },
      },
    }),
  ],
  i18n: {
    locales: ['es', 'en', 'qu'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // Variables de entorno tipadas. Ver .env.example
  env: {
    schema: {
      PUBLIC_APP_URL: envField.string({
        context: 'client',
        access: 'public',
        url: true,
        // La webapp vive en el mismo dominio, bajo /app (ver docs, sección de dominios)
        default: 'https://quina.andeva.tech/app',
      }),
      PUBLIC_CONTACT_EMAIL: envField.string({
        context: 'client',
        access: 'public',
        default: 'hola@quina.andeva.tech',
      }),
      PUBLIC_ARCO_EMAIL: envField.string({
        context: 'client',
        access: 'public',
        default: 'datos@quina.andeva.tech',
      }),
      PUBLIC_LEGAL_ENTITY: envField.string({
        context: 'client',
        access: 'public',
        default: 'Andeva S.A.C.',
      }),
      PUBLIC_LEGAL_RUC: envField.string({
        context: 'client',
        access: 'public',
        default: '20123456789',
      }),
      PUBLIC_LEGAL_ADDRESS: envField.string({
        context: 'client',
        access: 'public',
        default: 'Lima, Perú',
      }),
      PUBLIC_ANALYTICS_ID: envField.string({
        context: 'client',
        access: 'public',
        default: '',
      }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: 'client',
        access: 'public',
        default: '0x4AAAAAAFtSm5qHGdcYIajZ',
      }),
      TURNSTILE_SECRET_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      RESEND_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      CLAIMS_FROM_EMAIL: envField.string({
        context: 'server',
        access: 'public',
        default: 'Quina <reclamaciones@quina.andeva.tech>',
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
