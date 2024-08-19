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
  await page.locator('input[name="shiftName"]').click();
  await page.locator('input[name="shiftName"]').fill('shift300');
  await page.locator('input[name="startTime"]').click();
  await page.getByLabel('Choose Time').locator('div').nth(1).click();
  await page.getByRole('option', { name: '12:45 PM' }).click();
  await page.locator('input[name="endTime"]').click();
  await page.getByRole('option', { name: '1:30 PM', exact: true }).click();
  await page.locator('input[name="thresholdTime"]').click();
  await page.locator('input[name="thresholdTime"]').fill('2');
  await page.locator('#brekTime').click();
  await page.locator('#brekTime').fill('4');
  await page.getByRole('button', { name: 'Submit' }).click();
});