const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');  

//POM Class
const { Authentication } = require('../pageObject/Authentication');
const { LocationUpdate } = require('../pageObject/LocationUpdate');
const { Notifications } = require('../pageObject/Notifications');

const login = JSON.parse(JSON.stringify(require("../utills/login.json")));
const locationData = JSON.parse(JSON.stringify(require("../utills/locationDetails.json")));


test(`location update from master settings`, async ({ page }) => {

    const auth = new Authentication(page);
    const locationUpdate = new LocationUpdate(page);
    const notifications = new Notifications(page);

    const randomText = await notifications.generateRandomText(4);

    //Calling login function
    await auth.loginPage(login.username, login.password);
    await locationUpdate.profileIcon.click();
    await locationUpdate.settings.click();

    // Check if "Mehdipatnam" is already present in the table
    const existingRowLocator = page.locator('tr', { hasText: locationData.locationName });

    const isLocationPresent = await existingRowLocator.isVisible();

    if (isLocationPresent) {
        console.log('Location "Mehdipatnam" is already present. Skipping addition.');
    } else {

        //Adding location
        await locationUpdate.location.click();
        await locationUpdate.addLocationName.fill(locationData.locationName );
        await locationUpdate.locationNickName.fill(locationData.locationNickName);
        await locationUpdate.addressline.fill(locationData.addressLine);  
        await page.getByLabel('country').selectOption(locationData.country);
        await page.getByLabel('state').selectOption(locationData.state);
        await locationUpdate.city.fill(locationData.city);
        await locationUpdate.pincode.fill(locationData.pincode);
        await locationUpdate.submit.click();

        // Wait for the location to be added
        await page.waitForTimeout(1000);

        // Check if the row containing "Mehdipatnam" exists
        const rowLocator = page.locator('tr', { hasText: locationData.locationName  });

        // Assertion: Verify that the row containing "Mehdipatnam" is visible
        await expect(rowLocator).toBeVisible();

        // print out text contents 
        const cellTexts = await rowLocator.locator('td').allTextContents();
        console.log('Cell texts in the row:', cellTexts);

        // Ensure "Mehdipatnam" is indeed present
        const isTextPresent = cellTexts.some(text => text.includes(locationData.locationName ));
        expect(isTextPresent).toBe(true);
    }
    //Update location

    await page.getByRole('row', { name: locationData.locationName  }).getByLabel('').check()
    await page.getByRole('button', { name: 'caret-down' }).click();
    await page.getByText('Edit').click();
    await locationUpdate.locationNickName.waitFor({ state: 'visible' });
    await locationUpdate.clearLocationNickName();
    await locationUpdate.locationNickName.fill(randomText);
    await page.waitForTimeout(1000);
    await locationUpdate.submit.click();
    console.log('Location updated')
  
    //Delete Location

    await page.getByRole('row', { name: locationData.locationName  }).getByLabel('').check()
    await page.getByRole('button', { name: 'caret-down' }).click();
    await page.getByText('Delete').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.waitForTimeout(1000);

    // Check if the row containing "Mehdipatnam" exists
    const rowLocator = page.locator('tr', { hasText: locationData.locationName  });

    // Assertion: Verify that the row containing "Mehdipatnam" is not visible
    await expect(rowLocator).not.toBeVisible();

    // Optionally, confirm "Mehdipatnam" is indeed not present in any row
    const rowsContainingText = await page.locator('tr', { hasText: locationData.locationName  }).count();
    expect(rowsContainingText).toBe(0);

});