import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://tpnew.tpsmartsol.com/');
  await page.getByPlaceholder('Enter your email address').click();
  await page.getByPlaceholder('Enter your email address').fill('harsha@tparamount.com');
  await page.getByPlaceholder('Enter your password').dblclick();
  await page.getByPlaceholder('Enter your password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'HR harsha reddy' }).click();
  await page.getByRole('link', { name: 'Settings' }).click();
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('test');
  await page.getByPlaceholder('Search').press('Enter');
  
});