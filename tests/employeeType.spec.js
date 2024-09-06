const { test, expect } = require('@playwright/test');

//POM Class
const { Authentication } = require('../pageObject/Authentication');
const { LocationUpdate } = require('../pageObject/LocationUpdate');
const { Departments } = require('../pageObject/Departments');
const { EmployeeType } = require('../pageObject/EmployeeType')
const { Designations }= require('../pageObject/Designations')



test(`Employee Type`, async ({ page }) => {
    const empTyp1="Full Time13"
    const empTyp2="Full Time33"

    const auth = new Authentication(page);
    const locationUpdate = new LocationUpdate(page);
    const departments = new Departments(page)
    const employeeType = new EmployeeType(page)
    const designations =new Designations(page)

    //Calling login function

    await auth.loginPage('harsha@tparamount.com', 'password');
    await locationUpdate.profileIcon.click();
    await locationUpdate.settings.click();
    await departments.workforceSettingTab.click()
    await employeeType.employeeTypeModule.click()


    //add employeetype
    await employeeType.addEmployeeType(empTyp1)
    const rowLocator = page.locator('tr', { hasText: empTyp2 });
    await expect(rowLocator).toBeVisible();
    

    //update employee
    await page.waitForTimeout(2000);
    await employeeType.updateEmployeeType(empTyp1)
    await designations.actionButton.click();
    await designations.editBtn.click();
    await page.getByLabel('Employee Type *').fill(empTyp2);
    await employeeType.submit.click()

    //Update employeeType Assertion
    const rowLocator2 = page.locator('tr', { hasText: empTyp2 });
    await expect(rowLocator2).toBeVisible();


    //Delete EmployeeType
    await page.waitForTimeout(2000);
    await employeeType.deleteEmployee(empTyp2)
    await designations.actionButton.click();
    await employeeType.deletebtn.click();
    await designations.conformDelete.click()
    
    //Delete EmployeeType Assertion
    const rowLocator3 = page.locator('tr', { hasText: empTyp2 });
    await expect(rowLocator3).not.toBeVisible();

})