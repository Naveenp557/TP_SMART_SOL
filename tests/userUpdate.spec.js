const { test, expect } = require('@playwright/test');

//POM Class
const { Authentication } = require('../pageObject/Authentication');
const {CreateUser} = require("../pageObject/CreateUser")


test("Create Super Admin User", async ({page})=> {
    const auth = new Authentication(page);
    const createUser = new CreateUser(page);

    await auth.loginPage('harsha@tparamount.com', 'password');
    await createUser.profileIcon.click();
    await createUser.settings.click();
    await createUser.userlink.click();

    await page.waitForTimeout(2000);
    const beforeRowCount = await createUser.tableLocator.count();
    console.log(beforeRowCount);


    const firstname = 'firstName';
    const lastName = 'lastName';
    const email = "tarunvoora@gmail.com";
    const password = "password";
    const phone = '8989123479';
    const lastName2 = "lastName2";
    const location = 'SECURITY'


    // creat user
    // await createUser.createNewSuperAdmin(firstname,lastName,email,password,phone);
    await createUser.createNewUser(firstname,lastName,email,password,phone,location);
    

    await page.waitForTimeout(2000);
    const afterRowCount = await createUser.tableLocator.count();
    expect(afterRowCount).toBe(beforeRowCount+1);

    // update the existing user
    await page.waitForTimeout(2000);
    await createUser.updateUser(firstname, lastName,lastName2);

    // delete existing user
    await page.waitForTimeout(2000);
    await createUser.deleteUser(firstname, lastName2);

    // try to find deleted row
    const rowLocator = page.locator('tr', { hasText: email });
    await expect(rowLocator).not.toBeVisible();

    const rowsContainingText = await page.locator('tr', { hasText: email}).count();
    console.log(rowsContainingText);
    expect(rowsContainingText).toBe(0);


})

