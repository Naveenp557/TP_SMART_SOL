class Shifts {
  constructor(page) {
    this.page = page;

    this.profileIcon = page.locator(
      "//div[@class = 'custom-name-avatar sb-avatar__text']"
    );
    this.settings = page.locator("(//a[normalize-space()='Settings'])[1]");
    // this.userlink = page.locator("//a[@href='/home/settings/users']");
    // this.userbtn = page.locator("//button[contains(normalize-space(),'User')]");
    this.workForceSettings = page.locator(
      "//span[normalize-space()='Workforce Settings']"
    );
    this.shiftsSettings = page.locator(
      "//span[@class='noti-dot'][normalize-space()='Shifts']"
    );
    this.addShiftbtn = page.locator(
      "//button[contains(normalize-space(),'Shift')]"
    );

    this.locationSelector = page.locator(".Select > div:nth-child(2)");
    this.locationSelector2 = page.locator(
      ".basic-multi-select > div > div > div:nth-child(2)"
    );

    this.shfitNameInput = page.locator("//input[@name='shiftName']");
    this.shiftStartTime = page.locator("//input[@name='startTime']");
    this.shiftEndTime = page.locator("//input[@name='endTime']");

    this.thresholdTime = page.locator("//input[@name='thresholdTime']");
    this.breaktime = page.locator("//input[@id='brekTime']");

    this.submitBtn = page.locator("//button[@type='submit']");

    this.shiftNameSelect = "//table/tbody/tr/td[2]/span";

    this.tableLocator = page.locator("table tbody tr");

    this.editDropdown = page.locator("//button[@type='button']");
    this.edit = page.locator("//span[contains(text(),'Edit')]");
  }

  async navigateToShifts() {
    await this.profileIcon.click();
    await this.settings.click();
    await this.workForceSettings.click();
    await this.shiftsSettings.click();
  }

  async createShiftAndSubmit(shiftName) {
    await this.addShiftbtn.click();
    await this.locationSelector.first().click();
    await this.page.getByRole("option", { name: "Gujrat" }).click();
    await this.shfitNameInput.fill(shiftName);
    await this.page.locator('input[name="startTime"]').click();
    await this.page.getByRole("option", { name: "9:45 PM" }).click();
    await this.page.locator('input[name="endTime"]').click();
    await this.page.getByRole("option", { name: "12:45 PM" }).click();
    await this.thresholdTime.fill("10");
    await this.submitBtn.click();
  }


  async checkShiftAdded(shiftName) {
    let shiftList = await this.page.$$(this.shiftNameSelect);
    let isShiftExist = false;
    for (let shift of shiftList) {
      if (shiftName === (await shift.textContent())) {
        isShiftExist = true;
        break;
      }
    }
    return isShiftExist
  }

  async editShiftThreshold(shiftName){
    await this.page.waitForTimeout(3000);
    const rows = await this.page.locator('tbody tr')
    for(let i=0;i<await rows.count();i++) {
            const row=rows.nth(i);
            const tds=row.locator('td')
            const  requiredText =  await tds.nth(1).textContent();
            if(requiredText === shiftName){
                await tds.nth(0).click();
                break;
            }      
    }
    await this.editDropdown.click();
    await this.edit.click();
    await this.thresholdTime.fill("20");
    await this.submitBtn.click();
  }

  async getShiftThreshould(shiftName){
    let thresholdTime = "";
    const rows = await this.page.locator('tbody tr')
    for(let i=0;i<await rows.count();i++)   {
        const row=rows.nth(i);
        const tds=row.locator('td')
        const  requiredText =  await tds.nth(1).textContent(); 
        if(requiredText === shiftName){
            thresholdTime = await tds.nth(5).textContent()
            break;
        }      
    }
    return thresholdTime
  }
}

module.exports = { Shifts };
