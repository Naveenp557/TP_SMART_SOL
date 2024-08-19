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
  await page.getByRole('link', { name: 'Shifts' }).click();
  await page.getByRole('button', { name: '+ Shift' }).click();
  await page.locator('.Select > div:nth-child(2)').first().click();
  await page.getByRole('option', { name: 'Gujrat' }).click();
  await page.locator('.basic-multi-select > div > div > div:nth-child(2)').click();
  await page.getByRole('option', { name: 'LINGAMPALLI-' }).click();
  await page.locator('.Select > div:nth-child(3)').first().click();
  await page.getByRole('option', { name: 'Uppal' }).click();
  await page.locator('div:nth-child(4)').first().click();
  await page.getByRole('option', { name: 'tpbackend' }).click();

  await page.pause();
});