class EmployeeType {
    
    
    constructor(page) {
        
        this.page = page;
        //EmployeeType Locators
        this.employeeTypeModule = page.locator('//span[normalize-space()="Employee Type"]')
        this.addEmployeeTypeBtn = page.locator('//button[normalize-space()="Employee Type"]')
        this.enterEmployeeType = page.locator('//input[@id="EmployeeTypeName"]')
        this.employeeType = page.locator('//tbody/tr[3]/td[1]/label[1]/span[1]/input[1]')
        this.submit = page.locator('//button[normalize-space()="Submit"]')


    }
}
module.exports = { EmployeeType } 
