export interface Detail {
  title: string;
  text: string;
}

export interface ProductPage {
  slug: string;
  nav: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  stepsTitle: string;
  steps: Detail[];
  detailsTitle: string;
  details: Detail[];
}

export const productPages: ProductPage[] = [
  {
    slug: 'credito',
    nav: 'Crédito con reglas',
    metaTitle: 'Crédito con reglas claras',
    metaDescription:
      'Define límite, tasa y fechas de corte y pago para cada vecino. Quina calcula intereses y cuotas con método financiero formal.',
    title: 'Cada vecino, con sus reglas',
    lead: 'Pactas el límite, la tasa y las fechas una vez. Desde ahí Quina calcula exactamente lo que debe cada casero, sin redondeos al ojo ni discusiones.',
    image: 'feature-credito',
    imageAlt: 'Laptop con la pantalla de condiciones de crédito de un cliente en Quina',
    stepsTitle: 'Así se arma un crédito',
    steps: [
      {
        title: 'Pones el límite',
        text: 'Hasta cuánto le fías a cada vecino. Quina no deja pasarse sin tu permiso.',
      },
      {
        title: 'Eliges cómo paga',
        text: 'Todo a fin de mes o en cuotas con método francés. Tú decides por cliente.',
      },
      {
        title: 'Fijas las fechas',
        text: 'Día de corte y día de pago. Quina cierra y avisa sola en esas fechas.',
      },
    ],
    detailsTitle: 'Lo que incluye',
    details: [
      {
        title: 'Tasa opcional',
        text: 'Pon 0 % a tus caseros de confianza y cobra solo el monto exacto.',
      },
      {
        title: 'Interés compensatorio',
        text: 'Calculado por días, con la tasa efectiva que pactaste.',
      },
      {
        title: 'Mora aparte',
        text: 'El interés moratorio se separa del resto para que se vea claro.',
      },
      {
        title: 'Período de gracia',
        text: 'Días sin cobro de cuota, con la capitalización bien calculada.',
      },
      {
        title: 'Cronograma de cuotas',
        text: 'Cada cuota con su capital, interés y fecha, listo para mostrar.',
      },
      {
        title: 'Puntaje del cliente',
        text: 'Quién paga puntual y quién se atrasa, según su historial.',
      },
    ],
  },
  {
    slug: 'estado-de-cuenta',
    nav: 'Estado de cuenta',
    metaTitle: 'Estado de cuenta en cada corte',
    metaDescription:
      'En la fecha de corte Quina cierra el ciclo y genera la liquidación de cada vecino con sus compras, intereses y fecha de pago.',
    title: 'Se acabó el «¿cuánto te debo?»',
    lead: 'En la fecha de corte Quina cierra el ciclo de cada vecino y arma su estado de cuenta: qué sacó, cuándo, cuánto y hasta qué día tiene para pagar.',
    image: 'feature-estado-cuenta',
    imageAlt: 'Celular mostrando el estado de cuenta mensual de una vecina en Quina',
    stepsTitle: 'Qué pasa en cada corte',
    steps: [
      {
        title: 'Se cierra el ciclo',
        text: 'Las compras del mes quedan agrupadas y ya no se pueden mover.',
      },
      {
        title: 'Se calcula todo',
        text: 'Saldo, intereses y cuotas, con el detalle de cada fórmula.',
      },
      {
        title: 'Le llega al vecino',
        text: 'Recibe su estado de cuenta por correo y lo puede ver cuando quiera.',
      },
    ],
    detailsTitle: 'Lo que ve tu vecino',
    details: [
      { title: 'Compras por fecha', text: 'Cada producto con su día, cantidad y precio.' },
      { title: 'Saldo anterior', text: 'Lo que venía del ciclo pasado, separado del nuevo.' },
      { title: 'Intereses del ciclo', text: 'Cuánto es interés y cuánto es compra, sin mezclar.' },
      { title: 'Fecha de pago', text: 'El día pactado, en grande, para que no se olvide.' },
      { title: 'Pagos registrados', text: 'Cada abono que hizo, con su fecha.' },
      { title: 'Exportable', text: 'En PDF o impreso, si prefiere tenerlo en papel.' },
    ],
  },
  {
    slug: 'cobranza',
    nav: 'Cobranza sin roche',
    metaTitle: 'Cobranza sin roche',
    metaDescription:
      'Quina recuerda la fecha de pago, avisa la mora y notifica cada cargo con 48 horas para observarlo. Tú no tienes que tocar la puerta.',
    title: 'Quina cobra, tú atiendes',
    lead: 'Cobrarle al vecino de toda la vida incomoda. Quina hace de cobrador imparcial: avisa antes del pago, recuerda la mora y deja respaldo de cada cargo.',
    image: 'feature-cobranza',
    imageAlt: 'Vecina leyendo en su celular un recordatorio de pago enviado por Quina',
    stepsTitle: 'Los avisos que manda Quina',
    steps: [
      {
        title: 'Aviso de cada cargo',
        text: 'Cuando fías, el vecino recibe el detalle y tiene 48 horas para observarlo.',
      },
      {
        title: 'Recordatorio de pago',
        text: 'Unos días antes de la fecha pactada, con el monto exacto.',
      },
      {
        title: 'Aviso de mora',
        text: 'Si se pasa la fecha, le avisa cuánto suma el interés moratorio.',
      },
    ],
    detailsTitle: 'Por qué funciona',
    details: [
      {
        title: 'Sin confrontación',
        text: 'El mensaje viene de Quina, no de ti. La relación con tu vecino se cuida.',
      },
      {
        title: 'Conformidad liviana',
        text: 'Si no observa el cargo en 48 horas, queda aceptado. Se acaba el «yo no saqué eso».',
      },
      {
        title: 'Respaldo',
        text: 'Cada compra queda registrada con fecha y aviso enviado.',
      },
      {
        title: 'Tono respetuoso',
        text: 'Mensajes claros y amables, escritos para caseros, no para bancos.',
      },
      {
        title: 'Automático en Pro',
        text: 'En el Plan Casero los avisos se envían a mano desde la app.',
      },
      {
        title: 'WhatsApp, más adelante',
        text: 'Hoy los avisos van por correo. WhatsApp está en camino.',
      },
    ],
  },
  {
    slug: 'mostrador',
    nav: 'Mostrador e inventario',
    metaTitle: 'Mostrador e inventario',
    metaDescription:
      'Registra un fiado en tres toques desde el celular. Quina valida el límite y el stock antes de confirmar y lleva tu kardex con costo promedio.',
    title: 'Fía en tres toques',
    lead: 'Si registrar un fiado toma más que anotarlo en el cuaderno, nadie lo usa. En Quina eliges al vecino, el producto y confirmas.',
    image: 'feature-mostrador',
    imageAlt: 'Bodeguero registrando una venta al crédito desde su celular en el mostrador',
    stepsTitle: 'Una venta al crédito',
    steps: [
      {
        title: 'Eliges al vecino',
        text: 'Lo buscas por nombre. Ves su límite disponible al toque.',
      },
      { title: 'Marcas el producto', text: 'Desde tu catálogo, con precio y stock actualizados.' },
      {
        title: 'Confirmas',
        text: 'Si se pasa del límite o no hay stock, Quina te avisa antes.',
      },
    ],
    detailsTitle: 'Tu negocio en orden',
    details: [
      { title: 'Ventas al contado', text: 'También registras lo que se paga al momento.' },
      { title: 'Catálogo', text: 'Tus productos con precio, historial de precios y stock.' },
      {
        title: 'Kardex',
        text: 'Entradas y salidas con costo promedio ponderado, para saber tu ganancia real.',
      },
      {
        title: 'Compras a proveedores',
        text: 'Con foto del comprobante, para no perder ninguna boleta.',
      },
      {
        title: 'Usuarios y permisos',
        text: 'Tu ayudante vende, pero solo tú decides a quién se fía.',
      },
      {
        title: 'Desde el celular',
        text: 'Funciona en el navegador y se instala como app.',
      },
    ],
  },
  {
    slug: 'vecinos',
    nav: 'Para tus vecinos',
    metaTitle: 'Quina para tus vecinos',
    metaDescription:
      'Tus clientes consultan gratis su saldo, sus compras y sus cuotas desde el celular. Cuentas claras para los dos lados del mostrador.',
    title: 'Cuentas claras para los dos lados',
    lead: 'Tus vecinos nunca pagan nada. Desde su celular ven lo que sacaron, cuánto deben y cuándo vence, sin tener que preguntarte.',
    image: 'vecinos-celular',
    imageAlt: 'Vecina revisando su saldo de la bodega en su celular desde su casa',
    stepsTitle: 'Lo que recibe tu vecino',
    steps: [
      { title: 'Un aviso por compra', text: 'Con el detalle de lo que sacó y el monto.' },
      { title: 'Su estado de cuenta', text: 'Cada corte, con todo desglosado.' },
      { title: 'Su cronograma', text: 'Las cuotas pendientes y la próxima fecha de pago.' },
    ],
    detailsTitle: 'Por qué le conviene',
    details: [
      { title: 'Gratis siempre', text: 'Quina solo cobra al negocio, nunca al vecino.' },
      { title: 'Transparencia', text: 'Ve el mismo detalle que ve el bodeguero.' },
      { title: 'Puede observar', text: 'Tiene 48 horas para reclamar un cargo que no reconoce.' },
      { title: 'Sin instalar nada', text: 'Lo revisa desde el correo o el navegador.' },
      { title: 'Sus datos protegidos', text: 'Tratados según la Ley N.° 29733.' },
      { title: 'Sin vergüenza', text: 'Recibe recordatorios amables, no llamadas de cobranza.' },
    ],
  },
];
