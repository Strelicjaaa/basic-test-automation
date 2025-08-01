import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {

    test('quick payment', async ({ page }) => {
        //Arrange
        const url = 'https://demo-bank.vercel.app/';
        const userid = 'testerXD';
        const userpassword = '12345678';
        
        const receiverid = '2';
        const tranferamount = '150';
        const tranfertitle = 'pizza';
        const expectedtransferreceiver = 'Chuck Demobankowy';
        //Act
        await page.goto(url);
        await page.getByTestId('login-input').fill(userid);
        await page.getByTestId('password-input').fill(userpassword);
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_transfer_receiver').selectOption(receiverid);
        await page.locator('#widget_1_transfer_amount').fill(tranferamount);
        await page.locator('#widget_1_transfer_title').fill(tranfertitle);

        await page.locator('#execute_btn').click();
        await page.getByTestId('close-button').click();
        //Assert
        await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! ${expectedtransferreceiver} - ${tranferamount},00PLN - ${tranfertitle}`);

    });

    test('successful mobile top-up', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('testerXD');
        await page.getByTestId('password-input').fill('password');
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
        await page.locator('#widget_1_topup_amount').fill('50');
        await page.locator('#uniform-widget_1_topup_agreement span').click();
        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 50,00PLN na numer 500 xxx xxx');

    });
});
