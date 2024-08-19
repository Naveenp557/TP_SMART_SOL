class CreateUser{
    constructor(page){

        this.profileIcon = page.locator("//div[@class = 'custom-name-avatar sb-avatar__text']");
        this.settings = page.locator("(//a[normalize-space()='Settings'])[1]");
        this.userlink = page.locator("//a[@href='/home/settings/users']");
        this.userbtn = page.locator("//button[contains(normalize-space(),'User')]");


        this.firstName = page.locator("//input[@placeholder='First Name']");
        this.lastName =  page.locator("//input[@placeholder='Last Name']");
        this.email = page.locator("//input[@placeholder='Client Email']");
        this.password = page.locator("//input[@placeholder='Password']");

        this.role = page.locator("//select[@name='userType']");
        this.phone = page.locator("//input[@placeholder='Phone']");
        this.location = page.locator("//select[@class='form-select']");

        this.submit = page.locator("//button[normalize-space()='Submit']");

        this.edit = page.locator("//span[contains(text(),'Edit')]");

        this.editdropdown = page.locator("//button[@type='button']");

        this.tableLocator = page.locator("table tbody tr");

        this.deletebtn = page.locator("//span[contains(text(),'Delete')]");
        
        this.deletePopupBtn = page.locator("//button[normalize-space()='Delete']");
        

    }

}

module.exports = {CreateUser} 