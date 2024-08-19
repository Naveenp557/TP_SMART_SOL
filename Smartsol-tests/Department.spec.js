const {test, expect} = require("@playwright/test")

const { Authentication } = require('../pageObject/Authentication');

const { Department } = require('../pageObject/Department');

test('should first', async ({page}) => {

    const auth = new Authentication(page);
    await auth.loginPage('harsha@tparamount.com', 'password');

    const department = new Department(page);
    await department.profileIcon.click();
    await department.settings.click();
    // await department.userlink.click();


    await department.workForceSettings.click();
    await department.departmentSettings.click();

    // await page.pause();

    const columns= await department.table.locator('thead tr th')
    console.log(await columns.count());


    const rows=await department.table.locator('tbody tr')
    // const machedRow= rows.filter({
    //     has: page.locator('td'),
    //     hasText: "Department1"
    // })

    // console.log(machedRow);
    // await machedRow.locator('input').check()
    // console.log(await machedRow.textContent());

    // await page.pause();


    await page.waitForSelector("//table//tbody//tr//td[2]//span");
    const tablerows = await page.$$("//table/tbody/tr/td/span");
    
    await page.waitForTimeout(3000);

    for(let row of tablerows){

        // await row.locator("input").click();
        console.log(await row.textContent());
    }   

    await page.pause();

    // for(let i=0;i<await rows.count();i++){
    //         const row=rows.nth(i);
    //         const tds=row.locator('td')

    //         console.log(await tds.nth(1).textContent())

    // }







} )