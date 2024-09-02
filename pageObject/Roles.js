class Roles {

    constructor(page){
        this.profileIcon = page.locator("//div[@class = 'custom-name-avatar sb-avatar__text']");
        this.settings = page.locator("(//a[normalize-space()='Settings'])[1]");
        this.roleslink = page.locator("//span[normalize-space()='Roles & Permissions']");

        this.userselect = page.locator("//li/a/span[.=' asdf asdf']");

        this.selectall = page.locator("//input[@value='all']");
        
        this.updateSettingsBtn = page.locator("//button[@type='button']");

        this.backToHome = page.locator("//span[normalize-space()='Back to Home']");

        this.dashboard = page.locator("//i[contains(@class,'la la-tachometer')]");
        
        this.workForceLink = page.locator("//i[@class='la la-user']");
        
        this.timeSheetsLink = page.locator("//span[normalize-space()='Timesheets']");
        this.timeSheetBody = page.locator('//*[@id="root"]/div/div[2]/main/div/p');

        this.employeeLink = page.locator("//span[normalize-space()='Employees']");
        this.employeeBody = page.locator("//span[@class='page-title1']");
        this.employeeButton = page.locator("//button[@type='button']//i[@class='fa fa-plus']");


        this.attendanceLink = page.locator("//span[normalize-space()='Attendance']");
        this.attendanceBody = page.locator("//p[normalize-space()='No Access to View Attendance']");


        // securityTab  .nav-item[role*='presentation']
        
        this.securityTab2 = page.locator(".nav-item[role*='presentation']");
        // this.securityTab = page.locator("//div[2]//main[1]//div[1]//div[2]//div[3]//div[1]//div[1]//ul[1]//li[2]//a[1]");


        this.securityLink = page.locator("//i[@class='la la-shield']");
        this.visitorEntryLink = page.locator("//span[normalize-space()='Visitor Entry']");
        this.visitorEntryBody = page.locator("//p[normalize-space()='No Access to View Visitors']");

    //     getByRole('row', { name: 'Module Permission Read Create' }).getByRole('checkbox')

    //    this.employeeRead = page.locator("locator('.text-center > input').first()");

    //    getByRole('row', { name: 'Timesheet' }).getByRole('checkbox').first()

    //    getByRole('row', { name: 'Timesheet' }).getByRole('checkbox').nth(1);

    //    getByRole('row', { name: 'Attendance' }).getByRole('checkbox').first();

    //    getByRole('row', { name: 'Attendance' }).getByRole('checkbox').nth(1)

    }
}

module.exports = {Roles}