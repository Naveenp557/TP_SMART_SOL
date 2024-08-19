import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://tpbackend.tpsmartsol.com/');
  await page.getByPlaceholder('Enter your email address').click();
  await page.getByPlaceholder('Enter your email address').fill('harsha@tparamount.com');
  await page.getByPlaceholder('Enter your password').click();
  await page.getByPlaceholder('Enter your password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'HR harsha reddy' }).click();
  await page.getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('link', { name: ' Workforce Settings ' }).click();
  await page.getByRole('link', { name: 'Holidays' }).click();
  await page.getByRole('button', { name: '+ Holiday' }).click();
  await page.locator('.select__input-container').click();
  await page.getByRole('option', { name: 'kakinada' }).click();
  await page.locator('input[name="holidayName"]').click();
  await page.locator('input[name="holidayName"]').fill('asdf');
  await page.locator('input[name="holidayDate"]').fill('2024-08-21');
  await page.getByRole('button', { name: 'Submit' }).click();
});