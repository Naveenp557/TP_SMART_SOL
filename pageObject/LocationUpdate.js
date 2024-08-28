class LocationUpdate {

    constructor(page) {
        this.page = page

        this.profileIcon = page.locator("//div[@class = 'custom-name-avatar sb-avatar__text']");
        this.settings = page.locator("(//a[normalize-space()='Settings'])[1]");
        this.location = page.locator("//button[normalize-space()='Location']");
        this.addLocationName = page.locator("//input[@placeholder='Location Name']");
        this.locationNickName = page.locator("//input[@placeholder='Location Nick Name']");
        this.addressline = page.locator("//input[@name='address']");
        this.city = page.locator("input[placeholder='City']");
        this.state = page.locator("//input[@placeholder='State']");

        
        this.stateselect = page.locator("//select[@placeholder='State']");

        this.country = page.locator("//input[@placeholder='Country']");
        this.countryselect =  page.locator("//select[@placeholder='Country']")

        this.pincode = page.locator("//input[@placeholder='Pincode']");
        this.submit = page.locator("//button[normalize-space()='Submit']"); 

    }

    async addLocation(locationName){
        await this.profileIcon.click();
        await this.settings.click();
        await this.location.click();
        await this.addLocationName.fill(locationName);
        await this.locationNickName.fill('MPTN');
        await this.addressline.fill('Near to entrance city');
        await this.city.fill('Hyderabad');
        // await locationUpdate.state.fill('Telangana');
        // await locationUpdate.country.fill('India');
        await this.countryselect.selectOption({label : "India ( IN )"})
        await this.stateselect.selectOption({label : "Andhra Pradesh"})

        await this.pincode.fill('500005');
        await this.submit.click();
    }

    async updateLocationNickName(locationName){

        await this.page.getByRole('row', { name: `${locationName} Near to entrance` }).getByLabel('').check();
        await this.page.getByRole('button', { name: 'caret-down' }).click();
        await this.page.getByText('Edit').click();
        await this.locationNickName.waitFor({ state: 'visible' });
        await this.locationNickName.fill('MPNM');
        await this.page.waitForTimeout(1000);
        await this.submit.click();
        await this.page.waitForTimeout(1000);
    }

    async deleteLocation(locationName) {
        await this.page.getByRole('row', { name: `${locationName} Near to entrance` }).getByLabel('').check();
        await this.page.getByRole('button', { name: 'caret-down' }).click();
        await this.page.getByText('Delete').click();
        await this.page.getByRole('button', { name: 'Delete' }).click();
    }

}

module.exports = {LocationUpdate} 