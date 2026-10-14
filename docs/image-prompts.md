# Quina Website - Prompts de imágenes (Nano Banana) y guion del video

Este documento lista cada imagen que el website necesita, con su prompt listo
para generar en **Nano Banana**. Cada imagen tiene un **id**: es el nombre del
archivo y la etiqueta que muestra el placeholder en la página.

## Cómo reemplazar un placeholder

1. Genera la imagen con el prompt de su sección.
2. Expórtala en **WebP** (o JPG) con el nombre exacto del id. Por ejemplo,
   `hero-bodeguero-fiado.webp`.
3. Colócala en `public/images/`.
4. Recarga la página: el componente `Picture.astro` detecta el archivo y
   reemplaza el placeholder sin tocar código.

## Dirección de arte común

Aplica estas reglas a todas las imágenes para que se lean como una sola
familia visual:

- **Lugar:** Lima, Perú. Barrios populares reales (San Martín de Porres, Comas,
  Villa El Salvador, Surquillo), no postales turísticas.
- **Luz:** cálida y natural. Amanecer o media tarde, con el cielo gris-celeste
  típico de Lima.
- **Paleta:** verdes profundos (`#0a2e17`), verde Quina (`#2bdd66`) como acento
  puntual, ámbar cálido (`#ffb020`) y neutros cálidos. Sin violetas ni neones.
- **Personas:** peruanas, mestizas y andinas, de 30 a 65 años, con ropa de
  trabajo cotidiana. Expresiones tranquilas y dignas, nunca de stock sonriente
  exagerado.
- **Evitar:** texto ilegible inventado en carteles, logos de marcas reales
  deformados, manos con dedos de más, estética de banco o fintech corporativa.

---

## 1. `hero-bodeguero-fiado` - Foto del hero

- **Dónde va:** columna izquierda del hero en desktop (a la derecha va el
  titular). En móvil aparece debajo del texto, recortada a 4:3.
- **Formato:** 4:5 vertical, mínimo 1600 × 2000 px. Deja a las dos personas y
  el gesto de entrega en el centro del encuadre, porque en móvil se recorta
  arriba y abajo.

```text
Realistic documentary photograph inside a small neighborhood shop (bodega) in
Lima, Peru, at mid-morning. Behind a worn wooden counter, a Peruvian bodega
owner in his fifties, wearing a simple apron over a polo shirt, hands a plastic
bag with bread and a carton of milk to a neighbor, a Peruvian woman in her
forties standing on the customer side. With his other hand he holds a
smartphone, as if noting the sale on credit. Both have calm, friendly, natural
expressions of people who know each other, not posed stock smiles. Shelves of
everyday groceries softly blurred behind them, warm natural light coming from
the street entrance, deep green and amber color grade, 35mm lens, shallow depth
of field, authentic and dignified. No readable text, no brand logos. Vertical
4:5.
```

## 2. `menu-visual` - Panel izquierdo del menú a pantalla completa

- **Dónde va:** mitad izquierda del menú móvil y de tablet, sobre fondo oscuro.
- **Formato:** 4:5 vertical, mínimo 1600 × 2000 px.

```text
A cinematic close-up photograph of the counter of a small Peruvian neighborhood
shop (bodega) at dusk. On the worn wooden counter: a smartphone lying face up
with a soft green glow on its screen, a few coins (Peruvian soles), a loaf of
pan francés in a paper bag and a bottle of Inca Kola slightly out of focus.
Background is deep, almost black forest green with shelves of groceries fading
into darkness. Dramatic low-key lighting, warm amber practical light from one
side, shallow depth of field, 35mm film look, rich shadows. No readable text,
no brand logos visible. Vertical 4:5.
```

## 3. `cuaderno-fiados` - El problema: el cuaderno de papel

- **Dónde va:** sección del problema, junto a las frases «Se me traspapeló la
  cuenta…».
- **Formato:** 4:3 horizontal, mínimo 2000 × 1500 px.

```text
Overhead documentary photograph of a worn school notebook used as a credit
ledger ("cuaderno de fiados") lying open on a bodega counter in Lima. The pages
show handwritten names and amounts in blue ballpoint, many crossed out and
rewritten, a coffee ring stain, a torn corner, a pencil and a rubber band. Next
to it: a few coins, a calculator with faded buttons and a receipt pad. Warm
natural window light, slightly desaturated colors with amber highlights,
realistic paper texture, tactile and honest. The handwriting should look
natural but not contain legible real names. 4:3 horizontal.
```

## 4. `feature-credito` - Crédito con reglas claras

- **Dónde va:** primera fila de la sección de producto (fondo casi negro, la
  imagen se inclina en 3D al hacer scroll).
