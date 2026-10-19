// Textos de las islas React. Se importan dentro de cada isla según el idioma recibido.
// En los veredictos de la calculadora, link() envuelve el nombre del plan en un enlace a su tarjeta.
export type PlanSlug = 'casero' | 'bodega-pro' | 'negocio-plus';
type Link = (plan: string, slug: PlanSlug) => string;

export const calcCopy = {
  es: {
    clients: 'Vecinos a los que les fías',
    average: 'Lo que debe cada uno, en promedio',
    lost: 'Lo que se olvida o se paga tarde cada mes',
    people: 'Personas que atienden',
    teamOptions: ['Solo yo', '2 o 3', '4 o más'],
    resultLabel: 'Tienes en la calle',
    risk: (amount: string) =>
      `De eso, <strong>${amount}</strong> al mes se te olvidan o llegan tarde.`,
    free: (n: number, link: Link) =>
      `Con ${n} vecinos te alcanza el ${link('Plan Casero', 'casero')}: no pagas nada.`,
    breakEven: (price: number, pct: string, link: Link) =>
      `El ${link('Plan Bodega Pro', 'bodega-pro')} (S/ ${price} al mes) se paga si Quina te ayuda a recuperar el ${pct} % de eso.`,
    small: (link: Link) =>
      `Con montos así de chicos, empieza gratis con el ${link('Plan Casero', 'casero')}.`,
    team: (link: Link) =>
      `Para atender entre 2 o 3 necesitas el ${link('Plan Bodega Pro', 'bodega-pro')}: hasta 3 personas por S/ 29 al mes.`,
    plus: (link: Link) =>
      `Con 4 o más personas atendiendo te conviene el ${link('Plan Negocio Plus', 'negocio-plus')}: usuarios ilimitados por S/ 69 al mes.`,
  },
  en: {
    clients: 'Neighbors you give credit to',
    average: 'Average amount each one owes',
    lost: 'Share forgotten or paid late each month',
    people: 'People serving customers',
    teamOptions: ['Just me', '2 or 3', '4 or more'],
    resultLabel: 'Money out on credit',
    risk: (amount: string) => `Of that, <strong>${amount}</strong> a month is forgotten or late.`,
    free: (n: number, link: Link) =>
      `With ${n} neighbors the free ${link('Casero plan', 'casero')} is enough.`,
    breakEven: (price: number, pct: string, link: Link) =>
      `${link('Bodega Pro', 'bodega-pro')} (S/ ${price} a month) pays for itself if Quina helps you recover ${pct} % of that.`,
    small: (link: Link) =>
      `With amounts this small, start free on the ${link('Casero plan', 'casero')}.`,
    team: (link: Link) =>
      `To serve customers with 2 or 3 people you need ${link('Bodega Pro', 'bodega-pro')}: up to 3 people for S/ 29 a month.`,
    plus: (link: Link) =>
      `With 4 or more people serving customers, ${link('Negocio Plus', 'negocio-plus')} fits best: unlimited users for S/ 69 a month.`,
  },
  // Borrador en quechua sureño: requiere revisión de un traductor nativo.
  qu: {
    clients: 'Hayk’a vecinokunamantaq manupi qunki',
    average: 'Sapakama hayk’atataq manun, yaqa',
    lost: 'Sapa killa qunqasqa utaq qhipa pagasqa',
    people: 'Atiendeq runakuna',
    teamOptions: ['Ñuqalla', '2 utaq 3', '4 utaq aswan'],
    resultLabel: 'Callepi qullqiyki',
    risk: (amount: string) =>
      `Chaymanta <strong>${amount}</strong> sapa killa qunqakun utaq qhipatam chayamun.`,
    free: (n: number, link: Link) =>
      `${n} vecinowanqa ${link('Plan Casero', 'casero')}qa aypasunkim: manam imatapas paganki.`,
    breakEven: (price: number, pct: string, link: Link) =>
      `${link('Plan Bodega Pro', 'bodega-pro')}qa (killapi S/ ${price}) pagakun, Quina chaymanta ${pct} %-ta kutichinaykipaq yanapaptinqa.`,
    small: (link: Link) =>
      `Kay hina pisi qullqiwanqa ${link('Plan Casero', 'casero')}wan gratis qallariy.`,
    team: (link: Link) =>
      `2 utaq 3 runawan atiendenaykipaqqa ${link('Plan Bodega Pro', 'bodega-pro')}ta munanki: 3 runakama, killapi S/ 29.`,
    plus: (link: Link) =>
      `4 utaq aswan runakuna atiendeptinqa ${link('Plan Negocio Plus', 'negocio-plus')}mi aswan allin: mana tukukuq usuariokuna, killapi S/ 69.`,
  },
};

