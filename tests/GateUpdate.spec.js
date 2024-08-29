const {test, expect} = require("@playwright/test")
const { Authentication } = require('../pageObject/Authentication');
const { Gate } = require('../pageObject/Gate');

test('should first', async({page}) => { 
    const auth = new Authentication(page);
    await auth.loginPage('harsha@tparamount.com', 'password');

    const gate = new Gate(page);
    await gate.navigateToGateSettings();

    const gateName = "gate13";
    const location = "DEMO LOCATION"
    const updatedGatename = `${gateName}updated`

    await gate.createGate(gateName,location);


    await page.waitForTimeout(1000)
    const gateStatus= await gate.checkGateInTable(gateName)
    expect(gateStatus).toBe(true);

    await page.waitForTimeout(1000)
    await gate.updateGate(gateName,updatedGatename); 
    
    
    await page.waitForTimeout(2000)
    await gate.deleteGate(updatedGatename); 
    

 })