- **Formato:** 16:10 horizontal, mínimo 2400 × 1500 px.
- **Nota:** si prefieres usar capturas reales de la webapp, reemplaza esta
  imagen por una captura de la pantalla de condiciones de crédito.

```text
A clean product render of an open silver laptop floating at a slight angle on a
deep near-black green background (#0b120d). The screen shows a modern, minimal
web app for managing store credit: a customer profile card with a credit limit
progress bar in bright green (#2bdd66), fields for interest rate set to 0 %,
payment day and cut-off date, and a small installment schedule table. White UI
with dark green accents, Albert Sans-like geometric sans-serif typography,
generous spacing. Soft rim light on the laptop edges, subtle reflection,
premium studio lighting, no brand logos, 16:10.
```

## 5. `feature-estado-cuenta` - Estado de cuenta en cada corte

- **Dónde va:** segunda fila de la sección de producto.
- **Formato:** 16:10 horizontal, mínimo 2400 × 1500 px.

```text
Product shot of a modern smartphone held at a three-quarter angle against a
deep near-black green background (#0b120d). The screen shows a monthly account
statement for a neighborhood shop customer: header "Estado de cuenta - Octubre",
a total amount in large bold numbers, a list of purchases with dates and small
amounts in soles, and a bright green (#2bdd66) "Pagar antes del 5 de noviembre"
banner. Minimal white interface, geometric sans-serif typography. Cinematic
studio lighting, soft green glow from the screen, subtle depth of field, no
real brand logos, 16:10.
```

## 6. `feature-cobranza` - Cobra sin roche

- **Dónde va:** tercera fila de la sección de producto.
- **Formato:** 16:10 horizontal, mínimo 2400 × 1500 px.

```text
Warm documentary photograph of a middle-aged Peruvian woman (a neighbor, about
55 years old) standing at her doorway in a Lima neighborhood, calmly reading a
payment reminder email on her phone, with a relaxed, reassured expression. Soft
late-afternoon light, painted walls in faded turquoise and ochre behind her, a
potted plant. The phone screen glows faintly green. Natural colors with deep
green shadows and amber highlights, shallow depth of field, 50mm lens look,
respectful and dignified, no visible text, 16:10.
```

## 7. `feature-mostrador` - Fía en tres toques

- **Dónde va:** cuarta fila de la sección de producto.
- **Formato:** 16:10 horizontal, mínimo 2400 × 1500 px.

```text
Documentary photograph of a Peruvian bodega owner in his fifties ("Don Lucho"),
wearing a simple apron over a polo shirt, standing behind his counter during a
busy morning and tapping on his smartphone with one thumb while handing a bag of
bread to a customer whose hands are visible at the edge of the frame. Shelves
full of everyday groceries behind him, slightly blurred. Natural warm light from
the street entrance, authentic and busy but calm atmosphere, deep green and
amber color grade, 35mm lens, no readable brand logos, 16:10.
```

## 8. `video-poster` - Portada del video de presentación

- **Dónde va:** fotograma estático que se ve antes de reproducir el video (y
  mientras el video aún no existe).
- **Formato:** 16:9 horizontal, mínimo 2560 × 1440 px.

```text
Cinematic wide shot of the inside of a small, tidy neighborhood shop in Lima at
golden hour. The owner stands behind the counter looking at his phone with a
quiet smile; afternoon sunlight enters from the street and draws long warm
shadows across the floor. Shelves of rice, oil, milk and bread, a hanging bunch
of bananas, a hand-painted sign without legible words. Film still aesthetic,
anamorphic feel, deep green shadows and amber highlights, lots of breathing room
in the center for a play button overlay, 16:9.
```

---

## Imágenes de las páginas internas

Todas van en la tarjeta verde menta del encabezado de cada página, en formato
**4:3 horizontal** (mínimo 2000 × 1500 px).

### `vecinos-celular` - /producto/vecinos

```text
Warm documentary photograph of a Peruvian woman in her sixties sitting at her
kitchen table in a modest Lima home, checking her account from the corner shop
on her smartphone with reading glasses on, a cup of tea beside her. Morning
light through a window with a lace curtain, calm and reassured expression,
deep green and amber color grade, no readable text, 4:3.
```

### `solucion-bodega` - /soluciones/bodegas

```text
Street-level photograph of a classic Lima neighborhood bodega in the morning:
a barred counter window full of snacks, bread in a basket, crates of soft
drinks stacked by the door and a hand-painted facade in faded green. A
neighbor buying while the owner attends. Natural light, authentic and lively,
no readable brand logos, 4:3.
```

### `solucion-botica` - /soluciones/boticas

```text
Interior photograph of a small independent pharmacy (botica) in a Lima
neighborhood: a glass counter, tidy shelves of medicine boxes without legible
brands, a pharmacist in a white coat talking kindly to an elderly customer.
Clean warm light, calm atmosphere, deep green accents, 4:3.
```

