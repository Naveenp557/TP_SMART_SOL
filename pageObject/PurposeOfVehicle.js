class PurposeOfVehicle{
    constructor(page){
        this.page = page;

        this.profileIcon = page.locator("//div[@class = 'custom-name-avatar sb-avatar__text']");
        this.settings = page.locator("(//a[normalize-space()='Settings'])[1]");
        this.securitySettings = page.locator("//span[normalize-space()='Security Settings']");
        this.purposeSettings = page.locator("//span[@class='noti-dot'][normalize-space()='Purpose of Vehicle Entry']");

       
    }


    async navigateToPurpose() {
        await this.profileIcon.click();
        await this.settings.click();
        await this.securitySettings.click();
        await this.purposeSettings.click();
    }

    async createPurpose(purposeName){
        await this.page.getByRole('button', { name: '+ Purpose' }).click();
        await this.page.getByLabel('Purpose of Entry *').fill(purposeName);
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }

    async updatePurpose(purposeName, updatedName){
        await this.page.getByRole('row', { name: purposeName }).getByLabel('').check();
        await this.page.getByRole('button', { name: 'caret-down' }).click();
        await this.page.getByText('Edit').click();
        await this.page.getByLabel('Purpose of Entry *').click();
        await this.page.getByLabel('Purpose of Entry *').fill(updatedName);
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }

    async deletePurpose(name){

        await this.page.getByRole('row', { name: name }).getByLabel('').check();
        await this.page.getByRole('button', { name: 'caret-down' }).click();
        await this.page.getByText('Delete').click();
        await this.page.getByRole('button', { name: 'Delete' }).click();
    }
}

module.exports ={PurposeOfVehicle}