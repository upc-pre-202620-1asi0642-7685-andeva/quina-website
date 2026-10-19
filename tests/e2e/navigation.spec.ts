import { test, expect } from '@playwright/test';

const pages = [
  '/',
  '/en/',
  '/qu/',
  '/planes',
  '/nosotros',
  '/preguntas',
  '/blog',
  '/blog/cobrar-sin-roche',
  '/recursos/calculadora',
  '/producto/credito',
  '/producto/estado-de-cuenta',
  '/producto/cobranza',
  '/producto/mostrador',
  '/producto/vecinos',
  '/soluciones/bodegas',
  '/soluciones/boticas',
  '/soluciones/panaderias',
  '/soluciones/bazares',
];

for (const path of pages) {
  test(`${path} carga con título y un h1`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/Quina/);
    await expect(page.locator('h1')).toHaveCount(1);
  });
}

test('el desplegable de Producto lleva a su página', async ({ page, isMobile }) => {
  test.skip(isMobile, 'En móvil la navegación está en el menú a pantalla completa');
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Producto' });
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await page
    .locator('#dd-0')
    .getByRole('link', { name: /Crédito con reglas/ })
    .click();
  await expect(page).toHaveURL(/\/producto\/credito$/);
});

test('un toque abre y otro cierra el idioma aunque el equipo tenga mouse', async ({ page }) => {
  // Reproduce el modo responsive de Firefox/Chrome: media query de puntero fino,
  // pero eventos táctiles que también disparan pointerenter y pointerleave.
  await page.goto('/');
  const tap = () =>
    page.evaluate(() => {
      const btn = document.querySelector('.lang-btn')!;
      const wrap = btn.closest('[data-dropdown]')!;
      const opts = { pointerType: 'touch', isPrimary: true };
      wrap.dispatchEvent(new PointerEvent('pointerenter', opts));
      btn.dispatchEvent(new PointerEvent('pointerdown', { ...opts, bubbles: true }));
      btn.dispatchEvent(new PointerEvent('pointerup', { ...opts, bubbles: true }));
      btn.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
      wrap.dispatchEvent(new PointerEvent('pointerleave', opts));
    });
  const lang = page.locator('.lang');
  await tap();
  await page.waitForTimeout(400);
  await expect(lang).toHaveAttribute('data-open', '');
  await tap();
  await expect(lang).not.toHaveAttribute('data-open', '');
});

test('el modo oscuro se recuerda al recargar', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const before = await html.getAttribute('data-theme');
  await page.locator('[data-theme-toggle]').first().click();
  const after = before === 'dark' ? 'light' : 'dark';
  await expect(html).toHaveAttribute('data-theme', after);
  await page.reload();
  await expect(html).toHaveAttribute('data-theme', after);
});

test('el menú móvil abre y cierra', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Solo en móvil');
  await page.goto('/');
  await page.locator('[data-menu-open]').click();
  await expect(page.locator('[data-menu]')).toHaveAttribute('data-open', '');
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-menu]')).not.toHaveAttribute('data-open', '');
});

test('el plan de la calculadora lleva a su tarjeta y la marca', async ({ page }) => {
  await page.goto('/');
  // Con los valores iniciales (40 vecinos) la calculadora recomienda Bodega Pro
  const link = page.locator('.calc-plan-link');
  await link.scrollIntoViewIfNeeded();
  await expect(link).toHaveAttribute('href', '#plan-bodega-pro');
  // La isla de planes se hidrata al verse: se pasa por ella antes de volver al enlace
  await page.locator('#plan-bodega-pro').scrollIntoViewIfNeeded();
  await expect(page.locator('.plans').locator('xpath=ancestor::astro-island')).not.toHaveAttribute(
    'ssr',
    '',
  );
  await link.scrollIntoViewIfNeeded();
  await link.click();

  const card = page.locator('#plan-bodega-pro');
  await expect(card).toHaveClass(/is-picked/);
  await expect(card).toBeFocused();
  await expect(card.locator('.plan-picked')).toHaveText('Tu plan según la calculadora');
  await expect(card).toBeInViewport();
});

test('desde la calculadora de recursos llega a /planes con el plan marcado', async ({ page }) => {
  await page.goto('/recursos/calculadora');
  const link = page.locator('.calc-plan-link');
  await expect(link).toHaveAttribute('href', '/planes#plan-bodega-pro');
  // La tarjeta de resultado entra con data-reveal: aparece al llegar a ella
  await link.scrollIntoViewIfNeeded();
  await expect(link).toBeVisible();
  await link.click();
  await expect(page).toHaveURL(/\/planes#plan-bodega-pro$/);
  await page.locator('#plan-bodega-pro').scrollIntoViewIfNeeded();
  await expect(page.locator('#plan-bodega-pro')).toHaveClass(/is-picked/);
});

test('con 4 o más personas que atienden la calculadora recomienda Negocio Plus', async ({
  page,
}) => {
  await page.goto('/');
  const team = page.locator('.calc-team');
  await team.scrollIntoViewIfNeeded();
  // La isla se hidrata al verse: antes de eso el control no reacciona
  await expect(page.locator('.calc').locator('xpath=ancestor::astro-island')).not.toHaveAttribute(
    'ssr',
    '',
  );
  const link = page.locator('.calc-plan-link');

  // Solo el dueño y 40 vecinos: Bodega Pro por la plata en la calle
  await expect(team.getByRole('radio', { name: 'Solo yo' })).toBeChecked();
  await expect(link).toHaveAttribute('href', '#plan-bodega-pro');

  // Con 2 o 3 personas Casero ya no alcanza (1 usuario): Bodega Pro por el equipo
  // El radio transparente cubre toda la píldora: se elige por su nombre accesible
  await team.getByRole('radio', { name: '2 o 3' }).check();
  await expect(page.locator('.calc-verdict')).toContainText('hasta 3 personas');
  await expect(link).toHaveAttribute('href', '#plan-bodega-pro');

  // Con 4 o más pasa el límite de Bodega Pro (3): Negocio Plus
  await team.getByRole('radio', { name: '4 o más' }).check();
  await expect(team.getByRole('radio', { name: '4 o más' })).toBeChecked();
  await expect(link).toHaveAttribute('href', '#plan-negocio-plus');
  await expect(link).toContainText('Negocio Plus');
});

test('si eligen el equipo antes de que cargue la calculadora, se respeta al cargar', async ({
  page,
}) => {
  await page.goto('/');
  const island = page.locator('.calc').locator('xpath=ancestor::astro-island');
  // Aún sin verse en pantalla: la isla no se hidrata y el radio es HTML puro
  await expect(island).toHaveAttribute('ssr', '');
  await page
    .locator('.calc-team input[value="large"]')
    .evaluate((el: HTMLInputElement) => el.click());

  await page.locator('.calc-team').scrollIntoViewIfNeeded();
  await expect(island).not.toHaveAttribute('ssr', '');
  await expect(page.locator('.calc-plan-link')).toHaveAttribute('href', '#plan-negocio-plus');
});
