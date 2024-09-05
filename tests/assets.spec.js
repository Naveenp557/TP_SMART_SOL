const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

//POM class
const { Authentication } = require('../pageObject/Authentication');
const { LocationUpdate } = require('../pageObject/LocationUpdate');
const { Notifications } = require('../pageObject/Notifications');
const { Assets } = require('../pageObject/Assets');


const dataset = JSON.parse(JSON.stringify(require("../utills/login.json")));
const locationData = JSON.parse(JSON.stringify(require("../utills/locationDetails.json")));
const assetsData = JSON.parse(JSON.stringify(require("../utills/assets.json")));


test(`Verifying the Assets`, async ({ page }) => {

    const auth = new Authentication(page);
    const locationUpdate = new LocationUpdate(page);
    const notifications = new Notifications(page);
    const assets = new Assets(page);

    const assetName = await notifications.generateRandomText(4); // Adjust the length as necessary
    const randomnumber = await notifications.generateRandomTenDigitNumber();

    //Calling login function and then assets creation 
    await auth.loginPage(dataset.username, dataset.password);
    await assets.assetslink.click();
    await assets.assetslistlink.click();
    await assets.asseticon.click();

    //Add Asset
    await assets.assetName.fill('Assetname'+assetName);
    await assets.employeeLabel.fill(assetsData.EmployeeID);
    await page.waitForTimeout(1000);
    await assets.employeeLabel.press('Tab');
    await assets.makeModel.fill('Asset_' + randomnumber);
    await assets.assetType.selectOption(assetsData.AssetType);
    await assets.departmets.selectOption(assetsData.Department);
    await assets.purchaseDate.fill(assetsData.purchaseDate);
    await assets.serviceTenure.fill(assetsData.serviceTenure);
    //await assets.serviceTenureUnit.fill(assetsData.serviceTenureUnit);  
    await assets.lastServiceDate.fill(assetsData.serviceDate);
    await assets.expectedLife.fill(assetsData.expectedLife);
    await notifications.employeeSaveandContinue.click();

    //Add Motor Details
    await assets.motorName.fill('Motorname_' + assetName);
    await assets.motorClass.selectOption(assetsData.motorClass);
    await assets.frameSize.fill(assetsData.number);
    await assets.motorPower.fill(assetsData.number);
    await assets.maxiumRPM.fill(assetsData.number);
    await assets.operatingRPM.fill(assetsData.number);
    await assets.motorPhase.selectOption(assetsData.motorphase);
    await assets.motorMounting.selectOption(assetsData.motorMounting);
    await assets.shaftPosition.selectOption(assetsData.shaftPosition);
    await assets.motorConnected.selectOption(assetsData.motorConnected);
    await page.waitForTimeout(500);
    await notifications.employeeSaveandContinue.click();
    await page.waitForTimeout(500);
    await notifications.employeeSaveandContinue.click();
    await page.waitForTimeout(500);
    await assets.submit.click();
    await page.waitForTimeout(500);

    //Asset Update
    await page.getByRole('row', { name: 'Assetname' + assetName }).getByLabel('').check();
    await page.getByRole('button', { name: 'caret-down' }).click();
    await page.getByText('Edit').click();
    await assets.assetType.selectOption(assetsData.AssetTypeUpdate);
    await assets.serviceTenure.fill(assetsData.serviceTenureUpdate);
    await page.waitForTimeout(500);
    await notifications.employeeSaveandContinue.click();
    await page.waitForTimeout(500);
    await notifications.employeeSaveandContinue.click();
    await page.waitForTimeout(500);
    await notifications.employeeSaveandContinue.click();
    await page.waitForTimeout(500);
    await assets.submit.click();
    await page.waitForTimeout(500);

    //Asset Approve
    await page.getByRole('row', { name: 'Assetname'+assetName }).getByLabel('').check();
    await page.getByRole('button', { name: 'caret-down' }).click();
    await assets.approve.click();

    //Delete Asset
    await page.getByRole('row', { name: 'Assetname'+assetName }).getByLabel('').check();
    await page.getByRole('button', { name: 'caret-down' }).click();
    await page.getByText('Delete').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.waitForTimeout(500);

    // Verify the asset is removed
    const assetIsPresent = await page.getByRole('row', { name: 'Assetname'+assetName }).count();
    // Assert that the asset is  present as admin didnt approve
    expect(assetIsPresent).toBe(1);

});