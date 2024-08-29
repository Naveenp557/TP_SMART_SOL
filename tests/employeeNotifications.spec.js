const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

//POM class
const { Authentication } = require('../pageObject/Authentication');
const { LocationUpdate } = require('../pageObject/LocationUpdate');
const { Notifications } = require('../pageObject/Notifications');

test(`Verifying the notifications`, async ({ page }) => {

    const auth = new Authentication(page);
    const locationUpdate = new LocationUpdate(page);
    const notifications = new Notifications(page);

    const randomText = await notifications.generateRandomText(5); // Adjust the length as necessary
    const randomnumber = await notifications.generateRandomTenDigitNumber();
    const profileName = `${randomText} ${randomText}'s profilepic`;

    //Calling login function
    await auth.loginPage('harsha@tparamount.com', 'password');
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
    await notifications.employeeFName.fill(randomText);
    await notifications.employeeLname.fill(randomText);
    console.log('lname' + randomText)
    await notifications.employeeLname.press('Tab');
    await page.locator('select[name="employeeType"]').selectOption({ index: 1 });
    await page.locator('select[name="department"]').selectOption('IT');
    await page.locator('select[name="designation"]').selectOption('QA');
    await page.locator('select[name="experience"]').selectOption('10+ years');
    await page.locator('input[name="joiningDate"]').fill('2024-08-26');
    await page.waitForTimeout(1000);
    await notifications.employeeSaveandContinue.click();
    await notifications.phoneno.fill(randomnumber);
    await notifications.email.fill(randomText + '@gmail.com');
    await notifications.addressline1.fill('Mnagar');
    await notifications.city.fill('hyderabad');
    await notifications.state.fill('TS');
    await notifications.pincode.fill('500020');
    await notifications.emergencyConatctName.fill('Test name');
    await notifications.emergencyEmergencyConatctNo.fill(randomnumber);
    await page.getByLabel('Filter').selectOption('Son');
    await page.waitForTimeout(1000);
    await notifications.employeeSaveandContinue.click();
    await notifications.employeeDoB.fill('2010-08-01');
    await page.locator('select[name="gender"]').selectOption('male');
    await page.locator('select[name="bloodGroup"]').selectOption('A+');
    await page.getByRole('button', { name: 'Submit' }).click();

    // await page.pause();

    // Navigate to the Notifications section and click
    await page.locator('ul').filter({ hasText: 'NotificationsView all' }).locator('i').click();

    // Navigate to the specific employee profile
    await page.getByRole('link', { name: '  | Employee + Pending' , exact: true });
    console.log('notification verified');

    // Interact with the row based on dynamic text
    await page.getByRole('row', { name: profileName }).getByLabel('').click(); 

    // Click on the dropdown or caret button
    await page.getByRole('button', { name: 'caret-down' }).click();

    // Click the 'Approve' button
    await page.getByText('Approve', { exact: true }).click();
    console.log("Employee Approved");

});