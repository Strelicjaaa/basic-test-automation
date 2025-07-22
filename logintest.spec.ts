import { test, expect } from '@playwright/test';

test.describe('User login to Demobank website', () => {

  test('successful login', async ({ page }) => {
    //Arrange
    const url = 'https://demo-bank.vercel.app/';
    const userid =  'testerXD'
    const userpassword = '12345678'
    const expectedusername = 'Jan Demobankowy'
    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userid);
    await page.getByTestId('password-input').fill(userpassword);
    await page.getByTestId('login-button').click();
    //Assert
    await expect(page.locator('.grid-18')).toHaveText(expectedusername);
  });

  test('unsuccessful login with wrong username', async ({ page }) => {
    //Arrange
    const url = 'https://demo-bank.vercel.app/';
    const wrongid = 'teser'
    const errormsg = 'identyfikator ma min. 8 znaków'
    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(wrongid);
    await page.getByTestId('password-input').click();
    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(errormsg);
  });

  test('unsuccessful login with wrong password', async ({ page }) => {
    //Arrange
    const url ='https://demo-bank.vercel.app/';
    const userid = 'testerXD'
    const wrongpassword = '123'
    const errormsg = 'hasło ma min. 8 znaków'
    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userid);
    await page.getByTestId('password-input').fill(wrongpassword);
    await page.getByTestId('password-input').blur();
    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(errormsg);
  });
  
});
