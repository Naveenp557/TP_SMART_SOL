const { LocationUpdate } = require('./LocationUpdate');
class WorkforceDepartmentSettings {

    constructor(page) {
        this.page = page;
        //Department Locators

        this.profileIcon = page.locator("//div[@class = 'custom-name-avatar sb-avatar__text']");
        this.settings = page.locator("(//a[normalize-space()='Settings'])[1]");
       

        this.workforceSettingTab = page.locator("//span[normalize-space()='Workforce Settings']")
        this.departmentsModule = page.locator("//li/a/span[text()='Departments']")
        this.addDepartmentButton = page.locator("//button[text()='Department']")
        this.enterDepartmentField = page.getByPlaceholder('Enter Department')
        this.enterDepartmentName = page.locator('//input[@id="departmentName"]')
        this.submit = page.locator("//button[@type='submit']")
        this.updateDepartmentbtn = page.locator("//button[@type='submit']")
        this.departmentsList = page.locator("//tbody/tr/td/span")
        this.selectDepatment = page.locator("//tbody/tr[4]/td[1]/label[1]/span[1]/input[1]")
        this.actionButton = page.locator('//span[@aria-label="caret-down"]')
        this.editBtn = page.locator("//span[contains(text(),'Edit')]")
        this.deletebtn = page.getByText('Delete')
        this.conformDelete = page.getByRole('button', { name: 'Delete' })
        this.selectAllCheckbox = page.locator("//th[@class='ant-table-cell']//input[@type='checkbox']")
        this.departmentCount = page.locator("//tbody/tr")
        
        this.departmentAlreadyExists = page.locator("//span[normalize-space()='Department already exists']");
        this.cancleBtn = page.getByRole('button', { name: 'Cancel' })


    }
    //Add department method
    async addDepartment(addDepartmentName) {

        await this.departmentsModule.click()
        await this.addDepartmentButton.click()
        await this.enterDepartmentName.fill(addDepartmentName)
        await this.submit.click()
    }
    //Assertion for Add Department
    async checkDepartmentInTable(addDepartment) {

        let isExist = false;
        const departmentsInTable1 = await this.page.$$("//tbody/tr/td/span")

        console.log("departmentsInTable1 length",departmentsInTable1.length );
        for (const dep of departmentsInTable1) {

            const receivedText = await dep.textContent()
            if (receivedText === addDepartment) {
                isExist = true
                break;
            }
        }
        return isExist;
    }
    //update department

 

    async checkUpdatedDepartment(updatedName1) {

        let isExist = false;
        const departmentsInTable2 = await this.page.$$("//tbody/tr/td/span")
        for (const updatedDep of departmentsInTable2) {

            if (await updatedDep.textContent() === updatedName1) {
                console.log(await updatedDep.textContent());
                isExist = true;
            }
        }
        return isExist;
    }
    //Delete department

   
    //Delete Department Assertion
    async checkDepartmentDeleted() {
        const before = await this.departmentCount.count()
        console.log(before)
        return before;

    }
   

    async editDepartment(departmentName,updatedName) {
        const rows = this.page.locator('tbody tr')
        for(let i=0;i<await rows.count();i++) {
           const row=rows.nth(i);
           const tds=row.locator('td')
           const  requiredText =  await tds.nth(1).textContent();
           if(requiredText === departmentName){
               await tds.nth(0).click();
               break;
           }      
       }
       await this.actionButton.click();
       await this.editBtn.click();
       await this.enterDepartmentName.fill(updatedName);
       await this.updateDepartmentbtn.click();
        
    }

    async deleteDepartment(departmentName) {

        const rows = this.page.locator('tbody tr')
        for(let i=0;i<await rows.count();i++) {
           const row=rows.nth(i);
           const tds=row.locator('td')
           const  requiredText =  await tds.nth(1).textContent();
           if(requiredText === departmentName){
               await tds.nth(0).click();
               break;
           }      
       }
        
        await this.actionButton.click();
        await this.deletebtn.click();
        await this.conformDelete.click()
    }


}

module.exports = { WorkforceDepartmentSettings }

