const { test, expect } = require('@playwright/test');
const { Authentication } = require('../pageObject/Authentication');
const { Shifts } = require('../pageObject/Shifts');


test('create shift',async ({page}) => { 
    
    const auth = new Authentication(page);
    await auth.loginPage('harsha@tparamount.com', 'password');

    const shiftName = "shift218";
    const location = "DEMO LOCATION";
    const shifts = new Shifts(page);

  
    await shifts.navigateToShifts();
    await shifts.createShiftAndSubmit(shiftName,location);

    await page.waitForTimeout(1000);
    const isShiftExists = await shifts.checkShiftAdded(shiftName)
    expect(isShiftExists).toBeTruthy();


    await page.waitForTimeout(1000);
    await shifts.editShiftThreshold(shiftName,location)
    

    // await page.pause();
    await page.waitForTimeout(1000);
    let thresholdTime = await shifts.getShiftThreshould(shiftName,location);
    expect(thresholdTime).toBe("20");


    await page.waitForTimeout(1000);
    await shifts.deleteShift(shiftName,location);

    

   // await page.pause();

 })

 async function selectUser(rows, page ,name){
    const matchedRow = rows.filter({
        has : page.locator("td"),
        hasText :name
    })

    await matchedRow.locator("input").check();
    
}
