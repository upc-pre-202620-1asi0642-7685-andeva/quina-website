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