### `solucion-panaderia` - /soluciones/panaderias

```text
Early-morning photograph of a neighborhood bakery in Lima at 6 a.m.: wicker
baskets full of fresh pan francés, warm light from the oven at the back, a
baker in an apron handing a paper bag to a neighbor in a jacket. Golden steam,
warm amber tones against deep shadows, 4:3.
```

### `solucion-bazar` - /soluciones/bazares

```text
Photograph of a small bazaar in a Lima neighborhood during back-to-school
season: shelves packed with notebooks, backpacks, toys and gift wrap, a mother
and child choosing school supplies while the owner notes the sale on her phone.
Colorful but slightly desaturated, warm light, no readable brands, 4:3.
```

### `nosotros-arbol-quina` - /nosotros

- **Formato:** 4:5 vertical (mínimo 1600 × 2000 px).
- **Nota:** también existen láminas botánicas reales de *Cinchona officinalis*
  de dominio público (por ejemplo, en Wikimedia Commons o la Biodiversity
  Heritage Library), que se pueden usar con su crédito.

```text
A vintage nineteenth-century botanical illustration of the cinchona tree
(Cinchona officinalis), the "árbol de la quina" from Peru's national coat of
arms: a branch with glossy green leaves, clusters of small pink-white flowers
and seed pods, delicately hand-colored engraving on aged cream paper with soft
foxing, scientific plate composition, elegant and calm, no text labels, 4:5.
```

---

## Imagen para compartir (Open Graph)

- **Archivo:** `public/og/quina-og.png` (reemplaza la provisional generada con
  la marca). Es la vista previa que aparece al compartir el enlace en
  WhatsApp, Facebook, LinkedIn o X.
- **Formato:** exactamente **1200 × 630 px**, PNG o JPG de menos de 1 MB.
- **Composición:** la mitad izquierda queda libre para el texto que se agrega
  después en Figma o Canva (el isologo y «Fía tranquilo. Quina cobra por ti.»).
  Nano Banana no debe escribir texto, porque lo deforma.
- **Zona segura:** WhatsApp y otras apps recortan la imagen en cuadrado al
  centro. Lo importante de la escena debe ir en el centro-derecha, sin tocar los
  bordes.

```text
Wide cinematic photograph for a social media link preview, 1200x630
composition. On the right half, the warm interior of a small neighborhood
corner shop (bodega) in Lima, Peru at golden hour: a wooden counter, shelves
with rice, oil, milk and bread slightly out of focus, and a smiling shop owner
in his fifties holding a smartphone that glows soft green. The left half of
the frame fades into a calm, deep forest green background (#0a2e17) with
gentle natural shadows, completely empty, leaving clean space for a logo and a
headline to be added later. Color grade: deep greens and warm amber
highlights, soft film grain, shallow depth of field, authentic and dignified.
No text, no letters, no logos, no watermarks.
```

---

## 9. Guion del video de presentación (HyperFrames)

- **Archivo final:** `public/video/quina-presentacion.mp4` (H.264, 1920 × 1080,
  menos de 12 MB). La sección *Cómo funciona* lo detecta y reemplaza el
  placeholder automáticamente.
- **Duración objetivo:** 60 a 75 segundos.
- **Referencia de ritmo:** el video de Viora. Cortes limpios, interfaz real en
  pantalla, texto grande animado y música instrumental tranquila.

| Escena | Duración | Qué se ve | Texto en pantalla |
| :--- | :--- | :--- | :--- |
| Apertura | 0-6 s | El cuaderno de fiados (`cuaderno-fiados`) con zoom lento. Una hoja se arranca. | «¿Cuánto te debo, casero?» |
| Problema | 6-14 s | Tres frases de los caseros aparecen una tras otra sobre fondo verde oscuro. | «Se me traspapeló la cuenta», «Yo no saqué ese aceite», «Tengo dos mil soles en la calle» |
| Giro | 14-20 s | El isologo de Quina se dibuja y el fondo cambia a verde Quina. | «Fía tranquilo. Quina cobra por ti.» |
| Registro | 20-32 s | Interfaz: se crea a Rosa Quispe con su límite de S/ 300, tasa 0 % y fecha de pago el día 5. | «Cada vecino con sus reglas» |
| Venta | 32-42 s | Interfaz: venta al crédito en tres toques y validación de límite en verde. | «Fía en tres toques» |
| Corte | 42-52 s | Interfaz: liquidación de octubre y correo de recordatorio enviado. | «Un estado de cuenta en cada corte» |
| Cierre | 52-65 s | `video-poster` con Don Lucho tranquilo. CTA y URL. | «Gratis hasta 15 vecinos · quina.andeva.tech» |
