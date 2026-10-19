import { site } from '@/data/site';

export const languages = { es: 'Español', en: 'English', qu: 'Runasimi' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

export interface NavLink {
  label: string;
  href: string;
  desc?: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  children?: NavLink[];
}

export const navigation: Record<Lang, NavGroup[]> = {
  es: [
    {
      label: 'Producto',
      children: [
        {
          label: 'Crédito con reglas',
          desc: 'Límite, tasa y fechas por vecino',
          href: '/producto/credito',
        },
        {
          label: 'Estado de cuenta',
          desc: 'Liquidación automática en cada corte',
          href: '/producto/estado-de-cuenta',
        },
        {
          label: 'Cobranza sin roche',
          desc: 'Recordatorios y avisos de mora',
          href: '/producto/cobranza',
        },
        {
          label: 'Mostrador e inventario',
          desc: 'Fía en tres toques, con kardex',
          href: '/producto/mostrador',
        },
        {
          label: 'Para tus vecinos',
          desc: 'Su cuenta clara, gratis',
          href: '/producto/vecinos',
        },
      ],
    },
    {
      label: 'Soluciones',
      children: [
        { label: 'Bodegas', desc: 'El fiado de todos los días', href: '/soluciones/bodegas' },
        {
          label: 'Boticas y farmacias',
          desc: 'Tratamientos que se pagan a fin de mes',
          href: '/soluciones/boticas',
        },
        {
          label: 'Panaderías',
          desc: 'El pan diario a cuenta',
          href: '/soluciones/panaderias',
        },
        {
          label: 'Bazares y licorerías',
          desc: 'Ventas grandes en cuotas',
          href: '/soluciones/bazares',
        },
      ],
    },
    { label: 'Precios', href: '/planes' },
    {
      label: 'Recursos',
      children: [
        { label: 'Blog', desc: 'Guías para ordenar tu negocio', href: '/blog' },
        {
          label: 'Calculadora de fiado',
          desc: 'Cuánta plata tienes en la calle',
          href: '/recursos/calculadora',
        },
        {
          label: 'Preguntas frecuentes',
          desc: 'Lo que nos preguntan los caseros',
          href: '/preguntas',
        },
      ],
    },
    { label: 'Nosotros', href: '/nosotros' },
  ],
  en: [
    { label: 'Product', href: '/en/#product' },
    { label: 'How it works', href: '/en/#how-it-works' },
    { label: 'Pricing', href: '/en/#pricing' },
    { label: 'FAQ', href: '/en/#faq' },
  ],
  qu: [
    { label: 'Producto', href: '/qu/#producto' },
    { label: 'Imayna llamk’an', href: '/qu/#imayna' },
    { label: 'Chaninkuna', href: '/qu/#chaninkuna' },
    { label: 'Tapukuykuna', href: '/qu/#tapukuykuna' },
  ],
};

export const ui = {
  es: {
    home: 'Quina, ir al inicio',
    mainNav: 'Principal',
    login: 'Ingresar',
    signup: 'Empieza gratis',
    signupLong: 'Registra tu bodega gratis',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    menu: 'Menú',
    menuTagline: 'El fiado de tu barrio,<br />con reglas claras.',
    themeToDark: 'Activar modo oscuro',
    themeToLight: 'Activar modo claro',
    language: 'Idioma',
    skip: 'Saltar al contenido',
    footerTitle: 'Ordena tu fiado hoy.',
    footerLead: 'Gratis hasta 15 vecinos. Te toma dos minutos y no pide tarjeta.',
    footerProduct: 'Producto',
    footerCompany: 'Quina',
    footerLegal: 'Legal',
    footerContact: 'Contacto',
    privacy: 'Política de privacidad',
    terms: 'Términos y condiciones',
    cookies: 'Política de cookies',
    cookieSettings: 'Configurar cookies',
    claims: 'Libro de Reclamaciones',
    madeIn: 'Hecho en Lima, Perú.',
    productOf: ['un producto de ', ''],
    disclaimer: 'Quina es un software de gestión. No presta dinero ni capta fondos del público.',
  },
  en: {
    home: 'Quina, go to home',
    mainNav: 'Main',
    login: 'Log in',
    signup: 'Start free',
    signupLong: 'Register your shop for free',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menu: 'Menu',
    menuTagline: 'Neighborhood credit,<br />with clear rules.',
    themeToDark: 'Switch to dark mode',
    themeToLight: 'Switch to light mode',
    language: 'Language',
    skip: 'Skip to content',
    footerTitle: 'Get your credit book in order.',
    footerLead: 'Free for up to 15 customers. Two minutes to set up, no card required.',
    footerProduct: 'Product',
    footerCompany: 'Quina',
    footerLegal: 'Legal',
    footerContact: 'Contact',
    privacy: 'Privacy policy',
    terms: 'Terms and conditions',
    cookies: 'Cookie policy',
    cookieSettings: 'Cookie settings',
    claims: 'Complaints Book',
    madeIn: 'Made in Lima, Peru.',
    productOf: ['a product by ', ''],
    disclaimer: 'Quina is management software. It does not lend money or take deposits.',
  },
  // Borrador en quechua sureño: requiere revisión de un traductor nativo antes de publicar.
  // Los nombres legales oficiales se mantienen en castellano.
  qu: {
    home: 'Quina, qallariyman kutiy',
    mainNav: 'Umalliq menú',
    login: 'Yaykuy',
    signup: 'Gratis qallariy',
    signupLong: 'Bodegaykita gratis qillqachiy',
    openMenu: 'Menúta kichay',
    closeMenu: 'Menúta wichqay',
    menu: 'Menú',
    menuTagline: 'Barrioykipa manun,<br />sut’i kamachikuykunawan.',
    themeToDark: 'Tutayaq rikchayman tikray',
    themeToLight: 'K’anchaq rikchayman tikray',
    language: 'Simi',
    skip: 'Willakuyman pasay',
    footerTitle: 'Kunanmanta manuykita allichay.',
    footerLead: '15 vecinokama gratis. Iskay minutullapi, mana tarjetayuq.',
    footerProduct: 'Producto',
    footerCompany: 'Quina',
    footerLegal: 'Legal',
    footerContact: 'Rimanakuy',
    privacy: 'Política de privacidad',
    terms: 'Términos y condiciones',
    cookies: 'Política de cookies',
    cookieSettings: 'Cookies nisqata allichay',
    claims: 'Libro de Reclamaciones',
    madeIn: 'Lima llaqtapi ruwasqa, Perú.',
    productOf: ['', 'pa huk ruwasqan'],
    disclaimer:
      'Quinaqa huk software llamk’anapaqmi. Manam qullqita manuchinchu nitaq runakunapa qullqinta waqaychanchu.',
  },
} as const;

export const appLinks = {
  signup: site.appSignupUrl,
  login: site.appLoginUrl,
};

/** Portada de cada idioma. Por ahora solo la portada existe en inglés y en quechua. */
export const langHome: Record<Lang, string> = { es: '/', en: '/en/', qu: '/qu/' };

/** Código corto que se muestra en el botón de idioma. */
export const langCode: Record<Lang, string> = { es: 'ES', en: 'EN', qu: 'QU' };

export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  return segment === 'en' || segment === 'qu' ? segment : 'es';
}

export function isCurrent(pathname: string, href: string): boolean {
  const clean = (p: string) => p.replace(/\/$/, '') || '/';
  return !href.includes('#') && clean(pathname).startsWith(clean(href)) && href !== '/';
}
