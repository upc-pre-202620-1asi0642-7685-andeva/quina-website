import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  '/',
  '/en/',
  '/qu/',
  '/planes',
  '/nosotros',
  '/preguntas',
  '/blog',
  '/blog/fecha-de-corte-para-tus-fiados',
  '/recursos/calculadora',
  '/producto/credito',
  '/soluciones/bodegas',
];

// Con movimiento reducido no hay entradas a medio animar: axe mide la página
// en su estado final, sin opacidades intermedias que alteren el contraste.
test.use({ reducedMotion: 'reduce' });

for (const theme of ['light', 'dark'] as const) {
  test.describe(`tema ${theme}`, () => {
    test.use({ colorScheme: theme });
    for (const path of pages) {
      test(`${path} cumple WCAG 2.1 AA`, async ({ page }) => {
        await page.goto(path);
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();
        expect(results.violations).toEqual([]);
      });
    }
  });
}
