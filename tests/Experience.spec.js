const { test, expect } = require('@playwright/test');
const { Authentication } = require('../pageObject/Authentication');

const { Experience } = require('../pageObject/Experience');

test('should first', async ({page}) => { 

    const auth = new Authentication(page);
    await auth.loginPage('harsha@tparamount.com', 'password');

    const expObj = new Experience(page);
    await expObj.navigateToExperience();

    // create experience
    const expName = "exp1"
    const expUpdated = `${expName}updated`
    await expObj.createExperience(expName);

    // experience duplicay check
    await expObj.createExperience(expName);
    await expect(expObj.expAlreadyExists).toBeVisible();

    await page.waitForTimeout(1000);
    let iseExpExists = await expObj.checkExpAdded(expName);
    console.log(iseExpExists);
    expect(iseExpExists).toBeTruthy();


    await page.waitForTimeout(2000);
    await expObj.editExperience(expName,expUpdated)

    
    await page.waitForTimeout(1000);
    await expObj.deleteExperience(expUpdated);
    await page.pause();

 })
