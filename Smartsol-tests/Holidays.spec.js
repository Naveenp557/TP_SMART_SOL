const {test, expect} = require("@playwright/test")

const { Authentication } = require('../pageObject/Authentication');
const { Holidays } = require('../pageObject/Holidays');

test('should first', async({page}) => { 
    const auth = new Authentication(page);
    await auth.loginPage('harsha@tparamount.com', 'password');

    // navigate to holidays section
    const holidays = new Holidays(page);
    await holidays.profileIcon.click();
    await holidays.settings.click();
    await holidays.workForceSettings.click();
    await holidays.holidaysSettings.click();

    await holidays.addHolidaybtn.click();

    await holidays.locationInput.click();
    // await page.locator('.select__input-container').click();
    await page.getByRole('option', { name: 'kakinada' }).click();
    await holidays.holidayName.fill("holiday200");
    await holidays.holidayDate.fill('2024-08-21');



    await page.pause();

 })