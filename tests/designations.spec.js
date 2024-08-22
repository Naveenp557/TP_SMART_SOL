const { test, expect } = require('@playwright/test');

//POM Class
const { Authentication } = require('../pageObject/Authentication');
const { LocationUpdate } = require('../pageObject/LocationUpdate');
const { WorkforceSettings } = require('../pageObject/WorkforceSettings');
const { Designations } = require('../pageObject/Designations');



test(`Workforce Settings`, async ({ page }) => {

    const auth = new Authentication(page);
    const locationUpdate = new LocationUpdate(page);
    const workforceSettings = new WorkforceSettings(page)
    const designations = new Designations(page)

    //Calling login function

    await auth.loginPage('harsha@tparamount.com', 'password');
    await locationUpdate.profileIcon.click();
    await locationUpdate.settings.click();
    await workforceSettings.workforceSettingTab.click()
    await designations.designationModule.click()
    

    //Add Designations
    // await designations.addDesignations("asbepar312111")

    // //Assertion for added Department
    // await page.waitForTimeout(1000)
    // const status1=await designations.checkDesignation("asbepar312112")
    // expect(await status1).toBe(true);
    // await page.pause()

    // //Update Designation
    // await designations.updateDesignation("zsbepar3123")
    // await page.waitForTimeout(1000)
    // const status2=await designations.checkUpdatedDesignation("zsbepar3123")
    // expect(await status2).toBe(true);

    //Delete Designation
    await page.waitForTimeout(2000)
    const beforeCount=await designations.checkDesignationsDeleted()
    await designations.deleteDesignationFromTable()
    await page.waitForTimeout(2000)
    const afterCount=await designations.checkDesignationsDeleted()
    await page.waitForTimeout(2000)
    expect(beforeCount).toBeGreaterThan(afterCount)
    await page.pause()




})