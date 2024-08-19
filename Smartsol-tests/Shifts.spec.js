const { test, expect } = require('@playwright/test');
const { Authentication } = require('../pageObject/Authentication');
const { Shifts } = require('../pageObject/Shifts');
const req = require('express/lib/request');


test('create shift',async ({page}) => { 
    
    const auth = new Authentication(page);
    await auth.loginPage('harsha@tparamount.com', 'password');

    const shiftName = "shift209";
    const shifts = new Shifts(page);
  
    await shifts.navigateToShifts();
    await shifts.createShiftAndSubmit(shiftName);

    await page.waitForTimeout(3000);
    const isShiftExists = await shifts.checkShiftAdded(shiftName)
    expect(isShiftExists).toBeTruthy();

    await shifts.editShiftThreshold(shiftName)
    
    await page.waitForTimeout(3000);
    let thresholdTime = await shifts.getShiftThreshould(shiftName);
    expect(thresholdTime).toBe("20");

   // await page.pause();

 })

 async function selectUser(rows, page ,name){
    const matchedRow = rows.filter({
        has : page.locator("td"),
        hasText :name
    })

    await matchedRow.locator("input").check();
    
}
