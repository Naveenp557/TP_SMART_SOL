class CreateUser{
    constructor(page){

        this.page = page;

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

    async createNewSuperAdmin(firstname,lastName,email,password,phone){
         
        await this.userbtn.click();
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.password.fill(password);
    
        await this.role.selectOption({label : "Super Admin"});
        await this.phone.fill(phone);
        await this.submit.click();

    }

    async createNewUser(firstname,lastName,email,password,phone,location){
         
        await this.userbtn.click();
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.password.fill(password);
    
        await this.phone.fill(phone);

        await this.role.selectOption({label : "User"});


        await this.page.locator('#root svg').click();
        await this.page.getByRole('option', { name: location }).click();      
        await this.page.getByRole('button', { name: 'Submit' }).click();


        await this.submit.click();


    }

    async updateUser(firstname, lastName, lastName2){
        const updaterows = await this.tableLocator;
        await this.selectUser(updaterows,this.page,`${firstname} ${lastName}`)
        
        await this.editdropdown.click();
        await this.edit.click();
        await this.lastName.fill(lastName2);
        await this.submit.click();
    }

    async deleteUser(firstname, lastName2){
        const deleterows = await this.tableLocator;
        await this.selectUser(deleterows,this.page,`${firstname} ${lastName2}`)
        await this.editdropdown.click();
        await this.deletebtn.click();
        await this.deletePopupBtn.click();
    }

    async  selectUser(rows, page ,name){
        const matchedRow = rows.filter({
            has : page.locator("td"),
            hasText :name
        })
    
        await matchedRow.locator("input").check();
        
    }
    

}

module.exports = {CreateUser} 