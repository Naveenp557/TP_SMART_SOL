class AssetType {
    constructor(page){
        this.page = page;
        this.profileIcon = page.locator("//div[@class = 'custom-name-avatar sb-avatar__text']");
        this.settings = page.locator("(//a[normalize-space()='Settings'])[1]");
        this.assetSettings = page.locator("//span[normalize-space()='Asset Settings']");

        this.assetTypeTab = page.locator("//span[@class='noti-dot'][normalize-space()='Asset Type']");
        
        this.addAssetTypeBtn =  page.locator("//button[@type='button']");
        this.assetInputField =  page.locator("//input[@id='assetTypeName']");
        this.submitBtn       = page.locator("//button[@type='submit']");

    }

    async navigateToAssetType(){

        await this.profileIcon.click();
        await this.settings.click();
        await this.assetSettings.click()
        await this.assetTypeTab.click()
    }

    async addAssetType(assetTypeName){
        await this.addAssetTypeBtn.click();
        await this.assetInputField.fill(assetTypeName);
        await this.submitBtn.click();
    }

    async editAssetType(assetTypeName,newName){

        await this.page.getByRole('row', { name: `${assetTypeName}` }).getByLabel('').check();

        await this.page.getByRole('button', { name: 'caret-down' }).click();
        await this.page.getByText('Edit').click();

        await this.assetInputField.fill(newName);
        await this.submitBtn.click();
    }

    async deleteAssetType(assetTypeName) {
        await this.page.getByRole('row', { name: `${assetTypeName}` }).getByLabel('').check();
        await this.page.getByRole('button', { name: 'caret-down' }).click();
        await this.page.getByText('Delete').click();
        await this.page.getByRole('button', { name: 'Delete' }).click();
    }
    
}

module.exports = {AssetType}