const {test, expect, chromium} = require("@playwright/test")
const { Authentication } = require('../pageObject/Authentication');
const { Vehicle } = require('../pageObject/Vehicle');


test('should first', async() => {

    const browser = await chromium.launch({ headless: false });

    // Create a new context
    const context = await browser.newContext();

    // Grant camera permissions to the context
    await context.grantPermissions(['camera'], { origin: 'https://tpnew.tpsmartsol.com' });

    // Create a new page in the context
    const page = await context.newPage();


    const auth = new Authentication(page);
    await auth.loginPage('harsha@tparamount.com', 'password');

    const vehicleObj = new Vehicle(page);
    await vehicleObj.navigateToVehicle();

    let vehicleNumber = `TS 09 EP ${vehicleObj.generateFourDigitNumber()}`;
    console.log(vehicleNumber);

    await vehicleObj.addGateEntry(vehicleNumber)

    await page.waitForTimeout(2000);
    await vehicleObj.approveGateEntry(vehicleNumber);

    await page.waitForTimeout(5000);
    let OTP = await vehicleObj.generatePassCode(vehicleNumber);

    await page.waitForTimeout(2000);
    await vehicleObj.fillOTPandCheckIn(OTP);
    
    await page.waitForTimeout(4000);
    let checkStatus  = await vehicleObj.getRowCheckInStatus(vehicleNumber);
    expect(checkStatus).toBe("Checked In")




})
