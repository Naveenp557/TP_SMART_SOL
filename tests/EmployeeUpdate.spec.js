const { test, expect } = require('@playwright/test');

//POM Class
const { Authentication } = require('../pageObject/Authentication');
const {Employee} = require("../pageObject/Employee");
const e = require('express');



test('should first', async( {page}) => { 
    const auth = new Authentication(page);
    await auth.loginPage('harsha@tparamount.com', 'password');

    const empObj = new Employee(page);
    await empObj.navigateToEmployee();

    const randomText = empObj.generateRandomText(5);
    console.log(randomText)
    const randomnumber = empObj.generateRandomTenDigitNumber();
    await empObj.createEmployee(randomText,randomnumber);

    await empObj.approveEmployee(randomText);

    await page.waitForTimeout(2000);
    let adhar = "9922 3888 3323"
    let pan = 'AZGPV4088A'
    await empObj.editEmployee(randomText,adhar,pan);

    await page.waitForTimeout(4000);
    await empObj.approveEmployee(randomText);


    await page.waitForTimeout(4000);
    await empObj.navigateToEmployeePage(randomText);

    const displayTextAdhar = await page.locator("//strong[normalize-space()='Aadhaar:'][.='Aadhaar:']/ancestor::tr[1]").textContent();
    console.log(displayTextAdhar);
    const status = displayTextAdhar.includes(adhar);
    expect(status).toBeTruthy();

    const displayTextPan = await page.locator("//strong[.='PAN:'][.='PAN:']/ancestor::tr[1]").textContent();
    const statusPan = displayTextPan.includes(pan);
    expect(statusPan).toBeTruthy();



 })