class Vehicle{

    constructor(page) {
        this.page = page;

        this.entryBtn = page.locator("//button[normalize-space()='Entry']");


        this.regNumber =  page.locator("//input[@placeholder='TS 09 EP 0579']");
        this.driverName = page.locator("//input[@name='driverName']");
        this.driverNumber = page.locator('input[type="tel"]');
        this.accompanyPersons = page.locator('input[name="accompanyVisitors"]');

        this.remarksField = page.locator("//input[@name='remarks']");
        this.submitBtn = page.locator("//button[@type='submit']");

        this.approveDropdown = page.locator("//button[@type='button']");
        this.approveBtn = page.locator("//span[normalize-space()='Approve']");
        this.vehiclePass = page.locator("//div[@class='visitorpass card']//div[@class='col']");

        this.closeVehiclePass = page.locator("//button[@aria-label='Close']");
        this.scanBtn = page.locator("//button[normalize-space()='Scan / Code']");

        this.driverPhotoCapture = page.locator("//div[@class='ant-card ant-card-bordered css-1gwfwyx']");
        this.entryVehicleCapture = page.locator("//div[@class='ant-card ant-card-bordered mt-2 css-1gwfwyx']//div[@class='ant-card-body']");
        
        this.submitBtn = page.locator("//button[normalize-space()='Submit']");
    }

    generateFourDigitNumber() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    async navigateToVehicle() {
        await this.page.getByRole('link', { name: ' Security ' }).click();
        await this.page.getByRole('link', { name: 'Vehicle' }).click();

        // await this.page.pause();
    }

    async addGateEntry(vehicleNumber){
        await this.entryBtn.click();
        await this.page.getByRole('link', { name: 'Gate Entry' }).click();

        await this.regNumber.fill(vehicleNumber);

        await this.driverName.fill(`Driver  ${this.generateFourDigitNumber()}`);
        await this.driverNumber.fill("2323233232");

        await this.page.getByPlaceholder('Select').click();
        await this.page.getByLabel('Material Purchase').click();  
        
        await this.accompanyPersons.fill("2");
        await this.remarksField.fill("remarks");

        await this.submitBtn.click();

    }

    async approveGateEntry(vehicleNumber) {
        await this.page.getByRole('row', { name: vehicleNumber}).getByLabel('').check();
        await this.approveDropdown.click();
        await this.approveBtn.click(); 

    }

    async generatePassCode(vehicleNumber) {
        await this.page.getByRole('row', { name: vehicleNumber}).getByLabel('').check();
        await this.page.getByRole('button', { name: 'caret-down' }).click();
        await this.page.hover("//span[contains(text(),'Generate')]");
        await this.page.getByText('Gate Pass').click();
        let otp = await this.vehiclePass.textContent()
        console.log(otp);
        await this.closeVehiclePass.click();
        return otp;
        // await this.page.pause();
    }

    

    async fillOTPandCheckIn(otp) {
        await this.scanBtn.click();
        await this.page.locator('.ant-input').first().click();
        await this.page.locator('.ant-input').first().fill(otp[0]);
        await this.page.locator('div:nth-child(3) > .ant-input').fill(otp[1]);
        await this.page.locator('div:nth-child(4) > .ant-input').fill(otp[2]);
        await this.page.locator('div:nth-child(5) > .ant-input').fill(otp[3]);
        await this.page.locator('div:nth-child(6) > .ant-input').fill(otp[4]);
        await this.page.locator('div:nth-child(7) > .ant-input').fill(otp[5]);

        await this.driverPhotoCapture.click();
        await this.page.waitForTimeout(2000);
        
        await this.page.getByRole('button', { name: 'Capture' }).click();

        await this.page.waitForTimeout(1000);
        await this.entryVehicleCapture.click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('button', { name: 'Capture' }).click();

        await this.submitBtn.click();
    }

    async getRowCheckInStatus(vehicleNumber) {
       
        const rowLocator = this.page.locator('tr', { hasText: vehicleNumber });    
        const statusText = await rowLocator.locator('td').nth(6);
        console.log(await statusText.textContent());
        return await statusText.textContent();

    }


}

module.exports = {Vehicle}