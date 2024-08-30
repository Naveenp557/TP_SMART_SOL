class Employee {
    
    constructor(page){
        this.page = page;

        this.employeeLink = page.locator("//a[@href='/home/workforce/employee']");
        this.employeeButton = page.locator("//button[normalize-space()='Employee']");
        this.employeeFName = page.locator("//input[@placeholder='First Name']");
        this.employeeLname = page.locator("//input[@placeholder='Last Name']");
        this.employeeSaveandContinue = page.locator("//button[normalize-space()='Save & Continue']");
        this.phoneno = page.locator("(//input[@class= 'form-control ' and @type = 'tel'])[1]");
        this.email = page.locator("//input[@aria-label='email']");
        this.addressline1 = page.locator("//input[@name='addressLineOne']");
        this.city = page.locator("//input[@aria-label='city']");
        this.state = page.locator("//input[@aria-label='state']");
        this.pincode = page.locator("//input[@aria-label='pincode']");
        this.emergencyConatctName = page.locator("//input[@aria-label='emergencyContactName']");
        this.emergencyEmergencyConatctNo = page.locator("(//input[@class= 'form-control ' and @type = 'tel'])[2]");
        this.employeeDoB = page.locator("//input[@type='date']");
        this.aadhar = page.locator("input[aria-label$='aadhar']");
        this.pan = page.locator("//input[@aria-label='pan']");
        

        
    }

    async navigateToEmployee(){
         await this.employeeLink.click();
        //await this.page.getByRole('link', { name: 'Employees' }).click();

        // await this.page.pause();
    }

    generateRandomText(length) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomText = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            randomText += charset[randomIndex];
        }
        return randomText;
    }

 
    generateRandomTenDigitNumber() {
        return Math.floor(1000000000 + Math.random() * 9000000000).toString();
    }


    async createEmployee(randomText,randomnumber) {
        this.employeeButton.click();
    
        await this.employeeFName.fill(randomText);
        await this.employeeLname.fill(randomText);
        await this.employeeLname.press('Tab');
        await this.page.locator('select[name="employeeType"]').selectOption({ index: 1 });
        await this.page.locator('select[name="department"]').selectOption({index : 1});
        await this.page.locator('select[name="designation"]').selectOption({index: 1});
        await this.page.locator('select[name="experience"]').selectOption({index: 1});
        await this.page.locator('input[name="joiningDate"]').fill('2024-08-26');
        await this.page.waitForTimeout(1000);
        await this.employeeSaveandContinue.click();
        await this.phoneno.fill(randomnumber);
        await this.email.fill(randomText + '@gmail.com');
        await this.addressline1.fill('Mnagar');
        await this.city.fill('hyderabad');
        await this.state.fill('TS');
        await this.pincode.fill('500020');
        await this.emergencyConatctName.fill('Test name');
        await this.emergencyEmergencyConatctNo.fill(randomnumber);
        await this.page.getByLabel('Filter').selectOption('Son');
        await this.page.waitForTimeout(1000);
        await this.employeeSaveandContinue.click();
        await this.employeeDoB.fill('2010-08-01');
        await this.page.locator('select[name="gender"]').selectOption('male');
        await this.page.locator('select[name="bloodGroup"]').selectOption('A+');
        await this.page.getByRole('button', { name: 'Submit' }).click();
    }

    async approveEmployee(randomText) {
        await this.page.getByRole('row', { name: `${randomText} ${randomText} `  }).first().getByLabel('').first().click(); 
        await this.page.getByRole('button', { name: 'caret-down' }).click();
        await this.page.getByText('Approve', { exact: true }).click();
      //  await this.page.pause();
    }

    async editEmployee(randomText,adhar,panNumber) {
        await this.page.getByRole('row', { name: randomText }).getByLabel('').click(); 
        await this.page.getByRole('button', { name: 'caret-down' }).click();
        await this.page.getByText('Edit', { exact: true }).click();

        await this.page.locator('select[name="employeeType"]').selectOption({ index: 1 });
        await this.page.locator('select[name="department"]').selectOption({index : 1});

        await this.employeeSaveandContinue.click();
        await this.addressline1.fill('address updated');

        await this.employeeSaveandContinue.click();

        await this.aadhar.fill(adhar)
        await this.pan.fill(panNumber);

        await this.page.getByRole('button', { name: 'Submit' }).click();


      //  await this.page.pause();
    }

    async navigateToEmployeePage(randomText) {
        await this.page.getByRole('heading', { name: `${randomText} ` }).click();

        // await this.page.pause();

    }


}

module.exports = {Employee}