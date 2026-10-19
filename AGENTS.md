# AGENTS.md - Quina Website

Guía para agentes de IA (Claude Code, Codex, Gemini, etc.) y personas que
trabajen en este repositorio. Léela antes de proponer o aplicar cambios.

Quina es una webapp que ordena el fiado de las bodegas y comercios de barrio
del Perú. Este repositorio es **solo el sitio público** (`quina.andeva.tech`).
La webapp es otro proyecto y vivirá en `quina.andeva.tech/app`.

---

## 1. Principio de diseño: coherencia antes que parches

Este es el principio más importante del repositorio.

Cuando el usuario pide un cambio de diseño (un efecto que vio en otra web, una
sección nueva, una animación, un color), **no lo apliques al pie de la letra
por defecto**. El objetivo es una página que se sienta pensada como un todo, no
una suma de piezas copiadas de distintos sitios.

Antes de implementar un pedido de diseño:

1. **Entiende la intención.** ¿Qué le gustó realmente? ¿El movimiento, la
   jerarquía, la sensación de calidad, la forma de presentar el producto?
2. **Evalúalo en contexto.** Pregúntate si encaja con Quina (un producto
   cercano y confiable para bodegueros), con el sistema de diseño y con lo que
   ya existe en la página.
3. **Adáptalo.** Toma la idea y llévala al lenguaje visual de Quina: sus
   colores, su tipografía, su ritmo de animación y sus componentes.
4. **Propón o recomienda cuando no encaje.** Si el pedido rompe la coherencia
   (otro estilo de botón, una tercera tipografía, una animación que compite con
   la principal, una sección que repite otra), dilo con claridad, explica por
   qué y ofrece una alternativa concreta.
5. **Evita la acumulación.** Si una idea nueva cumple la misma función que algo
   existente, reemplaza o fusiona en lugar de sumar. Menos piezas, mejor
   resueltas.

**La última palabra es del usuario.** Si después de tu recomendación quiere el
cambio tal cual, aplícalo al 100 % sin insistir. Recomendar no es bloquear.

### Señales de que una página se está volviendo un "Frankenstein"

- Dos o más estilos distintos para el mismo tipo de componente (botones,
  tarjetas, encabezados de sección).
- Varias animaciones protagonistas compitiendo en la misma pantalla.
- Secciones vecinas con la misma composición o que dicen lo mismo.
- Colores, radios o sombras fuera de los tokens del sistema de diseño.
- Efectos que no ayudan a contar qué hace Quina ni por qué conviene.

Si detectas alguna, menciónalo aunque no te lo hayan preguntado.

### Decisiones de diseño ya tomadas por el usuario

Estas se eligieron a propósito y no deben "corregirse" aunque una skill las
desaconseje:

- Header fijo de ancho completo con efecto vidrio (glass) al hacer scroll.
- Menús desplegables que abren con hover y desenfocan la página, como en
  open-design. El selector de idioma abre con clic.
- Menú móvil a pantalla completa con numeración `/ 01` y líneas, al estilo Azurio.
- Botones con efecto imán, dispositivos con inclinación 3D en la sección de
  producto y footer que se revela desde atrás.
- Botón principal "Empieza gratis" siempre en verde Quina. El logo siempre en su
  verde original.

---

## 2. Stack y comandos

- **Astro 7** con islas de **React 19**, **Tailwind CSS 4**, **GSAP** con
  ScrollTrigger, **Lenis**, **MDX** y adaptador de **Vercel**.
- **TypeScript 6** en modo estricto (`astro/tsconfigs/strictest`). TS 7 todavía
  no es compatible con `typescript-eslint` ni con `@astrojs/check`.
- **pnpm** siempre. Nunca `npm` ni `yarn`; usa `pnpm dlx` en lugar de `npx`.
- Node 22.12 o superior.

```bash
pnpm dev            # servidor de desarrollo en http://localhost:4321
pnpm build          # astro check + astro build
pnpm check          # tipos
pnpm lint           # ESLint (incluye jsx-a11y)
pnpm format         # Prettier (con plugins de Astro y Tailwind)
pnpm test           # Playwright: e2e y accesibilidad WCAG 2.1 AA
```

---

## 3. Estructura

