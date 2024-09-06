const { test, expect } = require('@playwright/test');


const { Authentication } = require('../pageObject/Authentication');
const { LocationSearchbar } = require('../pageObject/LocationSearchbar');
const { LocationUpdate } = require('../pageObject/LocationUpdate');




test(`LocationSearchbar`, async ({ page }) => {

    const locationSearchbar = new LocationSearchbar(page)
    const auth = new Authentication(page);
    const locationUpdate = new LocationUpdate(page);


    //Calling login function

    await auth.loginPage('harsha@tparamount.com', 'password');
    await locationUpdate.profileIcon.click();
    await locationUpdate.settings.click();


    await page.getByPlaceholder('Search').click();
    const location = await locationSearchbar.locationName.textContent()
    await page.waitForTimeout(1000)

    await page.getByPlaceholder('Search').fill(location);
    await page.getByPlaceholder('Search').press('Enter');

    //Assertion for location name

    const locationNameSearch = page.locator('tr', { hasText: location });
    await expect(locationNameSearch).toBeVisible();
    await page.waitForTimeout(1000)
    await page.getByPlaceholder('Search').clear()


    //Assertion for address line
    const addressLineText = await locationSearchbar.addressLine.textContent()
    await page.waitForTimeout(1000)

    await page.getByPlaceholder('Search').fill(addressLineText);
    await page.getByPlaceholder('Search').press('Enter');


    const addressLineSearch = page.locator('tr', { hasText: addressLineText });
    await expect(addressLineSearch).toBeVisible();
    await page.getByPlaceholder('Search').clear()

    //Assertion for city
    const cityText = await locationSearchbar.city.textContent()
    await page.waitForTimeout(1000)

    await page.getByPlaceholder('Search').fill(cityText);
    await page.getByPlaceholder('Search').press('Enter');

    const cityTextSearch = page.locator('tr', { hasText: cityText });
    await expect(cityTextSearch).toBeVisible();
    await page.getByPlaceholder('Search').clear()

    //Assertion for state
    const stateText = await locationSearchbar.state.textContent()
    await page.waitForTimeout(1000)

    await page.getByPlaceholder('Search').fill(stateText);
    await page.getByPlaceholder('Search').press('Enter');

    const stateTextSearch = page.locator('tr', { hasText: stateText });
    await expect(stateTextSearch).toBeVisible();
    await page.getByPlaceholder('Search').clear()

    //Assertion for pincode
    const pincodeText = await locationSearchbar.pincode.textContent()
    await page.waitForTimeout(1000)

    await page.getByPlaceholder('Search').fill(pincodeText);
    await page.getByPlaceholder('Search').press('Enter');

    const pincodeTextSearch = page.locator('tr', { hasText: pincodeText });
    await expect(pincodeTextSearch).toBeVisible();
    await page.getByPlaceholder('Search').clear()
})