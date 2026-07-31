import { test, expect } from '@playwright/test';

test.describe('Lead Capture Conversion Pipeline', () => {
  test('PPC Campaign Page Form Submission', async ({ page }) => {
    // 1. Navigate to the isolated PPC landing page
    await page.goto('/campaign/google-search-baner');

    // 2. Verify the global header is hidden (CSS isolation is working)
    const header = page.locator('header');
    await expect(header).toBeHidden();

    // 3. Verify the Hero copy is present
    await expect(page.locator('h1')).toContainText('VISTAS');
    await expect(page.locator('text=Special Preview: google search baner')).toBeVisible();

    // 4. Fill out the inline contact form
    await page.fill('input[name="name"]', 'Automated Test User');
    await page.fill('input[name="email"]', 'test@krahejavistasmahalunge.com');
    await page.fill('input[name="phone"]', '9999999999');
    await page.selectOption('select[name="configuration"]', '3BHK');

    // 5. Submit the form
    await page.click('button[type="submit"]');

    // 6. Wait for the server action simulation and success state
    await expect(page.locator('text=Thank You')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=A luxury consultant will contact you shortly.')).toBeVisible();
  });
});
