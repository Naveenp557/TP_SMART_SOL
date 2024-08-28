

class Designations {
    
    
    constructor(page) {
        
        this.page = page;
        this.workforceSettingTab = page.locator("//span[normalize-space()='Workforce Settings']")

        this.profileIcon = page.locator("//div[@class = 'custom-name-avatar sb-avatar__text']");
        this.settings = page.locator("(//a[normalize-space()='Settings'])[1]");
      

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
        let isExist = false;
        const designationsInTable1 = await this.page.$$("//tbody/tr/td/span")
        for (const des of designationsInTable1) {

            if (await des.textContent() === designation1) {
                console.log(await des.textContent())
                isExist =  true;
                break;
            }
        }
        return isExist;
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
        let isExist = false;
        const designationsInTable2 = await this.page.$$("//tbody/tr/td/span")
        for (const updatedDesignation of designationsInTable2) {

            if (await updatedDesignation.textContent() === updatedName1) {
                console.log(await updatedDesignation.textContent())
                isExist = true;
                break;
            }
        }
        return isExist;
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
        return before;

    }

    async editDesignation(desname,updatedName) {
        const rows = this.page.locator('tbody tr')
        for(let i=0;i<await rows.count();i++) {
           const row=rows.nth(i);
           const tds=row.locator('td')
           const  requiredText =  await tds.nth(1).textContent();
           if(requiredText === desname){
               await tds.nth(0).click();
               break;
           }      
       }
       await this.actionButton.click();
       await this.editBtn.click();
       await this.enterDesignation.fill(updatedName);
       await this.submit.click();
        
    }

    async deleteDesignation(desname) {

        const rows = this.page.locator('tbody tr')
        for(let i=0;i<await rows.count();i++) {
           const row=rows.nth(i);
           const tds=row.locator('td')
           const  requiredText =  await tds.nth(1).textContent();
           if(requiredText === desname){
               await tds.nth(0).click();
               break;
           }      
       }
        
        await this.actionButton.click();
        await this.deletebtn.click();
        await this.conformDelete.click()
    }
}
module.exports = { Designations }