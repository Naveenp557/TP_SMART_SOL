const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');  // Or 'firefox' or 'webkit'

//POM Class
const { Authentication } = require('../pageObject/Authentication');
const { LocationUpdate } = require('../pageObject/LocationUpdate');


test(`location update from master settings`, async ({ page }) => {

    const auth = new Authentication(page);
    const locationUpdate = new LocationUpdate(page);

    //Calling login function
    await auth.loginPage('harsha@tparamount.com', 'password');

    // Wait for the table to be visible
    // await locationUpdate.table.waitFor({ state: 'visible' });

    // Check if "Mehdipatnam" is already present in the table
    const locationName = 'Mehdipatnam';  

    //Adding location
    await locationUpdate.addLocation(locationName);
    await page.waitForTimeout(1000);

    const rowLocator = page.locator('tr', { hasText: locationName });
    await expect(rowLocator).toBeVisible();

    // print out text contents 
    const cellTexts = await rowLocator.locator('td').allTextContents();
    const isTextPresent = cellTexts.some(text => text.includes(locationName));
    expect(isTextPresent).toBe(true);
    

    //Update location
    await locationUpdate.updateLocationNickName(locationName);
  

    //Delete Location
    await locationUpdate.deleteLocation(locationName);
    await page.waitForTimeout(1000);
    const rowLocator2 = page.locator('tr', { hasText: locationName });
    await expect(rowLocator2).not.toBeVisible();

    const rowsContainingText = await page.locator('tr', { hasText: locationName }).count();
    expect(rowsContainingText).toBe(0);

});