import type { Lang } from './ui';

export const home = {
  es: {
    meta: {
      title: 'Quina · El fiado de tu barrio, con reglas claras',
      description:
        'Quina ordena el fiado de tu bodega: límite y fecha de pago por vecino, estado de cuenta en cada corte y recordatorios de cobro automáticos. Gratis hasta 15 clientes.',
    },
    hero: {
      title: 'Fía tranquilo.<br />Quina cobra por ti.',
      lead: 'Quina anota cada fiado, calcula lo que te deben y le recuerda pagar a tus vecinos.',
      primary: 'Registra tu bodega gratis',
      secondary: 'Ver cómo funciona',
      secondaryHref: '#como-funciona',
      videoTitle: 'Video de presentación de Quina',
      videoClose: 'Cerrar video',
      videoSoon: 'El video de presentación llega muy pronto.',
      hasAccount: '¿Ya tienes una cuenta?',
      login: 'Inicia sesión',
      imageAlt:
        'Bodeguero en el mostrador de su tienda entregando una compra al fiado a una vecina',
      sale: 'Nueva venta al crédito',
      saleOk: 'Dentro del límite. Quedan S/ 113.60',
      mailTitle: 'Recordatorio enviado',
      mailAgo: 'hace 2 min',
      mailBody:
        'Hola Rosa, tu estado de cuenta de octubre es <strong>S/ 186.40</strong>. Tu fecha de pago es el 5 de noviembre.',
      saleItems: [
        ['Leche Gloria x6', 'S/ 24.60'],
        ['Pan francés x10', 'S/ 3.00'],
      ],
      saleLimit: 'Límite de Rosa',
      tasksTitle: 'Cobranza de hoy',
      tasks: [
        ['Enviar estado de cuenta a Rosa', 'Hoy, 9:00 a. m.'],
        ['Recordar pago a Juan', 'Hoy, 6:00 p. m.'],
      ],
      taskNew: 'Nuevo recordatorio',
      calTitle: 'Pagos de noviembre',
      calEvents: [
        ['5 nov', 'Rosa Quispe', 'S/ 186.40'],
        ['8 nov', 'Juan Pérez', 'S/ 92.00'],
      ],
      calPaid: 'Pagado',
    },
    problem: {
      srTitle: 'El problema del cuaderno de fiados',
      statement:
        'Seis de cada diez bodegas del Perú fían. Casi todas lo anotan en un cuaderno que se moja, se pierde y no calcula nada. Y cobrarle al vecino de toda la vida da roche.',
      imageAlt: 'Cuaderno de fiados abierto sobre el mostrador de una bodega, con cuentas tachadas',
      pains: [
        {
          quote: '«Se me traspapeló la cuenta de la vecina.»',
          text: 'Una hoja manchada o arrancada es plata que no vuelve.',
        },
        {
          quote: '«Yo no saqué ese aceite.»',
          text: 'Sin detalle por fecha, cada cobro termina en discusión.',
        },
        {
          quote: '«Tengo dos mil soles en la calle.»',
          text: 'Y nada en caja para pagarle al camión de la distribuidora.',
        },
      ],
    },
    marquee: 'Cuentas claras, vecinos tranquilos',
    features: {
      id: 'producto',
      title: 'No es otra libreta.<br />Es crédito con reglas.',
      lead: 'Las apps de fiado anotan saldos. Quina maneja el crédito completo: condiciones, cortes, cobranza y el mostrador.',
      more: 'Conoce más',
      items: [
        {
          tag: 'Crédito',
          title: 'Crédito con reglas claras',
          text: 'Cada vecino tiene su límite, su tasa y sus fechas pactadas. Si es de confianza, pones 0 % y cobras el monto exacto.',
          items: [
            'Límite por cliente',
            'Tasa opcional',
            'Cuotas con método francés',
            'Mora calculada aparte',
          ],
          image: 'feature-credito',
          alt: 'Laptop con la pantalla de condiciones de crédito de un cliente en Quina',
          href: '/producto/credito',
        },
        {
          tag: 'Estado de cuenta',
          title: 'Un estado de cuenta en cada corte',
          text: 'En la fecha de corte Quina cierra el ciclo y arma el detalle: qué sacó, cuándo y cuánto. Se acaba el «¿cuánto te debo?».',
          items: [
            'Liquidación automática',
            'Compras por fecha',
            'Gratis para el vecino',
            'Llega por correo',
          ],
          image: 'feature-estado-cuenta',
          alt: 'Celular mostrando el estado de cuenta mensual de una vecina en Quina',
          href: '/producto/estado-de-cuenta',
        },
        {
          tag: 'Cobranza',
          title: 'Cobra sin roche',
          text: 'Quina le recuerda la fecha de pago y avisa si hay mora. Cada cargo llega notificado y el vecino tiene 48 horas para observarlo.',
          items: [
            'Aviso antes del pago',
            'Aviso de mora',
            '48 h para observar',
            'Respaldo de cada compra',
          ],
          image: 'feature-cobranza',
          alt: 'Celular con un correo de recordatorio de pago enviado por Quina',
          href: '/producto/cobranza',
        },
        {
          tag: 'Mostrador',
          title: 'Fía en tres toques',
          text: 'Eliges al vecino, el producto y listo. Si se pasa del límite o no hay stock, Quina te avisa antes de confirmar.',
          items: [
            'Valida límite y stock',
            'Pensado para el celular',
            'Hasta 3 usuarios en Pro',
            'Kardex con costo promedio',
          ],
          image: 'feature-mostrador',
          alt: 'Bodeguero registrando una venta al crédito desde su celular en el mostrador',
          href: '/producto/mostrador',
        },
      ],
    },
    how: {
      id: 'como-funciona',
      title: 'Así de simple funciona',
      lead: 'Mira cómo Don Lucho deja el cuaderno en un día de trabajo.',
      posterAlt: 'Fotograma del video de presentación de Quina en una bodega',
      steps: [
        {
          title: 'Registra a tu casero',
          text: 'Nombre, correo, límite y fecha de pago. Un minuto por vecino, una sola vez.',
        },
        {
          title: 'Fía desde el mostrador',
          text: 'Cada venta queda con fecha y detalle. Al vecino le llega el aviso del cargo.',
        },
        {
          title: 'Quina cobra en la fecha pactada',
          text: 'En el corte arma su estado de cuenta y le recuerda pagar. Tú solo recibes.',
        },
      ],
    },
    calc: {
      title: '¿Cuánta plata tienes en la calle?',
      lead: 'Mueve los números con los de tu negocio. La cuenta es tuya, no la guardamos.',
    },
    pricing: {
      title: 'Menos de un sol al día',
      lead: 'Tus vecinos nunca pagan nada. Una sola deuda de S/ 30 que recuperes ya paga el mes de Bodega Pro.',
    },
    faqTitle: 'Lo que nos preguntan los caseros',
    cta: {
      title: 'Deja el cuaderno este mes',
      text: 'Pasa tus fiados a Quina en una tarde: cada vecino con su límite, su fecha de pago y su recordatorio.',
      primary: 'Empieza gratis hoy',
      secondary: 'Ver planes',
      secondaryHref: '/planes',
    },
  },
  en: {
    meta: {
      title: 'Quina · Neighborhood store credit, with clear rules',
      description:
        'Quina organizes store credit for Peruvian corner shops: a limit and due date per customer, a statement every cycle and automatic payment reminders. Free for up to 15 customers.',
    },
    hero: {
      title: 'Give credit calmly.<br />Quina collects.',
      lead: 'Quina tracks every credit sale, works out what you’re owed and reminds your neighbors to pay.',
      primary: 'Register your shop for free',
      secondary: 'See how it works',
      secondaryHref: '#how-it-works',
      videoTitle: 'Quina presentation video',
      videoClose: 'Close video',
      videoSoon: 'The presentation video is coming very soon.',
      hasAccount: 'Already have an account?',
      login: 'Log in',
      imageAlt: 'Shop owner at his counter handing a neighbor a purchase on credit',
      sale: 'New credit sale',
      saleOk: 'Within limit. S/ 113.60 left',
      mailTitle: 'Reminder sent',
      mailAgo: '2 min ago',
      mailBody:
        'Hi Rosa, your October statement is <strong>S/ 186.40</strong>. Your payment is due on November 5.',
      saleItems: [
        ['Gloria milk x6', 'S/ 24.60'],
        ['French bread x10', 'S/ 3.00'],
      ],
      saleLimit: 'Rosa’s limit',
      tasksTitle: 'Today’s collections',
      tasks: [
        ['Send Rosa her statement', 'Today, 9:00 AM'],
        ['Remind Juan to pay', 'Today, 6:00 PM'],
      ],
      taskNew: 'New reminder',
      calTitle: 'November payments',
      calEvents: [
        ['Nov 5', 'Rosa Quispe', 'S/ 186.40'],
        ['Nov 8', 'Juan Pérez', 'S/ 92.00'],
      ],
      calPaid: 'Paid',
    },
    problem: {
      srTitle: 'The problem with the paper credit book',
      statement:
        'Six in ten Peruvian corner shops sell on credit. Almost all of them track it in a notebook that gets wet, gets lost and calculates nothing. And asking a lifelong neighbor for money is awkward.',
      imageAlt: 'Credit notebook open on a shop counter, full of crossed-out amounts',
      pains: [
        {
          quote: '“I lost track of my neighbor’s tab.”',
          text: 'A stained or torn page is money that never comes back.',
        },
        {
          quote: '“I never bought that oil.”',
          text: 'Without dated detail, every collection turns into an argument.',
        },
        {
          quote: '“Two thousand soles are out on credit.”',
          text: 'And nothing in the till to pay the distributor’s truck.',
        },
      ],
    },
    marquee: 'Clear accounts, calm neighbors',
    features: {
      id: 'product',
      title: 'Not another notebook.<br />Credit with rules.',
      lead: 'Credit apps write down balances. Quina runs the whole credit: terms, billing cycles, collection and the counter.',
      more: '',
      items: [
        {
          tag: 'Credit',
          title: 'Credit with clear rules',
          text: 'Each neighbor has an agreed limit, rate and dates. For trusted regulars, set 0 % and collect the exact amount.',
          items: [
            'Per-customer limit',
            'Optional interest',
            'French amortization',
            'Late fees kept apart',
          ],
          image: 'feature-credito',
          alt: 'Laptop showing a customer’s credit terms in Quina',
          href: '',
        },
        {
          tag: 'Statements',
          title: 'A statement every cycle',
          text: 'On the closing date Quina closes the cycle and itemizes it: what they took, when and how much. No more “how much do I owe you?”.',
          items: [
            'Automatic settlement',
            'Purchases by date',
            'Free for neighbors',
            'Delivered by email',
          ],
          image: 'feature-estado-cuenta',
          alt: 'Phone showing a neighbor’s monthly statement in Quina',
          href: '',
        },
        {
          tag: 'Collection',
          title: 'Collect without the awkwardness',
          text: 'Quina reminds them of the due date and flags late payments. Every charge is notified and neighbors have 48 hours to dispute it.',
          items: ['Pre-due reminder', 'Overdue notice', '48 h to dispute', 'Proof of every sale'],
          image: 'feature-cobranza',
          alt: 'Phone with a payment reminder email sent by Quina',
          href: '',
        },
        {
          tag: 'Counter',
          title: 'Credit in three taps',
          text: 'Pick the neighbor, the product, done. If they are over the limit or the item is out of stock, Quina warns you first.',
          items: [
            'Checks limit and stock',
            'Built for phones',
            'Up to 3 users on Pro',
            'Weighted-cost inventory',
          ],
          image: 'feature-mostrador',
          alt: 'Shop owner recording a credit sale on his phone at the counter',
          href: '',
        },
      ],
    },
    how: {
      id: 'how-it-works',
      title: 'This is how simple it is',
      lead: 'Watch Don Lucho leave his notebook behind in one working day.',
      posterAlt: 'Still from Quina’s presentation video inside a corner shop',
      steps: [
        {
          title: 'Add your regular',
          text: 'Name, email, limit and due date. One minute per neighbor, just once.',
        },
        {
          title: 'Sell on credit at the counter',
          text: 'Every sale is dated and itemized. The neighbor is notified of the charge.',
        },
        {
          title: 'Quina collects on the due date',
          text: 'At closing it builds their statement and reminds them to pay. You just get paid.',
        },
      ],
    },
    calc: {
      title: 'How much money is out on credit?',
      lead: 'Use your own shop’s numbers. The math stays on your device.',
    },
    pricing: {
      title: 'Less than one sol a day',
      lead: 'Neighbors never pay anything. Recovering a single S/ 30 debt already covers a month of Bodega Pro.',
    },
    faqTitle: 'What shop owners ask us',
    cta: {
      title: 'Retire the notebook this month',
      text: 'Move your credit book to Quina in one afternoon: every customer with a limit, a due date and a reminder.',
      primary: 'Start free today',
      secondary: 'See plans',
      // La página de planes solo existe en castellano: lleva a los precios de la portada
      secondaryHref: '/en/#pricing',
    },
  },
  // Borrador en quechua sureño: requiere revisión de un traductor nativo antes de publicar.
  qu: {
    meta: {
      title: 'Quina · Barrioykipa manun, sut’i kamachikuykunawan',
      description:
        'Quina bodegaykipa manunta allichan: sapa vecinopaq límite, pagana p’unchaw, sapa cortepi estado de cuenta, cobranzapaq yuyarichiykunapas. 15 clientekama gratis.',
    },
    hero: {
      title: 'Hawkalla manupi quy.<br />Quina qampaq cobran.',
      lead: 'Quina yupan hayk’atam manun, pagananta yuyarichin; manam punkunta takanaykichu.',
      primary: 'Bodegaykita gratis qillqachiy',
      secondary: 'Imayna llamk’asqanta qhaway',
      secondaryHref: '#imayna',
      videoTitle: 'Quinapa videon',
      videoClose: 'Wichqay',
      videoSoon: 'Video de presentación llega muy pronto.',
      hasAccount: '¿Cuentayki kanñachu?',
      login: 'Yaykuy',
      imageAlt:
        'Bodeguero en el mostrador de su tienda entregando una compra al fiado a una vecina',
      sale: 'Musuq venta manupi',
      saleOk: 'Límite ukhupim. S/ 113.60 puchun',
      mailTitle: 'Yuyarichiy apachisqa',
      mailAgo: '2 minuto ñawpaqta',
      mailBody:
        'Rosa, octubre killapi estado de cuentayki <strong>S/ 186.40</strong>. 5 de noviembre p’unchawmi pagay.',
      saleItems: [
        ['Leche Gloria x6', 'S/ 24.60'],
        ['Pan francés x10', 'S/ 3.00'],
      ],
      saleLimit: 'Límite de Rosa',
      tasksTitle: 'Cobranza de hoy',
      tasks: [
        ['Enviar estado de cuenta a Rosa', 'Hoy, 9:00 a. m.'],
        ['Recordar pago a Juan', 'Hoy, 6:00 p. m.'],
      ],
      taskNew: 'Nuevo recordatorio',
      calTitle: 'Pagos de noviembre',
      calEvents: [
        ['5 nov', 'Rosa Quispe', 'S/ 186.40'],
        ['8 nov', 'Juan Pérez', 'S/ 92.00'],
      ],
      calPaid: 'Pagado',
    },
    problem: {
      srTitle: 'Manu cuadernopa sasachakuynin',
      statement:
        'Perú suyupi chunka bodegamanta suqtanmi manupi qunku. Yaqa llapanmi cuadernopi qillqanku: chay cuadernoqa hoqoykun, chinkan, manataq imatapas yupanchu. Wiñaypaq vecinota cobraytaqmi p’enqay.',
      imageAlt: 'Manu cuaderno bodegapa mostradorninpi kichasqa, tachasqa cuentakunawan',
      pains: [
        {
          quote: '«Vecinapa cuentanta chinkachirqani.»',
          text: 'Qillqasqa rapi chinkaptinqa, qullqiqa manañam kutimunchu.',
        },
        {
          quote: '«Manam chay aceiteta apakurqanichu.»',
          text: 'P’unchawninwan mana qillqasqa kaptinqa, sapa cobraymi ch’aqwaypi tukun.',
        },
        {
          quote: '«Iskay waranqa solesniymi callepi kachkan.»',
          text: 'Cajapitaq mana imapas kanchu distribuidorata pagapunaypaq.',
        },
      ],
    },
    marquee: 'Sut’i cuentakuna, hawka vecinokuna',
    features: {
      id: 'producto',
      title: 'Manam huk libretachu.<br />Kamachikuyniyuq manum.',
      lead: 'Manu appkunaqa saldollatam qillqanku. Quinaqa llapan manuta apaykachan: rimanakuykuna, cortekuna, cobranza, mostradorpas.',
      more: '',
      items: [
        {
          tag: 'Manu',
          title: 'Sut’i kamachikuyniyuq manu',
          text: 'Sapa vecinoqa límitenniyuq, tasanniyuq, p’unchawninkunayuqmi. Confianza kaptinqa 0 % churanki, chiqan qullqillatataq cobranki.',
          items: [
            'Sapa clientepaq límite',
            'Munasqaykiman tasa',
            'Método francés cuotakuna',
            'Mora sapaqmanta',
          ],
          image: 'feature-credito',
          alt: 'Laptop, Quinapi huk clientepa manu rimanakuyninwan',
          href: '',
        },
        {
          tag: 'Estado de cuenta',
          title: 'Sapa cortepi estado de cuenta',
          text: 'Corte p’unchawpi Quina ciclota wichqan, detalletataq ruwan: imata apakurqan, hayk’aq, hayk’atataq. Manañam «¿hayk’ataq manuyki?» kanqachu.',
          items: [
            'Kikinmanta liquidación',
            'P’unchawninman hina rantikuykuna',
            'Vecinopaq gratis',
            'Correowan chayan',
          ],
          image: 'feature-estado-cuenta',
          alt: 'Celular, Quinapi huk vecinapa killa estado de cuentanwan',
          href: '',
        },
        {
          tag: 'Cobranza',
          title: 'Mana p’enqaywan cobray',
          text: 'Quina pagana p’unchawta yuyarichin, qhipakuptinpas willan. Sapa cargom willakun, vecinotaq 48 horasta observanapaq kapun.',
          items: [
            'Manaraq pagaspa willay',
            'Qhipakuy willakuy',
            '48 horas observanapaq',
            'Sapa rantikuypa respaldon',
          ],
          image: 'feature-cobranza',
          alt: 'Celular, Quinapa apachisqan pagana yuyarichiywan',
          href: '',
        },
        {
          tag: 'Mostrador',
          title: 'Kimsa toquellapi manupi quy',
          text: 'Vecinota, productota akllanki, chaylla. Límiteta pasaptin utaq mana stock kaptinqa, Quina ñawpaqmanta willasunki.',
          items: [
            'Límiteta, stocktawan qhawan',
            'Celularpaq ruwasqa',
            'Proqa 3 usuariokama',
            'Kardex costo promediowan',
          ],
          image: 'feature-mostrador',
          alt: 'Bodeguero, mostradorpi celularninwan manupi ventata qillqachkan',
          href: '',
        },
      ],
    },
    how: {
      id: 'imayna',
      title: 'Kayhinam llamk’an',
      lead: 'Qhaway imaynatam Don Lucho huk p’unchaw llamk’aypi cuadernonta saqin.',
      posterAlt: 'Quinapa videonmanta huk rikch’ay, bodegapi',
      steps: [
        {
          title: 'Caseroykita qillqachiy',
          text: 'Sutin, correon, límiten, pagana p’unchawnin. Sapa vecinopaq huk minutolla, huk kutilla.',
        },
        {
          title: 'Mostradormanta manupi quy',
          text: 'Sapa ventam p’unchawniyuq, detalleyuq qillqakun. Vecinomanmi cargomanta willakuy chayan.',
        },
        {
          title: 'Quina rimanakusqa p’unchawpi cobran',
          text: 'Cortepi estado de cuentanta ruwan, pagananta yuyarichin. Qamqa chaskillankim.',
        },
      ],
    },
    calc: {
      title: '¿Hayk’a qullqiykitaq callepi kachkan?',
      lead: 'Negocioykipa yupayninkunawan kuyuchiy. Yupayqa celularniykillapim, manam waqaychanchikchu.',
    },
    pricing: {
      title: 'P’unchawpi huk solmanta pisilla',
      lead: 'Vecinoykikunaqa manam imatapas paganqakuchu. Huk S/ 30 manuta kutichiptiykiqa, Bodega Proqa huk killapaq pagasqañam.',
    },
    faqTitle: 'Caserokunapa tapukuyninkuna',
    cta: {
      title: 'Kay killapi cuadernota saqiy',
      text: 'Huk sukhayllapi manukunata Quinaman apay: sapa vecinopaq límite, pagana p’unchaw, yuyarichiypas.',
      primary: 'Kunanmanta gratis qallariy',
      secondary: 'Chaninkunata qhaway',
      secondaryHref: '/qu/#chaninkuna',
    },
  },
} as const;

export type HomeCopy = (typeof home)[Lang];
