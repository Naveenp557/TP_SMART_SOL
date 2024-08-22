class Holidays{
    constructor(page){

        this.page = page;
        this.profileIcon = page.locator("//div[@class = 'custom-name-avatar sb-avatar__text']");
        this.settings = page.locator("(//a[normalize-space()='Settings'])[1]");
        this.workForceSettings = page.locator("//span[normalize-space()='Workforce Settings']");
        this.holidaysSettings = page.locator("//span[@class='noti-dot'][normalize-space()='Holidays']");
        this.addHolidaybtn = page.locator("//button[contains(normalize-space(),'Holiday')]");

        this.locationInput = page.locator(".select__input-container");

        this.holidayName = page.locator('input[name="holidayName"]');
        this.holidayDate = page.locator('input[name="holidayDate"]');

        this.holidaySubmit = page.locator("//button[@type='submit']");

        this.editDropdown = page.locator("//button[@type='button']");
        this.edit = page.locator("//span[contains(text(),'Edit')]");
        this.delete = page.locator("//span[normalize-space()='Delete']");
        this.confirmDeletebtn = page.locator("//button[normalize-space()='Delete']")

    }

    async navigateToHolidays() {
        await this.profileIcon.click();
        await this.settings.click();
        await this.workForceSettings.click();
        await this.holidaysSettings.click();
    }

    async createHoliday(holidayName, location,holidaydate){
        await this.addHolidaybtn.click();
        await this.locationInput.click();
        // await page.locator('.select__input-container').click();
        await this.page.getByRole('option', { name: location }).click();
        await this.holidayName.fill(holidayName);
        await this.holidayDate.fill(holidaydate);
        await this.holidaySubmit.click();
    }

    async getHolidayDateByLocation(holidayName, location){
        let holidayDate = "";
        
        const rows = await this.page.locator('tbody tr')
        for(let i=0;i<await rows.count();i++)   {
            const row=rows.nth(i);
            const tds=row.locator('td')
            const  holidayText =  await tds.nth(1).textContent(); 
            const holidayLocationText = await tds.nth(4).textContent();
            console.log(holidayText,holidayLocationText);
            if(holidayText === holidayName && holidayLocationText.toLowerCase() === location){
                holidayDate = await tds.nth(2).textContent()
                break;
            }      
        }
        return holidayDate
    }

    async editHoliday(holidayName,updatedName) {
        const rows = this.page.locator('tbody tr')
        for(let i=0;i<await rows.count();i++) {
           const row=rows.nth(i);
           const tds=row.locator('td')
           const  requiredText =  await tds.nth(1).textContent();
           if(requiredText === holidayName){
               await tds.nth(0).click();
               break;
           }      
       }
       await this.editDropdown.click();
       await this.edit.click();
       await this.holidayName.fill(updatedName);
       await this.holidaySubmit.click();
        
    }

    async deleteHoliday(holidayName) {
        const rows = this.page.locator('tbody tr')
        for(let i=0;i<await rows.count();i++) {
           const row=rows.nth(i);
           const tds=row.locator('td')
           const  requiredText =  await tds.nth(1).textContent();
           if(requiredText === holidayName){
               await tds.nth(0).click();
               break;
           }      
       }
       await this.editDropdown.click();
       await this.delete.click();
       await this.confirmDeletebtn.click();
        
    }
}

module.exports = {Holidays}