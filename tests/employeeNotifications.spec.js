const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

//POM class
const { Authentication } = require('../pageObject/Authentication');
const { LocationUpdate } = require('../pageObject/LocationUpdate');
const { Notifications } = require('../pageObject/Notifications');

const dataset = JSON.parse(JSON.stringify(require("../utills/login.json")));
const locationData = JSON.parse(JSON.stringify(require("../utills/locationDetails.json")));
const employeeCreationdata = JSON.parse(JSON.stringify(require("../utills/employeeCreationDetails.json")));


test(`Verifying the notifications`, async ({ page }) => {

    const auth = new Authentication(page);
    const locationUpdate = new LocationUpdate(page);
    const notifications = new Notifications(page);

    const empName = await notifications.generateRandomText(5); // Adjust the length as necessary
    const randomnumber = await notifications.generateRandomTenDigitNumber();
    const profileName = `${empName} ${empName}'s profilepic`;

    //Calling login function
    await auth.loginPage(dataset.username, dataset.password);
    await locationUpdate.profileIcon.click();
    await locationUpdate.settings.click();
    await notifications.notificationsoption.click();
    await page.waitForTimeout(1000);

    //Employee Create
    const EmployeeCreateBlankLocator = await notifications.employeeCreate;
    const create_dropdown = await EmployeeCreateBlankLocator.textContent();
    console.log('Value from  create locator:', create_dropdown);   // Print the value of the locator
    await notifications.checkAndSelectValue(page, create_dropdown, 'EmployeeCreate');  // Call the reusable function

    //Employee Edit
    const EmployeeEditBlankLocator = await notifications.employeeEdit;
    const edit_dropdown = await EmployeeEditBlankLocator.textContent();
    console.log('Value from  edit locator:', edit_dropdown);   // Print the value of the locator
    await notifications.checkAndSelectValue(page, edit_dropdown, 'EmployeeEdit');     // Call the reusable function


    //Employee Delete
    const EmployeeDeleteBlankLocator = await notifications.employeeDelete;
    const Delete_dropdown = await EmployeeDeleteBlankLocator.textContent();
    console.log('Value from  delete locator:', Delete_dropdown);   // Print the value of the locator
    await notifications.checkAndSelectValue(page, Delete_dropdown, 'EmployeeDelete');     // Call the reusable function

    //Employee Approval
    const EmployeeApprovalBlankLocator = await notifications.employeeApproval;
    const Approval_dropdown = await EmployeeApprovalBlankLocator.textContent();
    console.log('Value from  Approval locator:', Approval_dropdown);   // Print the value of the locator
    await notifications.checkAndSelectValue(page, Approval_dropdown, 'EmployeeApproval');     // Call the reusable function

    await notifications.backHome.click(); // clikcing on backhome link
    await notifications.employeeLink.click(); //navigating to employees section
    await notifications.employeeButton.click();

    //Add employee Details
    await notifications.employeeFName.fill(empName);
    await notifications.employeeLname.fill(empName);
    console.log('lname' + empName)
    await notifications.employeeLname.press('Tab');
    await page.locator('select[name="employeeType"]').selectOption({ index: 1 });
    await page.locator('select[name="department"]').selectOption(employeeCreationdata.department);
    await page.locator('select[name="designation"]').selectOption(employeeCreationdata.designation);
    await notifications.employeeExpYears.fill(employeeCreationdata.employeeExpYears);
    await notifications.employeeExpMonths.fill(employeeCreationdata.employeeExpMonths);
    await page.locator('input[name="joiningDate"]').fill(employeeCreationdata.joiningDate);
    await page.waitForTimeout(1000);
    await notifications.employeeSaveandContinue.click();
    await notifications.phoneno.fill(randomnumber);
    await notifications.email.fill(empName + '@gmail.com');
    await notifications.addressline1.fill(locationData.locationName);
    await notifications.city.fill(locationData.city);
    await notifications.state.fill(employeeCreationdata.state);
    await notifications.pincode.fill(locationData.pincode);
    await notifications.emergencyConatctName.fill('Test name');
    await notifications.emergencyEmergencyConatctNo.fill(randomnumber);
    await page.getByLabel('Filter').selectOption(employeeCreationdata.filter);
    await page.waitForTimeout(1000);
    await notifications.employeeSaveandContinue.click();
    await notifications.employeeDoB.fill('2010-08-01');
    await page.locator('select[name="gender"]').selectOption(employeeCreationdata.gender);
    await page.locator('select[name="bloodGroup"]').selectOption(employeeCreationdata.bloodGroup);
    await page.getByRole('button', { name: 'Submit' }).click();

    // Navigate to the Notifications section and click
    await page.locator('ul').filter({ hasText: 'NotificationsView all' }).locator('i').click();

    // Navigate to the specific employee profile
    await page.getByRole('link', { name: '  | Employee + Pending' , exact: true });
    console.log('notification verified');

    // Interact with the row based on dynamic text
    await page.getByRole('row', { name: empName }).getByLabel('').click(); 

    // Click on the dropdown or caret button
    await page.getByRole('button', { name: 'caret-down' }).click();

    // Click the 'Approve' button
    await page.getByText('Approve', { exact: true }).click();
    console.log("Employee Approved");

});