const { test, expect } = require('@playwright/test');

//POM Class
const { Authentication } = require('../pageObject/Authentication');
const {Roles} = require("../pageObject/Roles")

test('check roles and permissions', async ({page}) => { 
    const auth = new Authentication(page);
    await auth.loginPage('asdf@gmail.com', 'password');

    // finding the required user
    const roles  = new Roles(page);
    await roles.profileIcon.click();
    await roles.settings.click();
    await roles.roleslink.click();
    await roles.userselect.click();
    await page.waitForTimeout(2000);

    // unsetting the all permissions
    const bool = await roles.selectall.isChecked();
    if(bool) {
       await roles.selectall.click();

    } else {
        await roles.selectall.click();
        await page.waitForTimeout(1000);
        await roles.selectall.click();
        await page.waitForTimeout(1000);

    }


    // setting employ read and edit settings
    await page.waitForTimeout(2000);
    await page.getByRole('row', { name: 'Employee' }).getByRole('checkbox').nth(1).click();
    await page.getByRole('row', { name: 'Employee' }).getByRole('checkbox').nth(2).click();
    await page.waitForTimeout(1000);

    // await page.pause();

    // await roles.securityTab.click();
    // handling security permissions and de-selecting all permissions
    await roles.securityTab2.nth(1).click();
    const bool2 = await roles.selectall.isChecked();
    if(bool2) {
       await roles.selectall.click();

    } else {
        await roles.selectall.click();
        await page.waitForTimeout(1000);
        await roles.selectall.click();
        await page.waitForTimeout(1000);
    }

    await roles.updateSettingsBtn.click();
 
    // await page.pause();

    // navingating back to homepage
    await roles.backToHome.click();
    await roles.dashboard.click();
    await roles.workForceLink.click();

    // check employee tab loading
    await roles.employeeLink.click();
    const employeeText = await roles.employeeBody.textContent();
    await expect(employeeText).toBe("Employees");
    await expect(roles.employeeButton).toBeVisible();


    //check timesheet is not loading
    await roles.timeSheetsLink.click();
    const timeSheetbody = await roles.timeSheetBody.textContent();
    await expect(timeSheetbody).toBe("No Access to View Timesheet");

    //check attendance is not loading
    await roles.attendanceLink.click();
    const attendanceBody = await roles.attendanceBody.textContent();
    await expect(attendanceBody).toBe("No Access to View Attendance");

    //check security is not loading
    await roles.securityLink.click();
    await roles.visitorEntryLink.click();
    const visitorEntryBody = await roles.visitorEntryBody.textContent();
    await expect(visitorEntryBody).toBe("No Access to View Visitors");
    
    // await page.pause();

 })