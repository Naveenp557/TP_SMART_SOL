const { test, expect } = require('@playwright/test');
const { Authentication } = require('../pageObject/Authentication');

const { AssetType } = require('../pageObject/AssetType');

test('should first', async({page}) => { 

    const auth = new Authentication(page);
    await auth.loginPage('harsha@tparamount.com', 'password');

    const assetType = new AssetType(page);
    await assetType.navigateToAssetType();
    // await page.pause()

    const assetTypeName = "random";
    const assetTypeNameUpdated = `${assetTypeName}updated`

    await assetType.addAssetType(assetTypeName);


    await page.waitForTimeout(2000);
    await assetType.editAssetType(assetTypeName,assetTypeNameUpdated)

    await page.waitForTimeout(2000);
    await assetType.deleteAssetType(assetTypeNameUpdated);


 })