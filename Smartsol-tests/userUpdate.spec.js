const { test, expect } = require('@playwright/test');

//POM Class
const { Authentication } = require('../pageObject/Authentication');
const {CreateUser} = require("../pageObject/CreateUser")


test.only("Create Super Admin User", async ({page})=> {
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
    const email = "email@gmail.com";
    const password = "password";
    const phone = '8989123476'


    // creat user
    await createUser.userbtn.click();
    await createUser.firstName.fill(firstname);
    await createUser.lastName.fill(lastName);
    await createUser.email.fill(email);
    await createUser.password.fill(password);

    await createUser.role.selectOption({label : "Super Admin"});
    await createUser.phone.fill(phone);
    
    // await createUser.location.selectOption({label : "GUJRAT"});

    await createUser.submit.click();


    await page.waitForTimeout(2000);
    const afterRowCount = await createUser.tableLocator.count();
    expect(afterRowCount).toBe(beforeRowCount+1);
    console.log(afterRowCount, beforeRowCount)
    // await page.pause()

    // update the existing user
    await page.waitForTimeout(2000);
    const updaterows = await createUser.tableLocator;
    await selectUser(updaterows,page,`${firstname} ${lastName}`)

    const lastName2 = "lastName2"
    await createUser.editdropdown.click();
    await createUser.edit.click();
    await createUser.lastName.fill(lastName2);
    await createUser.submit.click();
    // await page.pause()

    // delete existing user
    // await page.pause()
    await page.waitForTimeout(2000);
    const deleterows = await createUser.tableLocator;
    await selectUser(deleterows,page,`${firstname} ${lastName2}`)
    await createUser.editdropdown.click();
    await createUser.deletebtn.click();
    await createUser.deletePopupBtn.click();
    // await page.pause()

    await page.waitForTimeout(1000);
    const afterDeleteRowCount = await createUser.tableLocator.count();
    expect(beforeRowCount).toBe(afterDeleteRowCount);

})

async function selectUser(rows, page ,name){
    const matchedRow = rows.filter({
        has : page.locator("td"),
        hasText :name
    })

    await matchedRow.locator("input").check();
    
}