export const planCopy = {
  es: {
    billingLabel: 'Forma de pago',
    picked: 'Tu plan según la calculadora',
    monthly: 'Mensual',
    yearly: 'Anual, 20 % menos',
    forever: 'para siempre',
    perMonth: 'al mes',
    noCard: 'Sin tarjeta.',
    billedYearly: (amount: string) => `S/ ${amount} cobrados una vez al año.`,
    perDay: (n: number) => `Menos de S/ ${n} al día.`,
    plans: [
      {
        pitch: 'Para dejar el cuaderno sin riesgo.',
        cta: 'Empieza gratis',
        features: [
          'Hasta 15 vecinos con crédito',
          'Motor financiero completo',
          '1 usuario (tú)',
          'Hasta 50 productos',
          'Avisos por correo manuales',
        ],
      },
      {
        pitch: 'El estándar para bodegas activas.',
        cta: 'Prueba Pro 14 días',
        features: [
          'Vecinos con crédito ilimitados',
          'Hasta 3 usuarios con permisos',
          'Avisos automáticos de cobro y mora',
          'Kardex con costo promedio',
          'Reportes en Excel y PDF',
          '20 consultas al asistente con IA',
        ],
      },
      {
        pitch: 'Para negocios con más volumen.',
        cta: 'Elegir Plus',
        features: [
          'Todo lo de Bodega Pro',
          'Usuarios ilimitados',
          'Comprobantes de compra ilimitados',
          'Avisos automáticos prioritarios',
          '100 consultas al asistente con IA',
        ],
      },
    ],
  },
  en: {
    billingLabel: 'Billing',
    picked: 'Your plan, per the calculator',
    monthly: 'Monthly',
    yearly: 'Yearly, 20 % off',
    forever: 'forever',
    perMonth: 'a month',
    noCard: 'No card needed.',
    billedYearly: (amount: string) => `S/ ${amount} billed once a year.`,
    perDay: (n: number) => `Less than S/ ${n} a day.`,
    plans: [
      {
        pitch: 'Leave the notebook behind, risk free.',
        cta: 'Start free',
        features: [
          'Up to 15 customers on credit',
          'Full financial engine',
          '1 user (you)',
          'Up to 50 products',
          'Manual email notices',
        ],
      },
      {
        pitch: 'The standard for busy corner shops.',
        cta: 'Try Pro for 14 days',
        features: [
          'Unlimited customers on credit',
          'Up to 3 users with roles',
          'Automatic payment and overdue notices',
          'Weighted-cost inventory',
          'Excel and PDF reports',
          '20 AI assistant queries',
        ],
      },
      {
        pitch: 'For higher-volume businesses.',
        cta: 'Choose Plus',
        features: [
          'Everything in Bodega Pro',
          'Unlimited users',
          'Unlimited purchase receipts',
          'Priority automatic notices',
          '100 AI assistant queries',
        ],
      },
    ],
  },
  // Borrador en quechua sureño: requiere revisión de un traductor nativo.
  qu: {
    billingLabel: 'Imaynatam pagay',
    picked: 'Calculadorapa akllasqan planniyki',
    monthly: 'Killanpi',
    yearly: 'Watanpi, 20 % pisi',
    forever: 'wiñaypaq',
    perMonth: 'killapi',
    noCard: 'Mana tarjetayuq.',
    billedYearly: (amount: string) => `S/ ${amount} watapi huk kutilla.`,
    perDay: (n: number) => `P’unchawpi S/ ${n}-manta pisi.`,
    plans: [
      {
        pitch: 'Mana manchakuspa cuadernota saqinapaq.',
        cta: 'Gratis qallariy',
        features: [
          '15 vecinokama manupi',
          'Llapan motor financiero',
          '1 usuario (qam)',
          '50 productokama',
          'Makiwan correo willakuykuna',
        ],
      },
      {
        pitch: 'Llamk’aq bodegakunapaq.',
        cta: '14 p’unchaw Prota pruebay',
        features: [
          'Mana tukukuq vecinokuna manupi',
          '3 usuariokama permisoyuq',
          'Kikinmanta cobranza, qhipakuy willakuykuna',
          'Kardex costo promediowan',
          'Excelpi, PDFpi reportekuna',
          'IA yanapaqman 20 tapukuy',
        ],
      },
      {
        pitch: 'Aswan hatun negociokunapaq.',
        cta: 'Plusta akllay',
        features: [
          'Bodega Propa llapan kaqnin',
          'Mana tukukuq usuariokuna',
          'Mana tukukuq comprobantekuna',
          'Ñawpaqman kikinmanta willakuykuna',
          'IA yanapaqman 100 tapukuy',
        ],
      },
    ],
  },
};
