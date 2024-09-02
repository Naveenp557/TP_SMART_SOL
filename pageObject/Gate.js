class Gate{
    constructor(page){
        this.page = page;

        this.profileIcon = page.locator("//div[@class = 'custom-name-avatar sb-avatar__text']");
        this.settings = page.locator("(//a[normalize-space()='Settings'])[1]");
        this.securitySettings = page.locator("//span[normalize-space()='Security Settings']");
        this.gatePageSettings = page.locator("//span[@class='noti-dot'][normalize-space()='Gate']");
        this.addGateBtn = page.locator("//button[@type='button']");
        this.gateNameField = page.locator("input[name='gatename']");
        this.submitBtn = page.locator("//button[@type='submit']");
        this.locationInput = page.locator("//div[@class='Select Location__input-container css-19bb58m']");

        this.editDropdown = page.locator("//button[@type='button']");
        this.edit = page.locator("//span[contains(text(),'Edit')]");

    }

    async navigateToGateSettings() {
        await this.profileIcon.click();
        await this.settings.click();
        await this.securitySettings.click();
        await this.gatePageSettings.click();
    }

    async createGate(gateName,location){
        await this.addGateBtn.click();
        await this.locationInput.click();
        await this.page.getByRole('option', { name: location }).click();
        await this.gateNameField.fill(gateName);
        await this.submitBtn.click();

    }


    async checkGateInTable(gateName) {

        let isExist = false;
        const gateList = await this.page.$$("//tbody/tr/td[2]")

        console.log("gateName length",gateList.length );
        for (const gate of gateList) {

            const receivedText = await gate.textContent()
            if (receivedText === gateName) {
                isExist = true
                break;
            }
        }
        return isExist;
    }

    async updateGate(oldGateName, newGateName){
        const rows = this.page.locator('tbody tr')
        for(let i=0;i<await rows.count();i++) {
           const row=rows.nth(i);
           const tds=row.locator('td')
           const  requiredText =  await tds.nth(1).textContent();
           
           if(requiredText === oldGateName){
               await tds.nth(0).click();
               break;
           }      
       }
       await this.editDropdown.click();
       await this.edit.click();

       await this.gateNameField.fill(newGateName);
       await this.submitBtn.click();
    }

    async deleteGate(gateName){
   
       await this.page.getByRole('row', { name: `${gateName}` }).getByLabel('').check();
       await this.page.getByRole('button', { name: 'caret-down' }).click();
       await this.page.getByText('Delete').click();
       await this.page.getByRole('button', { name: 'Delete' }).click();
      
    }
}

module.exports = {Gate}
