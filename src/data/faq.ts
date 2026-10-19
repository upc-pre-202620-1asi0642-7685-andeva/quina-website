import type { FaqItem } from '@/components/react/Faq';

export const homeFaq: FaqItem[] = [
  {
    q: '¿No me hará perder tiempo cuando hay cola?',
    a: 'Registrar un fiado toma tres toques en el celular: eliges al vecino, el producto y confirmas. Es tan rápido como buscar el lapicero.',
  },
  {
    q: 'A mis vecinos no les gusta que les cobre intereses.',
    a: 'No tienes que cobrarlos. Puedes poner la tasa en 0 % para tus caseros de confianza y cobrar solo el monto exacto, o activar intereses únicamente si se atrasan.',
  },
  {
    q: '¿Y si mi vecino no tiene internet?',
    a: 'Le llega su detalle por correo cuando tiene señal, y tú puedes mostrarle su estado de cuenta en tu pantalla o imprimirlo cuando venga a la bodega.',
  },
  {
    q: '¿Quina presta plata o se queda con parte de mis ventas?',
    a: 'No. Quina es un software para ordenar tu crédito. No presta dinero ni cobra comisión por venta: pagas una suscripción fija, o nada si usas el Plan Casero.',
  },
  {
    q: '¿Qué pasa con los datos de mis clientes?',
    a: 'Se tratan según la Ley N.° 29733 de Protección de Datos Personales. No los compartimos con terceros y cada vecino puede ejercer sus derechos de acceso, rectificación, cancelación y oposición.',
  },
];

export const homeFaqEn: FaqItem[] = [
  {
    q: 'Won’t it slow me down when there’s a line?',
    a: 'Recording a credit sale takes three taps on your phone: pick the neighbor, the product and confirm. It’s as fast as finding a pen.',
  },
  {
    q: 'My neighbors don’t like being charged interest.',
    a: 'You don’t have to charge it. Set the rate to 0 % for trusted regulars and collect the exact amount, or only apply interest when a payment is late.',
  },
  {
    q: 'What if my neighbor has no internet?',
    a: 'They get their statement by email whenever they have signal, and you can show it on your screen or print it when they come to the shop.',
  },
  {
    q: 'Does Quina lend money or take a cut of my sales?',
    a: 'No. Quina is software to organize your credit. It doesn’t lend money or charge per sale: you pay a flat subscription, or nothing on the Casero plan.',
  },
  {
    q: 'What happens to my customers’ data?',
    a: 'It is handled under Peru’s Personal Data Protection Law (Law No. 29733). We don’t share it with third parties and every neighbor can exercise their access, correction, deletion and objection rights.',
  },
];

// Borrador en quechua sureño: requiere revisión de un traductor nativo antes de publicar.
export const homeFaqQu: FaqItem[] = [
  {
    q: '¿Manachu runakuna suyachkaptin qhipachiwanqa?',
    a: 'Huk manuta qillqanaykipaqqa celularniykipi kimsa toquellam: vecinota akllanki, productota, hinaspa confirmanki. Lapiceroykita maskay hinallam.',
  },
  {
    q: 'Vecinoykunaqa manam interés cobrasqa kayta munankuchu.',
    a: 'Manam cobranaykichu. Confianza caserokunapaqqa tasata 0 %-pi churanki, chiqan qullqillatataq cobranki; utaq qhipakuptinkulla interesta churanki.',
  },
  {
    q: '¿Vecinoypa internetnin mana kaptinri?',
    a: 'Señal kaptinmi correonpi detallenta chaskin. Qampas pantallaykipi rikuchinkim utaq imprimiwaq bodegaman hamuptin.',
  },
  {
    q: '¿Quinachu qullqita manuchin utaq ventaykunamanta hap’in?',
    a: 'Manam. Quinaqa manuykita allichanapaq software. Manam qullqita manuchinchu, manataq sapa ventamanta cobranchu: huk suscripciónllata paganki, Plan Caserowanqa manam imatapas.',
  },
  {
    q: '¿Imataq clienteykunapa datonkunawan pasan?',
    a: 'Ley N.° 29733 (Ley de Protección de Datos Personales) nisqaman hinam waqaychakun. Manam hukkunaman quykuchu, sapa vecinotaq derechonkunata mañakunman: rikuy, allichay, chinkachiy, mana munay.',
  },
];

// En la portada lo responde la sección "Hecho para tu mostrador"; aquí se mantiene
const installFaq: FaqItem = {
  q: '¿Necesito instalar algo?',
  a: 'No. Quina funciona desde el navegador de tu celular y puedes agregarla a tu pantalla de inicio como una app.',
};

export const faqGroups: { title: string; items: FaqItem[] }[] = [
  { title: 'Empezar a usar Quina', items: [...homeFaq, installFaq] },
  {
    title: 'Planes y pagos',
    items: [
      {
        q: '¿El Plan Casero es gratis para siempre?',
        a: 'Sí. Puedes llevar hasta 15 vecinos con crédito y 50 productos sin pagar nada y sin registrar una tarjeta.',
      },
      {
        q: '¿Qué pasa cuando llego al vecino 16?',
        a: 'Quina te avisa y te muestra cuánto crédito has ordenado. Puedes pasar a Bodega Pro o seguir con tus 15 vecinos actuales.',
      },
      {
        q: '¿Hay prueba del Plan Pro?',
        a: 'Cada tienda nueva tiene 14 días de Bodega Pro para probar los avisos automáticos y el kardex.',
      },
      {
        q: '¿Cuánto ahorro pagando al año?',
        a: 'El pago anual tiene 20 % de descuento: Bodega Pro queda en S/ 279 al año y Negocio Plus en S/ 660.',
      },
    ],
  },
  {
    title: 'Crédito e intereses',
    items: [
      {
        q: '¿Cómo calcula Quina los intereses?',
        a: 'Con la tasa efectiva que pactas con cada vecino. Las cuotas usan el método francés y la mora se calcula aparte, por días de atraso.',
      },
      {
        q: '¿Hay un límite legal para las tasas?',
        a: 'Sí. El Banco Central de Reserva del Perú fija tasas máximas para operaciones fuera del sistema financiero. Al pactar una tasa, respeta ese tope.',
      },
      {
        q: '¿Puedo cambiar las condiciones de un vecino?',
        a: 'Sí, para los ciclos siguientes. Lo ya liquidado se mantiene para que el historial sea confiable.',
      },
    ],
  },
];
