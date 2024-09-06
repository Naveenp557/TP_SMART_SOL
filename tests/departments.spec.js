const { test, expect } = require('@playwright/test');

//POM Class
const { Authentication } = require('../pageObject/Authentication');
const { LocationUpdate } = require('../pageObject/LocationUpdate');
const { Departments } = require('../pageObject/Departments');



test(`Departments`, async ({ page }) => {

    const auth = new Authentication(page);
    const locationUpdate = new LocationUpdate(page);
    const departments = new Departments(page)

    //Calling login function

    await auth.loginPage('harsha@tparamount.com', 'password');
    await locationUpdate.profileIcon.click();
    await locationUpdate.settings.click();
    await departments.workforceSettingTab.click()
    await departments.departmentsModule.click()

    //Adding Department
    await departments.addDepartment("asbepar3111211")

    //Assertion for added Department
    await page.waitForTimeout(1000)
    const status1=await departments.checkDepartmentInTable("asbepar31111211")
    expect(await status1).toBe(true);

    //Update Department
    await departments.updateDepartment("zsbepar3112111")
    await page.waitForTimeout(1000)
    const status2=await departments.checkUpdatedDepartment("zsbepar3112111")
    expect(await status2).toBe(true);
    

    //Delete Department
    await page.waitForTimeout(1000)
    const beforeCount=await departments.checkDepartmentDeleted()
    
    await departments.deleteDepartmentFromTable()
    await page.waitForTimeout(1000)
    const afterCount=await departments.checkDepartmentDeleted()
    await page.waitForTimeout(1000)
    (expect(parseInt(afterCount)).toBeGreaterThan(parseInt(beforeCount))).toBeTruthy()
    await page.pause()


})