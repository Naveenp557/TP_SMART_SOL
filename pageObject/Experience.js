class Experience{
    constructor(page){
        this.page = page;

        this.profileIcon = page.locator("//div[@class = 'custom-name-avatar sb-avatar__text']");
        this.settings = page.locator("(//a[normalize-space()='Settings'])[1]");
        this.workForceSettings = page.locator("//span[normalize-space()='Workforce Settings']");
        this.expSettings = page.locator( "//span[@class='noti-dot'][normalize-space()='Experience']");
        
        this.addExpBtn = page.locator("//button[contains(normalize-space(),'Experience')]");
        this.expNameinput = page.locator("//input[@id='experienceTypeName']");
        this.submitBtn = page.locator("//button[@type='submit']");

        this.expAlreadyExists = page.locator("//span[normalize-space()='Experience Level already exists']");

        this.expSelect = "//table/tbody/tr/td[2]";

        this.actionButton = page.locator('//span[@aria-label="caret-down"]')
        this.editBtn = page.locator('//span[contains(text(),"Edit")]');

        this.expNameinputEdit = page.locator("//input[@id='experianceLevelName']");
        this.deletebtn = page.getByText('Delete')
        this.conformDelete = page.getByRole('button', { name: 'Delete' })


    }

    async navigateToExperience() {
        await this.profileIcon.click();
        await this.settings.click();
        await this.workForceSettings.click();
        await this.expSettings.click();
    
    }


    async createExperience(expName){
        await this.addExpBtn.click();
        await this.expNameinput.fill(expName);
        await this.submitBtn.click();
    }  

    async checkExpAdded(expName) {
        let expList = await this.page.$$(this.expSelect);
        let isExpExist = false;
        for (let exp of expList) {
          if (expName === (await exp.textContent())) {
            isExpExist = true;
            break;
          }
        }
        return isExpExist
    }

    async editExperience(expName,updatedName) {
        const rows = this.page.locator('tbody tr')
        for(let i=0;i<await rows.count();i++) {
           const row=rows.nth(i);
           const tds=row.locator('td')
           const  requiredText =  await tds.nth(1).textContent();
           if(requiredText === expName){
               await tds.nth(0).click();
               break;
           }      
       }
       await this.actionButton.click();
       await this.editBtn.click();
       await this.expNameinputEdit.fill(updatedName);
       await this.submitBtn.click();
        
    }

    async deleteExperience(name){
        const rows = this.page.locator('tbody tr')
        for(let i=0;i<await rows.count();i++) {
           const row=rows.nth(i);
           const tds=row.locator('td')
           const  requiredText =  await tds.nth(1).textContent();
           if(requiredText === name){
               await tds.nth(0).click();
               break;
           }      
       }

       await this.actionButton.click();
       await this.deletebtn.click();
       await this.conformDelete.click()
    }

}

module.exports = {Experience}