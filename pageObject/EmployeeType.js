class EmployeeType {
    
    
    constructor(page) {
        
        this.page = page;
        //EmployeeType Locators
        this.employeeTypeModule = page.locator('//span[normalize-space()="Employee Type"]')
        this.addEmployeeTypeBtn = page.locator('//button[normalize-space()="Employee Type"]')
        this.enterEmployeeType = page.locator('//input[@id="EmployeeTypeName"]')
        this.employeeType = page.locator('//tbody/tr[3]/td[1]/label[1]/span[1]/input[1]')
        this.tableLocator = page.locator("table tbody tr")
        this.deletebtn = page.locator("//span[contains(text(),'Delete')]")
        this.submit = page.locator('//button[normalize-space()="Submit"]')


    }
    //add employeeType
    async addEmployeeType(empTyp1){
        await this.addEmployeeTypeBtn.click()
        await this.enterEmployeeType.fill(empTyp1)
        await this.submit.click()

    }
    //update employeeType
    async updateEmployeeType(empTyp2){
        const updaterows = await this.tableLocator
        await this.selectEmployeeType(updaterows,this.page,`${empTyp2}`)
    }
    //delete employeeType
    async deleteEmployee(empTyp2){
        const deleterows = await this.tableLocator;
        await this.selectEmployeeType(deleterows,this.page,`${empTyp2}`)
        // await this.editdropdown.click();
        // await this.deletebtn.click();
        // await this.deletePopupBtn.click();
    }


    async  selectEmployeeType(rows, page ,empTyp2){
        const matchedRow = rows.filter({
            has : page.locator("td"),
            hasText :empTyp2
        })
    
        await matchedRow.locator("input").check();
        
    }
    

    
}
module.exports = { EmployeeType } 
