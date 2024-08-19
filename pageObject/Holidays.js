class Holidays{
    constructor(page){
        this.profileIcon = page.locator("//div[@class = 'custom-name-avatar sb-avatar__text']");
        this.settings = page.locator("(//a[normalize-space()='Settings'])[1]");
        this.workForceSettings = page.locator("//span[normalize-space()='Workforce Settings']");
        this.holidaysSettings = page.locator("//span[@class='noti-dot'][normalize-space()='Holidays']");
        this.addHolidaybtn = page.locator("//button[contains(normalize-space(),'Holiday')]");

        this.locationInput = page.locator(".select__input-container");

        this.holidayName = page.locator('input[name="holidayName"]');
        this.holidayDate = page.locator('input[name="holidayDate"]');

    }
}

module.exports = {Holidays}