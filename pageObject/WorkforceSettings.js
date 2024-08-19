const { LocationUpdate } = require('./LocationUpdate');
class WorkforceSettings {

    constructor(page) {
        this.page = page;
        //Department Locators
        this.workforceSettingTab = page.locator("//span[normalize-space()='Workforce Settings']")
        this.departmentsModule = page.locator("//li/a/span[text()='Departments']")
        this.addDepartmentButton = page.locator("//button[text()='Department']")
        this.enterDepartmentField = page.getByPlaceholder('Enter Department')
        this.enterDepartmentName = page.locator('//input[@id="departmentName"]')
        this.submitDepartment = page.locator("//button[@type='submit']")
        this.departmentsList = page.locator("//tbody/tr/td/span")
        this.selectDepatment = page.locator("//tbody/tr[1]/td[1]/label[1]/span[1]/input[1]")
        this.actionButton = page.getByRole('button', { name: 'caret-down' })
        this.editBtn = page.locator("//span[contains(text(),'Edit')]")
        this.deletebtn = page.getByText('Delete')
        this.conformDelete = page.getByRole('button', { name: 'Delete' })

    }
    //Add department method
    async addDepartment(addDepartmentName) {

        // await this.workforceSettingTab.click()
        await this.departmentsModule.click()
        await this.page.waitForTimeout(3000)
        await this.addDepartmentButton.click()
        await this.enterDepartmentName.fill(addDepartmentName)
        await this.submitDepartment.click()
    }
    //Assertion for Add Department
    async checkDepartmentInTable(addDepartment) {
        const departmentsInTable = await this.page.$$("//tbody/tr/td/span")
        for (const dep of departmentsInTable) {

            if (await dep.textContent() === addDepartment) {
                console.log(await dep.textContent())
                return true;
                break;
            }
        }
    }

    //Delete Deartment
    // async deleteDepartmentFromTable(deleteDepartment){
    //     const departmentsInTable = await  this.page.$$("//tbody/tr/td/span")
    //     for(const dep2 of departmentsInTable){
    //         if(await dep2.textContent()===deleteDepartment){
    //             await this.selectDepatment.toBeChecked()


    //         }
    //     }
    // }
    //update department
    async updateDepartment(update) {
        await this.selectDepatment.click();
        await this.actionButton.click();
        await this.editBtn.click()
        
        await this.enterDepartmentName.fill(update)
        await this.submitDepartment.click()
    }

    //Assertion update Department
    async checkUpdatedDepartment(updatedName1) {
        const departmentsInTable = await this.page.$$("//tbody/tr/td/span")
        for (const updatedDep of departmentsInTable) {

            if (await updatedDep.textContent() === updatedName1) {
                console.log(await updatedDep.textContent())
                return true;
                break;
            }
        }
    }




    //Delete department
    async deleteDepartmentFromTable() {
        await this.selectDepatment.click();
        await this.actionButton.click();
        await this.deletebtn.click();
        await this.conformDelete.click()

    }




}

module.exports = { WorkforceSettings }

