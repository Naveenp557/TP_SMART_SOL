const { test, expect } = require('@playwright/test');

//POM Class
const { Authentication } = require('../pageObject/Authentication');
const { LocationUpdate } = require('../pageObject/LocationUpdate');
const { WorkforceSettings } = require('../pageObject/WorkforceSettings');



test(`Workforce Settings`, async ({ page }) => {

    const auth = new Authentication(page);
    const locationUpdate = new LocationUpdate(page);
    const workforceSettings = new WorkforceSettings(page)

    //Calling login function

    await auth.loginPage('harsha@tparamount.com', 'password');
    await locationUpdate.profileIcon.click();
    await locationUpdate.settings.click();
    await workforceSettings.workforceSettingTab.click()
    await workforceSettings.departmentsModule.click()

    //Adding Department
    await workforceSettings.addDepartment("asbepar31")

    //Assertion for added Department
    await page.waitForTimeout(1000)
    const status1=await workforceSettings.checkDepartmentInTable("asbepar31")
    expect(await status1).toBe(true);

    //Update Department
    await workforceSettings.updateDepartment("zsbepar3")
    await page.waitForTimeout(1000)
    const status2=await workforceSettings.checkUpdatedDepartment("zsbepar3")
    expect(await status2).toBe(true);
    

    //Delete Department
    await page.waitForTimeout(1000)
    const beforeCount=await workforceSettings.checkDepartmentDeleted()
    await workforceSettings.deleteDepartmentFromTable()
    await page.waitForTimeout(1000)
    const afterCount=await workforceSettings.checkDepartmentDeleted()
    await page.waitForTimeout(1000)
    (expect(beforeCount).toBeGreaterThan(afterCount)).toBeTruthy()
    await page.pause()


})