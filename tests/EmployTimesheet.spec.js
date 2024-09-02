const {test, expect} = require("@playwright/test")

const moment = require("moment");
const { Authentication } = require('../pageObject/Authentication');
const { EmployeTimesheet } = require('../pageObject/EmployeTimesheet');


test('should first', async({page}) => {
    const auth = new Authentication(page);
    await auth.loginPage('harsha@tparamount.com', 'password');

    const etObj = new EmployeTimesheet(page);
    const employeeId = "9b255344-b5ea-45a3-ade8-86698aa2f023";
    const shiftName = "Morning shift";
    const EMPID = "EMP-DEMO-0001"

    const otp = etObj.generateSixDigitRandomNumber().toString();
    await etObj.generateOTP(employeeId,otp);

    await etObj.navigateToTimeSheets();

    await etObj.openTimeSheet(shiftName);
    await etObj.handleCheckIn();
    await etObj.fillOTPAndCheckInOut(otp);

    const checkoutOTP = etObj.generateSixDigitRandomNumber().toString();
    await etObj.generateOTP(employeeId,checkoutOTP);
    await etObj.handleCheckOut();
    await etObj.fillOTPAndCheckInOut(checkoutOTP);

    const empName = await etObj.getRowCheckInStatus(EMPID);
    expect(empName).not.toBe('');


 })