const { test, expect } = require('@playwright/test');

//POM Class
const { Authentication } = require('../pageObject/Authentication');
const { LocationUpdate } = require('../pageObject/LocationUpdate');
const { WorkforceDepartmentSettings } = require('../pageObject/WorkforceDepartmentSettings');



test(`Workforce Settings`, async ({ page }) => {

    const auth = new Authentication(page);
    const locationUpdate = new LocationUpdate(page);
    const workforceSettings = new WorkforceDepartmentSettings(page)

    const departmentnName = 'asbepar36';
    const updateDepartmentName = "zsbepar8";

    //Calling login function

    await auth.loginPage('harsha@tparamount.com', 'password');
    await locationUpdate.profileIcon.click();
    await locationUpdate.settings.click();
    await workforceSettings.workforceSettingTab.click()
    await workforceSettings.departmentsModule.click()

    //Adding Department
    await workforceSettings.addDepartment(departmentnName)

    //Assertion for added Department
    await page.waitForTimeout(1000)
    const status1=await workforceSettings.checkDepartmentInTable(departmentnName)
    expect(await status1).toBe(true);

    //Update Department
    await workforceSettings.updateDepartment(updateDepartmentName)
    await page.waitForTimeout(1000)
    const status2=await workforceSettings.checkUpdatedDepartment(updateDepartmentName)
    expect(await status2).toBe(true);
    

    //Delete Department
    await page.waitForTimeout(2000)
    const beforeCount=await workforceSettings.checkDepartmentDeleted()
    await workforceSettings.deleteDepartmentFromTable()
    await page.waitForTimeout(1000)
    const afterCount=await workforceSettings.checkDepartmentDeleted()
    await page.waitForTimeout(1000)
    console.log("before", beforeCount,"after", afterCount);
    expect(parseInt(beforeCount)).toBeGreaterThan(parseInt(afterCount))
    await page.pause()


})