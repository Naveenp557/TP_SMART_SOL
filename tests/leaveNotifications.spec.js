const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

//POM class
const { Authentication } = require('../pageObject/Authentication');
const { LocationUpdate } = require('../pageObject/LocationUpdate');
const { Notifications } = require('../pageObject/Notifications');

const dataset = JSON.parse(JSON.stringify(require("../utills/login.json")));

test(`Verifying the notifications`, async ({ page }) => {

    const auth = new Authentication(page);
    const locationUpdate = new LocationUpdate(page);
    const notifications = new Notifications(page);

    // Specify how many days in the future you want the date to be
    const daysInFuture = 1;

    // Get the dynamically calculated future date
    const futureDate = await notifications.getFutureDate(daysInFuture);

    //Calling login function
    await auth.loginPage(dataset.username, dataset.password);
    await locationUpdate.profileIcon.click();
    await locationUpdate.settings.click();
    await notifications.notificationsoption.click();
    await page.waitForTimeout(1000);


    //Leave Create 
    const LeaveCreateBlankLocator = await notifications.leaveCreate;
    const Lcreate_dropdown = await LeaveCreateBlankLocator.textContent();
    console.log('Value from  leave create locator:', Lcreate_dropdown);   // Print the value of the locator
    await notifications.checkAndSelectValue(page, Lcreate_dropdown, 'LeaveCreate');     // Call the reusable function

    //Leave Edit 
    const LeaveEditBlankLocator = await notifications.leaveEdit;
    const LEdit_dropdown = await LeaveEditBlankLocator.textContent();
    console.log('Value from  leave edit locator:', LEdit_dropdown);   // Print the value of the locator
    await notifications.checkAndSelectValue(page, LEdit_dropdown, 'LeaveEdit');     // Call the reusable function

    //Leave Delete
    const LeaveDeleteBlankLocator = await notifications.leaveDelete;
    const LDelete_dropdown = await LeaveDeleteBlankLocator.textContent();
    console.log('Value from  leave delete locator:', LDelete_dropdown);   // Print the value of the locator
    await notifications.checkAndSelectValue(page, LDelete_dropdown, 'LeaveDelete');     // Call the reusable function

    //Leave Approval
    const LeaveApprovalBlankLocator = await notifications.leaveApproval;
    const LApprove_dropdown = await LeaveApprovalBlankLocator.textContent();
    console.log('Value from  leave Approval locator:', LApprove_dropdown);   // Print the value of the locator
    await notifications.checkAndSelectValue(page, LApprove_dropdown, 'LeaveApproval');     // Call the reusable function


    await notifications.backHome.click(); // clikcing on backhome link
    await notifications.leaveslink.click(); //navigating to leaves section
    await notifications.leavebutton.click();
    await notifications.employeeID.fill('EMP-DEMO-0009');
    await page.waitForTimeout(1000);
    await notifications.employeeID.press('Tab');
    await page.getByLabel('Filter').selectOption('casual');
    await page.waitForTimeout(500);

    // Use the dynamically calculated date for leave start and end dates
    await page.locator('input[name="leave_start_date"]').fill(futureDate);
    await page.locator('input[name="leave_end_date"]').fill(futureDate);
    await notifications.leavereason.fill('testingthe leave notofications');
    await notifications.leavesubmit.click();
    await notifications.notificationsicon.click();

    //Approving the leave
    await notifications.leaveapproval.click();
    await page.getByRole('button', { name: 'caret-down' }).click();
    await page.getByText('Approve', { exact: true }).click();
    console.log("Leave Approved");




});