```text
src/
├── components/astro/        # Componentes del sitio (Header, Hero, Footer...)
│   └── page/                # Bloques reutilizables de páginas internas
├── components/react/        # Islas interactivas (calculadora, planes, FAQ)
├── data/                    # Contenido: product.ts, solutions.ts, faq.ts, site.ts
├── i18n/                    # ui.ts (navegación y textos), home.ts, islands.ts
├── content/blog/            # Artículos MDX
├── layouts/BaseLayout.astro # SEO, Open Graph, tema, header y footer
├── pages/                   # Rutas (es en la raíz, /en/ y /qu/)
├── scripts/site.ts          # Todo el movimiento: Lenis, GSAP, menús, imán
└── styles/global.css        # Tokens de color, tipo y movimiento
docs/                        # Sistema de diseño, marketing, precios, prompts de imágenes
```

- Las páginas de producto y soluciones salen de plantillas
  (`pages/producto/[slug].astro`, `pages/soluciones/[slug].astro`). Para editar
  sus textos, cambia `src/data/`, no el diseño.
- Las imágenes son placeholders hasta que exista `public/images/<id>.webp`. El
  componente `Picture.astro` las reemplaza solo. Los prompts están en
  `docs/image-prompts.md`.

---

## 4. Reglas del sistema de diseño

La fuente de verdad es `docs/design-system.md`.

- **Colores:** solo los tokens de `src/styles/global.css`. Para superficies que
  cambian con el tema usa `--color-paper`, `--color-surface`, `--color-ink`,
  `--color-ink-soft` y `--color-line`; nunca `#fff` fijo en un fondo que debe
  oscurecerse.
- **Tipografía:** solo Albert Sans. No agregues otra familia.
- **Botones:** el componente `Button.astro` (forma de píldora, variantes
  `primary`, `dark`, `light`, `ghost`). No crees estilos nuevos de botón.
- **Modo oscuro:** todo componente nuevo debe verse bien en ambos temas.
- **Estilos en componentes Astro:** el CSS con scope del componente gana a las
  utilidades de Tailwind. No mezcles `display` de Tailwind (`hidden`,
  `lg:flex`) con un `display` definido en el `<style>` del mismo elemento.

## 5. Movimiento

- Todo el JavaScript de animación vive en `src/scripts/site.ts` y se activa con
  atributos: `data-split`, `data-reveal-group` + `data-reveal`,
  `data-scrub-words`, `data-tilt`, `data-magnetic`, `data-marquee`.
- Anima solo `transform` y `opacity`.
- Cada animación debe respetar `prefers-reduced-motion`.
- El hover se decide por `pointerType === 'mouse'` en cada evento, no por media
  queries: en móviles y en el modo responsive de los navegadores llegan eventos
  táctiles aunque la media query diga "mouse".

## 6. Idiomas

- Castellano en la raíz, inglés en `/en/` y quechua en `/qu/`. Por ahora solo la
  portada está traducida.
- Los textos traducibles viven en `src/i18n/`. No escribas textos de interfaz
  sueltos dentro de los componentes de la portada.
- El quechua es un **borrador** pendiente de revisión por un traductor nativo.
- Al elegir un idioma se guarda la cookie `quina-lang`, que leerá la webapp.

## 7. Contenido

- Usa el lenguaje del comerciante peruano: casero, vecino, fiado, fecha de
  corte, plata en la calle. Evita la jerga bancaria (ver
  `docs/product-marketing.md`).
- **No inventes pruebas:** ni testimonios, ni logos de clientes, ni cifras de
  negocio que no estén en los documentos de `docs/`.

## 8. Calidad antes de terminar

Antes de dar por terminado un cambio:

1. `pnpm format`, `pnpm check` y `pnpm lint` sin errores.
2. `pnpm test` en verde (e2e y accesibilidad en tema claro y oscuro).
3. Revisa el resultado visual en escritorio (1440 px) y móvil (390 px), en
   ambos temas.

## 9. Git y despliegue

- **Commits:** Conventional Commits en inglés (`feat(scope): summary`).
- **Ramas:** git-flow. `main` es producción y `develop` es integración; el
  trabajo va en `feature/<nombre>`. Las versiones son SemVer sin prefijo `v`.
- **Despliegue:** Vercel publica `main` en `quina.andeva.tech` en cada push. El
  DNS está en Cloudflare: CNAME `quina` hacia Vercel, con el proxy apagado.
- Las cabeceras de seguridad y las redirecciones (`/login` → `/app/login`)
  viven en `vercel.json`. La arquitectura de dominio con la webapp está en
  `docs/quina-website-documentation.md`, sección 5.
