const {test, expect} = require("@playwright/test")

const moment = require("moment");
const { Authentication } = require('../pageObject/Authentication');
const { Holidays } = require('../pageObject/Holidays');

test('should first', async({page}) => { 
    const auth = new Authentication(page);
    await auth.loginPage('harsha@tparamount.com', 'password');

    const holidayName = "holiday211";
    const location = 'gujrat';
    const holidaydate = '2024-10-11';
    const updatedHolidayName = `${holidayName}updated`;

    // navigate to holidays section
    const holidays = new Holidays(page);
    await holidays.navigateToHolidays();

    await holidays.createHoliday(holidayName,location,holidaydate)

    await page.waitForTimeout(3000);

    const formattedDate = moment(holidaydate).format("DD MMM YYYY");
    const selectedHolidayDate =  await holidays.getHolidayDateByLocation(holidayName,location);
    console.log(formattedDate,selectedHolidayDate)
    expect(selectedHolidayDate).toBe(formattedDate);

    //  await page.pause();

    await holidays.editHoliday(holidayName,updatedHolidayName)

    await page.waitForTimeout(2000);

    await holidays.deleteHoliday(updatedHolidayName);
    
    await page.pause();


 })