import type { Detail } from './product';

export interface SolutionPage {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  pains: Detail[];
  fits: { title: string; text: string; href: string }[];
  plan: { name: string; reason: string };
}

export const solutionPages: SolutionPage[] = [
  {
    slug: 'bodegas',
    metaTitle: 'Quina para bodegas',
    metaDescription:
      'Ordena el fiado de tu bodega: límite por vecino, estado de cuenta mensual y recordatorios de pago automáticos.',
    title: 'El fiado de la bodega, por fin en orden',
    lead: 'En la bodega se fía todos los días y a casi todo el barrio. Quina lleva esas cuentas para que tú atiendas la cola tranquilo.',
    image: 'solucion-bodega',
    imageAlt: 'Bodega de barrio en Lima con su mostrador y estantes llenos',
    pains: [
      {
        title: 'Muchos vecinos, montos chicos',
        text: 'Diez soles aquí, quince allá. Al mes suman miles y nadie lleva la cuenta exacta.',
      },
      {
        title: 'La hora punta',
        text: 'Con cola en el mostrador no hay tiempo de anotar bien en el cuaderno.',
      },
      {
        title: 'El camión no espera',
        text: 'Con la plata en la calle, pagarle a la distribuidora se complica.',
      },
    ],
    fits: [
      {
        title: 'Fía en tres toques',
        text: 'Tan rápido como el cuaderno, sin pasarse del límite.',
        href: '/producto/mostrador',
      },
      {
        title: 'Corte a fin de mes',
        text: 'Cada vecino recibe su estado de cuenta y su fecha de pago.',
        href: '/producto/estado-de-cuenta',
      },
      {
        title: 'Cobranza automática',
        text: 'Recordatorios antes del pago, sin tocar puertas.',
        href: '/producto/cobranza',
      },
    ],
    plan: {
      name: 'Bodega Pro',
      reason: 'Vecinos ilimitados, avisos automáticos y kardex para saber tu ganancia real.',
    },
  },
  {
    slug: 'boticas',
    metaTitle: 'Quina para boticas y farmacias',
    metaDescription:
      'Lleva el crédito de tus clientes frecuentes en la botica: tratamientos a fin de mes, cuotas claras y avisos de pago.',
    title: 'Tratamientos que se pagan a fin de mes',
    lead: 'En la botica del barrio se fía cuando hace falta: una receta, un tratamiento largo, un mes difícil. Quina ordena ese crédito con cuidado.',
    image: 'solucion-botica',
    imageAlt: 'Botica de barrio con su mostrador de vidrio y estantes de medicinas',
    pains: [
      {
        title: 'Montos más altos',
        text: 'Un tratamiento completo pesa. Conviene dividirlo en cuotas claras.',
      },
      {
        title: 'Clientes de años',
        text: 'Son vecinos de confianza y cobrarles incomoda más que en cualquier otro negocio.',
      },
      {
        title: 'Stock delicado',
        text: 'Productos con costo alto que no pueden salir sin registrarse.',
      },
    ],
    fits: [
      {
        title: 'Cuotas con método francés',
        text: 'Divide un tratamiento en pagos iguales con su cronograma.',
        href: '/producto/credito',
      },
      {
        title: 'Tasa 0 % para la confianza',
        text: 'Cobra solo el monto exacto a quien prefieras.',
        href: '/producto/credito',
      },
      {
        title: 'Stock validado',
        text: 'No se fía lo que no hay, y el kardex lleva el costo.',
        href: '/producto/mostrador',
      },
    ],
    plan: {
      name: 'Bodega Pro',
      reason: 'Cuotas, avisos automáticos y comprobantes de compra a tus proveedores.',
    },
  },
  {
    slug: 'panaderias',
    metaTitle: 'Quina para panaderías',
    metaDescription:
      'El pan de todos los días a cuenta, sumado solo. Quina registra cada compra chica y arma el total de la semana o del mes.',
    title: 'El pan de cada día, a cuenta y sin perderse',
    lead: 'El pan se fía de a poquito, todas las mañanas. Quina suma cada compra chica para que a fin de mes el total cuadre sin discusión.',
    image: 'solucion-panaderia',
    imageAlt: 'Panadería de barrio temprano en la mañana con canastas de pan francés',
    pains: [
      {
        title: 'Compras diarias',
        text: 'Treinta mañanas de pan son treinta anotaciones que se pierden fácil.',
      },
      {
        title: 'Clientes de la mañana',
        text: 'A las seis, con el horno lleno, no hay tiempo de buscar el cuaderno.',
      },
      {
        title: 'Totales que no cuadran',
        text: 'A fin de mes el vecino recuerda menos de lo que sacó.',
      },
    ],
    fits: [
      {
        title: 'Registro express',
        text: 'Tu producto frecuente a un toque, al mismo precio de siempre.',
        href: '/producto/mostrador',
      },
      {
        title: 'Detalle por día',
        text: 'El estado de cuenta muestra cada mañana de pan.',
        href: '/producto/estado-de-cuenta',
      },
      {
        title: 'Cortes semanales o mensuales',
        text: 'Tú eliges cada cuánto se cierra la cuenta.',
        href: '/producto/credito',
      },
    ],
    plan: {
      name: 'Casero',
      reason: 'Si fías a pocos vecinos, el plan gratis te alcanza para empezar.',
    },
  },
  {
    slug: 'bazares',
    metaTitle: 'Quina para bazares y licorerías',
    metaDescription:
      'Ventas más grandes al crédito, en cuotas claras y con mora calculada. Quina ordena el crédito de bazares y licorerías.',
    title: 'Ventas grandes, en cuotas claras',
    lead: 'Un regalo, útiles escolares, el pedido para una fiesta. Cuando el monto crece, Quina lo convierte en cuotas con fechas que el vecino entiende.',
    image: 'solucion-bazar',
    imageAlt: 'Bazar de barrio con estantes de útiles, juguetes y regalos',
    pains: [
      {
        title: 'Un solo monto grande',
        text: 'Fiar cien soles de una sola vez es un riesgo si no hay fechas.',
      },
      {
        title: 'Temporadas',
        text: 'Campaña escolar, Navidad, fiestas: todos piden a cuenta al mismo tiempo.',
      },
      {
        title: 'Pagos a medias',
        text: 'Abonos sueltos que nadie sabe cuánto descontaron.',
      },
    ],
    fits: [
      {
        title: 'Cronograma de cuotas',
        text: 'Cada cuota con su fecha y su monto exacto.',
        href: '/producto/credito',
      },
      {
        title: 'Abonos registrados',
        text: 'Cada pago parcial se descuenta y queda a la vista.',
        href: '/producto/estado-de-cuenta',
      },
      {
        title: 'Mora calculada',
        text: 'Si se atrasan, el interés se calcula y se avisa solo.',
        href: '/producto/cobranza',
      },
    ],
    plan: {
      name: 'Bodega Pro',
      reason: 'Clientes ilimitados para la temporada alta y avisos automáticos.',
    },
  },
];
