class Assets {

    constructor(page) {

        this.assetslink = page.locator("//span[normalize-space()='Assets']");
        this.assetslistlink = page.locator("//span[normalize-space()='Asset List']");
        this.asseticon = page.locator("//button[normalize-space()='Asset']");
        this.assetName = page.locator("//input[@aria-label='Asset Name']");
        this.employeeLabel = page.locator("//input[@placeholder='Choose an Operator ID']");
        this.makeModel = page.locator("//input[@name='makeModel']");
        this.assetType = page.locator("//*[@name = 'assetTypeId']");
        this.departmets = page.locator("//*[@name = 'department']");
        this.purchaseDate = page.locator("//*[@name = 'purchaseDate']");
        this.serviceTenure = page.locator("//*[@name = 'serviceTenure']");
       this.serviceTenureUnit = page.locator("//*[@name = 'serviceTenureUnit']");
        this.lastServiceDate = page.locator("//*[@name = 'lastServicedDate']");
        this.expectedLife = page.locator("//*[@name = 'expectedLife']");
        this.motorName = page.locator("//input[@name = 'motorName']");
        this.motorClass = page.locator("//select[@name = 'motorClass']");
        this.frameSize = page.locator("//input[@name = 'frameSize']");
        this.motorPower = page.locator("//input[@name = 'motorPower']");
        this.maxiumRPM = page.locator("//input[@name = 'maximumRPM']");
        this.operatingRPM = page.locator("//input[@name = 'operatingRPM']");
        this.motorPhase = page.locator("//select[@name = 'motorPhase']");
        this.motorMounting = page.locator("//select[@name = 'motorMountingPosition']");
        this.shaftPosition = page.locator("//select[@name = 'shaftPosition']");
        this.motorConnected = page.locator("//select[@name = 'motorConnectedTo']");
        this.submit = page.locator("//button[normalize-space()='Submit']");
        this.approve = page.locator("//span[normalize-space()='Approve']");


        
        


    }

}

module.exports = { Assets } 