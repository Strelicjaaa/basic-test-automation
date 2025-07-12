import { test, expect } from '@playwright/test';

test.describe('User login to Demobank website', () => {

  test('successful login', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerXD');
    await page.getByTestId('password-input').fill('12345678');
    await page.getByTestId('login-button').click();

    await expect(page.locator('.grid-18')).toHaveText('Jan Demobankowy');
  });

  test('unsuccessful login with wrong username', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('tester');
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków');
  });

  test('unsuccessful login with wrong password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerXD');
    await page.getByTestId('password-input').fill('123');
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków');
  });
  
});