const { test, expect } = require('@playwright/test');
const { Authentication } = require('../pageObject/Authentication');
const { Shifts } = require('../pageObject/Shifts');
const req = require('express/lib/request');


test('create shift',async ({page}) => { 
    
    const auth = new Authentication(page);
    await auth.loginPage('harsha@tparamount.com', 'password');

    const shiftName = "shift2011";
    // navigate to shifts section
    const shifts = new Shifts(page);
    await shifts.profileIcon.click();
    await shifts.settings.click();
    await shifts.workForceSettings.click();
    await shifts.shiftsSettings.click();
    
    // filling create shift form  and submit
    await shifts.addShiftbtn.click();
    await shifts.locationSelector.first().click();
    await page.getByRole('option', { name: 'Gujrat' }).click();
    await shifts.shfitNameInput.fill(shiftName);
    await page.locator('input[name="startTime"]').click();
    await page.getByRole('option', { name: '9:45 PM' }).click();
    await page.locator('input[name="endTime"]').click();
    await page.getByRole('option', { name: '12:45 PM' }).click();
    await shifts.thresholdTime.fill("10");
    await shifts.submitBtn.click();

    await page.waitForTimeout(3000);

    // check shift added to the list
    let shiftList = await page.$$(shifts.shiftNameSelect);
    let isShiftExist = false;
    for(let shift of shiftList){
        if(shiftName ===await shift.textContent()){
            isShiftExist = true;
            break;
        }
    }
    expect(isShiftExist).toBeTruthy();


    // select created shift to edit and change threshold and submit
    await page.waitForTimeout(3000);
    const rows = await page.locator('tbody tr')
    for(let i=0;i<await rows.count();i++) {
            const row=rows.nth(i);
            const tds=row.locator('td')
            const  requiredText =  await tds.nth(1).textContent();
            if(requiredText === shiftName){
                await tds.nth(0).click();
                break;
            }      
    }
    await shifts.editDropdown.click();
    await shifts.edit.click();
    await shifts.thresholdTime.fill("20");
    await shifts.submitBtn.click();

    

    // verify threshold  is modified 
    await page.waitForTimeout(3000);
    let thresholdTime = 0;
    for(let i=0;i<await rows.count();i++)   {
        const row=rows.nth(i);
        const tds=row.locator('td')
        const  requiredText =  await tds.nth(1).textContent(); 
        if(requiredText === shiftName){
            thresholdTime = await tds.nth(5).textContent()
            break;
        }      
    }
    expect(thresholdTime).toBe("20");

    await page.pause();

 })

 async function selectUser(rows, page ,name){
    const matchedRow = rows.filter({
        has : page.locator("td"),
        hasText :name
    })

    await matchedRow.locator("input").check();
    
}
