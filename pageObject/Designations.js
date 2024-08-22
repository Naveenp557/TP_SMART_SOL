

class Designations {
    
    
    constructor(page) {
        
        this.page = page;
        //Designation locators
        this.designationModule = page.locator("//span[@class='noti-dot'][normalize-space()='Designations']")
        this.addDesignationBtn = page.locator('//button[normalize-space()="Designation"]')
        this.enterDesignation = page.locator('//input[@id="designationName"]')
        this.submitDesignation = page.locator('//button[normalize-space()="Submit"]')
        this.selectDesignation = page.locator("(//input[@type='checkbox'])[13]")
        this.editBtn = page.locator('//span[contains(text(),"Edit")]')
        this.actionButton = page.locator('//span[@aria-label="caret-down"]')
        this.deletebtn = page.getByText('Delete')
        this.conformDelete = page.getByRole('button', { name: 'Delete' })
        this.designationsCount = page.locator("//tbody/tr")
        this.submit = page.locator("//button[@type='submit']")
        


    }
    //Add Designation method
    async addDesignations(designation){
        
        await this.addDesignationBtn.click()
        await this.enterDesignation.fill(designation)
        await this.submitDesignation.click()
    }

    //Add Designation Assertion
    async checkDesignation(designation1) {
        const designationsInTable1 = await this.page.$$("//tbody/tr/td/span")
        for (const des of designationsInTable1) {

            if (await des.textContent() === designation1) {
                console.log(await des.textContent())
                return true;
                break;
            }
        }
    }

    //Update Designation
    async updateDesignation(update) {
        
        await this.selectDesignation.click();
        await this.actionButton.click();
        await this.editBtn.click()
        await this.page.waitForTimeout(1000)
        await this.enterDesignation.fill(update)
        await this.submit.click()
    }

    //Update designation Assertion
    async checkUpdatedDesignation(updatedName1) {
        const designationsInTable2 = await this.page.$$("//tbody/tr/td/span")
        for (const updatedDesignation of designationsInTable2) {

            if (await updatedDesignation.textContent() === updatedName1) {
                console.log(await updatedDesignation.textContent())
                return true;
                break;
            }
        }
    }

    //Delete Designation
    async deleteDesignationFromTable() {
        await this.selectDesignation.click();
        await this.actionButton.click();
        await this.deletebtn.click();
        await this.conformDelete.click()
    }
    //Delete Designation Assertion
    async checkDesignationsDeleted() {
        const before = await this.designationsCount.count()
        console.log(before)

    }
}
module.exports = { Designations }