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

    await createUser.userbtn.click();
    await createUser.firstName.fill("first name");
    await createUser.lastName.fill("last name");
    await createUser.email.fill("email@gmail.com");
    await createUser.password.fill("password");

    await createUser.role.selectOption({label : "Super Admin"});
    await createUser.phone.fill("8989123476");
    
    // await createUser.location.selectOption({label : "GUJRAT"});

    await createUser.submit.click();


    await page.pause()
})

test("Update Super admin user", async ({page})=> {
    const auth = new Authentication(page);
    const createUser = new CreateUser(page);

    await auth.loginPage('harsha@tparamount.com', 'password');
    await createUser.profileIcon.click();
    await createUser.settings.click();
    await createUser.userlink.click();

    const table = await page.locator("table");

    const columns = await table.locator("thead tr th")
    console.log("no of columns", await columns.count()); 
    // expect(await columns.count()).toBe(6);

    await page.waitForTimeout(2000);

    const rows = await table.locator("tbody tr")
    console.log("no of rows", await rows.count());
    // expect(await rows.count()).toBe(6);

    // const matchedRow = rows.filter({
    //     has : page.locator("td"),
    //     hasText : "Jigar last name"
    // })

    // await matchedRow.locator("input").check();

    await selectUser(rows,page,"Jigar last name")
    
    await page.locator("//button[@type='button']").click();

    await createUser.edit.click();

    await createUser.lastName.fill("last name");

    await createUser.submit.click();


    await page.pause()
})

async function selectUser(rows, page ,name){
    const matchedRow = rows.filter({
        has : page.locator("td"),
        hasText :name
    })

    await matchedRow.locator("input").check();
    
}

test.only("read table data", async({page})=> {
    const auth = new Authentication(page);
    const createUser = new CreateUser(page);
    console.log("read table data");
    await auth.loginPage('harsha@tparamount.com', 'password');
    await createUser.profileIcon.click();
    await createUser.settings.click();
    await createUser.userlink.click();
    await readTableData(page);

    // await page.pause();


})
async function readTableData(page) {
    const table = await page.locator("table");

    const columns = await table.locator("thead tr th")
    console.log("no of columns", await columns.count()); 
    // expect(await columns.count()).toBe(6);

    await page.waitForTimeout(2000);

    const rows = await table.locator("tbody tr")
    console.log("no of rows", await rows.count());

    for(let i = 0; i < await rows.count();i++){
        const row = rows.nth(i);
        const tds = row.locator("td");
        for(let j =0; j < await tds.count(); j++){
            const cellContent = await tds.nth(j).textContent();
            console.log(cellContent);
        }
    }
}