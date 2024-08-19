class Department{
    constructor(page){

        this.profileIcon = page.locator("//div[@class = 'custom-name-avatar sb-avatar__text']");
        this.settings = page.locator("(//a[normalize-space()='Settings'])[1]");
        // this.userlink = page.locator("//a[@href='/home/settings/users']");
        // this.userbtn = page.locator("//button[contains(normalize-space(),'User')]");
        this.workForceSettings = page.locator("//span[normalize-space()='Workforce Settings']");
        this.departmentSettings = page.locator("//span[@class='noti-dot'][normalize-space()='Departments']");

        this.addDepartmentbtn = page.locator("//button[contains(normalize-space(),'Department')]");
        this.table = page.locator("table")
        
    }
}

module.exports = {Department}