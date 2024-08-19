const {test, expect} = require("@playwright/test")

const { Authentication } = require('../pageObject/Authentication');
const { Holidays } = require('../pageObject/Holidays');

test('should first', async({page}) => { 
    const auth = new Authentication(page);
    await auth.loginPage('harsha@tparamount.com', 'password');

    const holidayName = "holiday200";
    const location = 'kakinada';
    const holidaydate = '2024-09-21';

    // navigate to holidays section
    const holidays = new Holidays(page);
    await holidays.navigateToHolidays();

    await holidays.createHoliday(holidayName,location,holidaydate)

    const selectedHolidayDate =  await holidays.getHolidayDateByLocation(holidayName,location)
    expect(selectedHolidayDate).toBe(holidaydate);

    await page.pause();

 })