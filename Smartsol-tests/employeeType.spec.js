const { test, expect } = require('@playwright/test');

//POM Class
const { Authentication } = require('../pageObject/Authentication');
const { LocationUpdate } = require('../pageObject/LocationUpdate');
const { WorkforceSettings } = require('../pageObject/WorkforceSettings');
const { EmployeeType } = require('../pageObject/EmployeeType')
const { Designations }= require('../pageObject/Designations')



test(`Employee Type`, async ({ page }) => {

    const auth = new Authentication(page);
    const locationUpdate = new LocationUpdate(page);
    const workforceSettings = new WorkforceSettings(page)
    const employeeType = new EmployeeType(page)
    const designations =new Designations(page)

    //Calling login function

    await auth.loginPage('harsha@tparamount.com', 'password');
    await locationUpdate.profileIcon.click();
    await locationUpdate.settings.click();
    await workforceSettings.workforceSettingTab.click()
    await employeeType.employeeTypeModule.click()
    //await page.pause()

    //add employeetype
    await employeeType.addEmployeeTypeBtn.click()
    await employeeType.enterEmployeeType.fill("Full time1")
    await employeeType.submit.click()

    //Delete EmployeeType
    
    await employeeType.selectemployeeType.click();
    await designations.actionButton.click();
    await employeeType.deletebtn.click();
    await employeeType.conformDelete.click()
    
    //Delete EmployeeType Assertion
   

    

})