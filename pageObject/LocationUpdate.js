class LocationUpdate {

    constructor(page) {

        this.profileIcon = page.locator("//div[@class = 'custom-name-avatar sb-avatar__text']");
        this.settings = page.locator("(//a[normalize-space()='Settings'])[1]");
        this.location = page.locator("//button[normalize-space()='Location']");
        this.addLocationName = page.locator("//input[@placeholder='Location Name']");
        this.locationNickName = page.locator("//input[@placeholder='Location Nick Name']");
        this.addressline = page.locator("//textarea[@aria-label='Comment']");
        this.city = page.locator("input[placeholder='City']");
        this.state = page.locator("//input[@placeholder='State']");
        this.country = page.locator("//input[@placeholder='Country']");
        this.pincode = page.locator("//input[@placeholder='Pincode']");
        this.submit = page.locator("//button[normalize-space()='Submit']");

        }


}

module.exports = { LocationUpdate } 