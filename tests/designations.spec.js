const { test, expect } = require('@playwright/test');

//POM Class
const { Authentication } = require('../pageObject/Authentication');
const { LocationUpdate } = require('../pageObject/LocationUpdate');
const { WorkforceSettings } = require('../pageObject/WorkforceDepartmentSettings');
const { Designations } = require('../pageObject/Designations');



test(`Workforce Settings`, async ({ page }) => {

    const auth = new Authentication(page);
    // const workforceSetting = new WorkforceSettings(page)
    const designations = new Designations(page)

    //Calling login function

    await auth.loginPage('harsha@tparamount.com', 'password');
    await designations.profileIcon.click();
    await designations.settings.click();
    await designations.workforceSettingTab.click()
    await designations.designationModule.click()
    
    const designation = 'des2';
    const updatedDesignation = 'des3';

    //Add Designations
    await designations.addDesignations(designation)

    // //Assertion for added Department
    await page.waitForTimeout(3000)
    const status1 = await designations.checkDesignation(designation)
    expect(status1).toBe(true);
    // await page.pause()

    // //Update Designation
    await designations.editDesignation(designation,updatedDesignation)
    await page.waitForTimeout(3000)
    const status2 = await designations.checkUpdatedDesignation(updatedDesignation)
    expect(status2).toBe(true);

    //Delete Designation
    await page.waitForTimeout(2000)
    const beforeCount = await designations.checkDesignationsDeleted()
    await designations.deleteDesignation(updatedDesignation)
    await page.waitForTimeout(2000)
    const afterCount = await designations.checkDesignationsDeleted()
    await page.waitForTimeout(2000)
    expect(parseInt(beforeCount)).toBeGreaterThan(parseInt(afterCount))


})