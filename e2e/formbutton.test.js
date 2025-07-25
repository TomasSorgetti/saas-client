import { test, expect } from '@playwright/test';

// Ruta relativa al componente en la app, ajusta si es necesario
test.describe('FormButton', () => {
	test('debe renderizar y disparar onClick', async ({ page }) => {
		await page.goto('/test/formbutton'); // Crea una ruta de prueba si no existe
		const button = page.getByRole('button', { name: 'Test Botón' });
		await expect(button).toBeVisible();
		await button.click();
		await expect(page.locator('#clicked')).toHaveText('clicked');
	});

	test('debe estar deshabilitado si recibe la prop disabled', async ({ page }) => {
		await page.goto('/test/formbutton');
		const button = page.getByRole('button', { name: 'Deshabilitado' });
		await expect(button).toBeDisabled();
	});

	test('debe aplicar estilos primary y secondary', async ({ page }) => {
		await page.goto('/test/formbutton');
		const primaryBtn = page.getByRole('button', { name: 'Primario' });
		const secondaryBtn = page.getByRole('button', { name: 'Secundario' });
		await expect(primaryBtn).toHaveClass(/bg-\[linear-gradient/);
		await expect(secondaryBtn).toHaveClass(/bg-white/);
	});
});
