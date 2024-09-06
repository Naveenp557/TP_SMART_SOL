const { test, expect } = require('@playwright/test');

// POM Classes
const { Authentication } = require('../pageObject/Authentication');
const { SecurityVisitors } = require('../pageObject/SecurityVisitors');

test(`location update from master settings`, async ({ browser }) => {
    test.setTimeout(60000);  // Increase timeout to 60 seconds
    const context = await browser.newContext({
        permissions: ['camera'],  // Grant camera permissions
        args: [
            '--use-fake-ui-for-media-stream',  // Automatically grant camera/mic permissions
            '--use-fake-device-for-media-stream'  // Use a fake device for camera (optional)
           
        ]
    });

    const page = await context.newPage();

    // Initialize Page Object Models
    const auth = new Authentication(page);
    const securityVisitors = new SecurityVisitors(page);


    // Calling login function
    await auth.loginPage('harsha@tparamount.com', 'password');
    const visitor = 'surya79';
    const visitor2 = 'Redddy67';

     
    await securityVisitors.securityTab.click();
    await securityVisitors.visitorsTab.click();
    
    // Adding visitor
    await securityVisitors.addEntrybtn.click();
    await securityVisitors.addGateEntry.click();
    await securityVisitors.visitorName.fill(visitor);
    await securityVisitors.phoneNumber.fill('+91 91654-646844');
    await securityVisitors.departmentfield.click();
    await securityVisitors.selectDepartment.click();
    await securityVisitors.visitingPerson.click();
    await securityVisitors.selectPerson.click();
    await securityVisitors.purposeofVisit.click();
    await securityVisitors.selectPurpose.click();
    await securityVisitors.accompanyVisitors.fill('03');
    await securityVisitors.companyName.fill('Tech Paramount LLP');
    await securityVisitors.twoFactorAuth.click();
    await securityVisitors.selectValidator.selectOption('Sajeev K');
    await securityVisitors.submit.click();

    await page.waitForTimeout(1000);

    // Assertion for add visitor
    const addedvisitorsList = page.locator('tr', { hasText: visitor });
    await expect(addedvisitorsList).toBeVisible();

    // Approve added visitor
    const approveAddedVisitor = await securityVisitors.tableLocator;
    await securityVisitors.selectVisitor(approveAddedVisitor, page, `${visitor}`);
    await securityVisitors.actionButton.click();
    await securityVisitors.approvebtn.click();

    // Updating visitors
    await page.waitForTimeout(2000);
    const updaterows = await securityVisitors.tableLocator;
    await page.waitForTimeout(2000);
    await securityVisitors.selectVisitor(updaterows, page, `${visitor}`);
    await securityVisitors.actionButton.click();
    await securityVisitors.editBtn.click();
    await page.waitForTimeout(2000);
    await securityVisitors.updateName.fill(visitor2);
    await securityVisitors.selectValidator.selectOption('Harsha Reddy');
    await securityVisitors.submit.click();

    // Approve updated visitor
    await page.waitForTimeout(2000);
    const approveUpdatedVisitor = await securityVisitors.tableLocator;
    await securityVisitors.selectVisitor(approveUpdatedVisitor, page, `${visitor}`);
    await securityVisitors.actionButton.click();
    await page.waitForTimeout(1000);
    await securityVisitors.approvebtn.click();

    // Assertion for updated visitor
    const updatedvisitorsList = page.locator('tr', { hasText: visitor });
    await expect(updatedvisitorsList).toBeVisible();

    // Visitor check-in process
    const visitorCheckin = await securityVisitors.tableLocator;
    await securityVisitors.selectVisitor(visitorCheckin, page, `${visitor2}`);
    await securityVisitors.actionButton.click();
    await securityVisitors.generatebtn.click();
    await securityVisitors.gatePass.click();
    await page.waitForTimeout(1000);

    // Get OneTimeCode
    let code = await securityVisitors.otc.textContent();
    let l = code.length;

    await securityVisitors.closeGatepassBtn.click();
    await securityVisitors.scanCodeBtn.click();

    // Inserting oneTimeCode value by value
    for (let i = 0; i < l; i++) {
        let val = code[i];
        let position = await page.locator(`(//input[@placeholder='0'])[${i+1}]`);
        
        position.click();
        await page.waitForTimeout(500);
        position.fill(val);
       
    }

    //await page.waitForTimeout(1000);
    let gate = await securityVisitors.selectGate.textContent();
    console.log(gate);
    await page.waitForTimeout(500);
    await securityVisitors.changeGate.selectOption(gate);
    await page.waitForTimeout(500);
    await securityVisitors.capturebtn.click();
    await page.waitForTimeout(3000);
    await securityVisitors.captureImage.click();
    
    await securityVisitors.submitImage.click();
   

    //validator check
    await page.waitForTimeout(3000);
    await securityVisitors.scanCodeBtn.click();

    // validator 
    for (let i = 0; i < l; i++) {
        let val = code[i];
        let position = await page.locator(`(//input[@placeholder='0'])[${i+1}]`);
       
        position.click();
        await page.waitForTimeout(500);
        position.fill(val);
        
    }

    //checkout
    await page.waitForTimeout(10000);
    await securityVisitors.scanCodeBtn.click();
    await page.locator('.ant-modal > div:nth-child(2)').press('Escape');
    await securityVisitors.scanCodeBtn.click();

     
    for (let i = 0; i < l; i++) {
        let val = code[i];
        let position = await page.locator(`(//input[@placeholder='0'])[${i+1}]`);
        
        position.click();
        await page.waitForTimeout(500);
        position.fill(val);
        
    }

    
    await page.pause()
    //Assertion for checkout
    const checkedOutvisitorsList = await page.locator('tr', { hasText: visitor2 }).count();
    //await expect(checkedOutvisitorsList).toBeVisible();
    console.log("count is",checkedOutvisitorsList)
    


    //await context.close();
});
