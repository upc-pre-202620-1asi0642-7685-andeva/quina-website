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
  '/legal/privacidad',
  '/legal/terminos',
  '/legal/cookies',
  '/libro-de-reclamaciones',
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

test('el modo oscuro se recuerda al recargar y guarda la cookie quina-theme', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const before = await html.getAttribute('data-theme');
  await page.locator('[data-theme-toggle]').first().click();
  const after = before === 'dark' ? 'light' : 'dark';
  await expect(html).toHaveAttribute('data-theme', after);
  const cookies = await page.context().cookies();
  expect(cookies.find((c) => c.name === 'quina-theme')?.value).toBe(after);
  await page.reload();
  await expect(html).toHaveAttribute('data-theme', after);
});

test('las rutas /en/ y /qu/ guardan quina-lang y / no fuerza cookie por defecto', async ({
  page,
}) => {
  await page.goto('/');
  let cookies = await page.context().cookies();
  expect(cookies.find((c) => c.name === 'quina-lang')).toBeUndefined();

  await page.goto('/en/');
  cookies = await page.context().cookies();
  expect(cookies.find((c) => c.name === 'quina-lang')?.value).toBe('en');

  await page.goto('/qu/');
  cookies = await page.context().cookies();
  expect(cookies.find((c) => c.name === 'quina-lang')?.value).toBe('qu');
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

test('el panel de cookies abre desde el footer y respeta desactivar preferencias', async ({
  page,
}) => {
  await page.goto('/legal/cookies');
  // Sin analítica configurada no debe interrumpir ningún banner inicial
  await expect(page.locator('[data-cookie-banner]')).toHaveCount(0);

  // Primero activamos el tema para crear la cookie quina-theme
  await page.locator('[data-theme-toggle]').first().click();
  let cookies = await page.context().cookies();
  expect(cookies.find((c) => c.name === 'quina-theme')).toBeDefined();

  // Abrimos el panel desde el botón de la página y elegimos "Solo necesarias"
  await page.locator('.cookie-trigger-btn').click();
  const dialog = page.locator('[data-cookie-dialog]');
  await expect(dialog).toBeVisible();
  await dialog.locator('[data-cookie-reject-all]').click();
  await expect(dialog).not.toBeVisible();

  // La cookie de preferencia se elimina y no se vuelve a crear al cambiar tema
  cookies = await page.context().cookies();
  expect(cookies.find((c) => c.name === 'quina-theme')).toBeUndefined();
  await page.locator('[data-theme-toggle]').first().click();
  cookies = await page.context().cookies();
  expect(cookies.find((c) => c.name === 'quina-theme')).toBeUndefined();
});

test('el Libro de Reclamaciones valida y genera una hoja con código correlativo', async ({
  page,
}) => {
  await page.goto('/libro-de-reclamaciones');
  const form = page.locator('.claim-form');
  await expect(form).toHaveAttribute('data-hydrated', 'true');

  await page.getByLabel(/Nombre y apellidos completos/).fill('María Elena Quispe Flores');
  await page.getByLabel(/Número de documento/).fill('45678912');
  await page.getByLabel(/^Domicilio/).fill('Jr. Los Sauces 240, San Juan de Lurigancho, Lima');
  await page.getByLabel(/Teléfono o celular/).fill('987654321');
  await page.getByLabel(/Correo electrónico/).fill('maria@ejemplo.pe');
  await page.getByLabel(/Descripción del plan o servicio/).fill('Plan Bodega Pro mensual');
  await page
    .getByLabel(/Detalle del reclamo o queja/)
    .fill('Se realizó un cobro doble al renovar la suscripción mensual del mes en curso.');
  await page
    .getByLabel(/Pedido del consumidor/)
    .fill('Solicito el extorno del segundo cobro duplicado.');
  await page.getByLabel(/Declaro que los datos consignados son verídicos/).check();

  await page.getByRole('button', { name: 'Enviar hoja de reclamación' }).click();

  await expect(page.locator('[data-claim-code]')).toHaveText(/^LR-\d{4}-\d{5}$/);
  await expect(
    page.locator('.claim-receipt').getByText('15 días hábiles improrrogables'),
  ).toBeVisible();
});
