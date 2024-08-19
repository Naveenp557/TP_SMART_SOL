class Shifts {
    constructor(page){

        this.profileIcon = page.locator("//div[@class = 'custom-name-avatar sb-avatar__text']");
        this.settings = page.locator("(//a[normalize-space()='Settings'])[1]");
        // this.userlink = page.locator("//a[@href='/home/settings/users']");
        // this.userbtn = page.locator("//button[contains(normalize-space(),'User')]");
        this.workForceSettings = page.locator("//span[normalize-space()='Workforce Settings']");
        this.shiftsSettings = page.locator("//span[@class='noti-dot'][normalize-space()='Shifts']");
        this.addShiftbtn = page.locator("//button[contains(normalize-space(),'Shift')]");


        this.locationSelector = page.locator('.Select > div:nth-child(2)');
        this.locationSelector2 = page.locator(".basic-multi-select > div > div > div:nth-child(2)");

        this.shfitNameInput = page.locator("//input[@name='shiftName']");
        this.shiftStartTime = page.locator("//input[@name='startTime']");
        this.shiftEndTime = page.locator("//input[@name='endTime']");

        this.thresholdTime = page.locator("//input[@name='thresholdTime']");
        this.breaktime = page.locator("//input[@id='brekTime']")
        
        this.submitBtn = page.locator("//button[@type='submit']");

        this.shiftNameSelect =  "//table/tbody/tr/td[2]/span";


        this.tableLocator = page.locator("table tbody tr");

        this.editDropdown = page.locator("//button[@type='button']");
        this.edit = page.locator("//span[contains(text(),'Edit')]");
    }
}


module.exports ={Shifts};