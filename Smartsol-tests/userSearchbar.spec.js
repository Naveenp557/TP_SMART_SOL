const { test, expect } = require('@playwright/test');


const { Authentication } = require('../pageObject/Authentication');
const { UserSearchbar } = require('../pageObject/UserSearchbar');
const { LocationUpdate } = require('../pageObject/LocationUpdate');




test(`UserSearchbar`, async ({ page }) => {

    const userSearchbar = new UserSearchbar(page)
    const auth = new Authentication(page);
    const locationUpdate = new LocationUpdate(page);


    //Calling login function

    await auth.loginPage('harsha@tparamount.com', 'password');
    await locationUpdate.profileIcon.click();
    await locationUpdate.settings.click();
    await userSearchbar.userTab.click()
    


    await page.getByPlaceholder('Search').click();
    const userName = await userSearchbar.userName.textContent()
    await page.waitForTimeout(1000)

    await page.getByPlaceholder('Search').fill(userName);
    await page.getByPlaceholder('Search').press('Enter');

    //Assertion for location name

    const userNameSearch = page.locator('tr', { hasText: userName });
    await expect(userNameSearch).toBeVisible();
    await page.waitForTimeout(1000)
    await page.getByPlaceholder('Search').clear()


    //Assertion for address line
    const emailText = await userSearchbar.email.textContent()
    await page.waitForTimeout(1000)

    await page.getByPlaceholder('Search').fill(emailText);
    await page.getByPlaceholder('Search').press('Enter');


    const emailSearch = page.locator('tr', { hasText: emailText });
    await expect(emailSearch).toBeVisible();
    await page.getByPlaceholder('Search').clear()

    // //Assertion for phone
    // const phoneText = await userSearchbar.phone.textContent()
    // await page.waitForTimeout(1000)

    // await page.getByPlaceholder('Search').fill(phoneText);
    // await page.getByPlaceholder('Search').press('Enter');

    // const phoneTextSearch = page.locator('tr', { hasText: phoneText });
    // await expect(phoneTextSearch).toBeVisible();
    // await page.getByPlaceholder('Search').clear()

    //Assertion for userRole
    // const userRoleText = await userSearchbar.userRole.textContent()
    // await page.waitForTimeout(1000)

    // await page.getByPlaceholder('Search').fill(userRoleText);
    // await page.getByPlaceholder('Search').press('Enter');

    // const userRoleTextSearch = page.locator('tr', { hasText: userRoleText });
    // await expect(userRoleTextSearch).toBeVisible();
    // await page.getByPlaceholder('Search').clear()

    //Assertion for location
    const locationText = await userSearchbar.location.textContent()
    await page.waitForTimeout(1000)

    await page.getByPlaceholder('Search').fill(locationText);
    await page.getByPlaceholder('Search').press('Enter');

    const locationTextSearch = page.locator('tr', { hasText: locationText });
    await expect(locationTextSearch).toBeVisible();
    await page.getByPlaceholder('Search').clear()
})