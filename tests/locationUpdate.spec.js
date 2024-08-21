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
    await locationUpdate.table.waitFor({ state: 'visible' });

    // Check if "Mehdipatnam" is already present in the table
    const existingRowLocator = page.locator('tr', { hasText: 'Mehdipatnam' });

    const isLocationPresent = await existingRowLocator.isVisible();

    if (isLocationPresent) {
        console.log('Location "Mehdipatnam" is already present. Skipping addition.');
    } else {

        //Adding location
        await locationUpdate.profileIcon.click();
        await locationUpdate.settings.click();
        await locationUpdate.location.click();
        await locationUpdate.addLocationName.fill('Mehdipatnam');
        await locationUpdate.locationNickName.fill('MPTN');
        await locationUpdate.addressline.fill('Near to entrance city');
        await locationUpdate.city.fill('Hyderabad');
        await locationUpdate.state.fill('Telangana');
        await locationUpdate.country.fill('India');
        await locationUpdate.pincode.fill('500005');
        await locationUpdate.submit.click();

        // Wait for the location to be added
        await page.waitForTimeout(1000);

        // Check if the row containing "Mehdipatnam" exists
        const rowLocator = page.locator('tr', { hasText: 'Mehdipatnam' });

        // Assertion: Verify that the row containing "Mehdipatnam" is visible
        await expect(rowLocator).toBeVisible();

        // print out text contents 
        const cellTexts = await rowLocator.locator('td').allTextContents();
        console.log('Cell texts in the row:', cellTexts);

        // Ensure "Mehdipatnam" is indeed present
        const isTextPresent = cellTexts.some(text => text.includes('Mehdipatnam'));
        expect(isTextPresent).toBe(true);
    }

    //Update location
    await page.getByRole('row', { name: 'Mehdipatnam Near to entrance' }).getByLabel('').check();
    await page.getByRole('button', { name: 'caret-down' }).click();
    await page.getByText('Edit').click();
    await locationUpdate.locationNickName.waitFor({ state: 'visible' });
    await locationUpdate.clearLocationNickName();
    await locationUpdate.locationNickName.fill('MPNM');
    await page.waitForTimeout(1000);
    await locationUpdate.submit.click();
    await page.waitForTimeout(1000);

    //Delete Location
    await page.getByRole('row', { name: 'Mehdipatnam Near to entrance' }).getByLabel('').check();
    await page.getByRole('button', { name: 'caret-down' }).click();
    await page.getByText('Delete').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.waitForTimeout(1000);

    // Check if the row containing "Mehdipatnam" exists
    const rowLocator = page.locator('tr', { hasText: 'Mehdipatnam' });

    // Assertion: Verify that the row containing "Mehdipatnam" is not visible
    await expect(rowLocator).not.toBeVisible();

    // Optionally, confirm "Mehdipatnam" is indeed not present in any row
    const rowsContainingText = await page.locator('tr', { hasText: 'Mehdipatnam' }).count();
    expect(rowsContainingText).toBe(0);

});