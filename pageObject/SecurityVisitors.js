class SecurityVisitors {

    constructor(page) {

        this.profileIcon = page.locator("//div[@class = 'custom-name-avatar sb-avatar__text']");
        this.securityTab = page.getByRole('link', { name: ' Security ' })
        this.visitorsTab =  page.getByRole('link', { name: 'Visitor' })
        this.addEntrybtn = page.getByRole('button', { name: 'plus Entry' })
        this.addGateEntry = page.getByRole('link', { name: 'Gate Entry' })
        this.visitorName = page.getByLabel('visitorName')
        this.phoneNumber = page.locator('input[type="tel"]')
        this.departmentfield = page.locator('div').filter({ hasText: /^Visiting Department \*$/ }).getByPlaceholder('Select');
        this.selectDepartment= page.locator("//div[@id='visitingDepartment']/a[1]")
        this.visitingPerson = page.locator('div').filter({ hasText: /^Visiting Person \*$/ }).getByPlaceholder('Select');
        this.selectPerson = page.locator("//div[@id='visitingPerson']/a[1]")
        this.purposeofVisit = page.locator('div').filter({ hasText: /^Purpose of Visit \*$/ }).getByPlaceholder('Select');
        this.selectPurpose = page.locator("//div[@id='purpose-of-visit']/a[1]")
        this.accompanyVisitors = page.locator('input[name="accompanyVisitors"]')
        this.companyName = page.getByLabel('companyName')
        this.twoFactorAuth = page.getByText('Disabled')
        this.selectValidator =page.locator('#validatorSelect')
        this.tableLocator = page.locator("table tbody tr")
        this.editBtn = page.locator('//span[contains(text(),"Edit")]')
        this.actionButton = page.locator('//button[contains(@type,"button")]')
        this.approvebtn = page.locator('//span[normalize-space()="Approve"]')
        this.updateName = page.locator("//input[@name = 'visitorName']")
        this.generatebtn = page.locator('//span[contains(text(),"Generate")]')
        this.gatePass = page.locator('//span[normalize-space()="Gate Pass"]')
        this.otc =page.locator("//div[@class ='col']/h3")
        this.scanCodeBtn = page.locator('//button[normalize-space()="Scan / Code"]')
        this.otcColumns = page.locator("(//input[@placeholder='0'])[0]")
        this.closeGatepassBtn = page.locator('//button[normalize-space()="×"]')
        this.changeGate = page.locator('//select[@aria-label="Filter"]')
        this.selectGate = page.locator('//select[@aria-label="Filter"]/option[2]')
        this.capturebtn =  page.getByRole('dialog').locator('svg')
        this.captureImage = page.locator('//button[normalize-space()="Capture"]')
        this.cancelScanBtn  = page.locator('//button[normalize-space()="Cancel"]')
        this.pastTab = page.locator('//a[normalize-space()="Past"]')
        this.submitImage = page.locator('//button[normalize-space()="Submit"]')

        this.submit = page.getByRole('button', { name: 'Submit' })

        }
        async updateDesignationvisitor(update) {
        
            await this.selectVisitor.click();
            await this.actionButton.click();
            await this.editBtn.click()
            await this.page.waitForTimeout(1000)
            await this.enterDesignation.fill(update)
            await this.submit.click()
        }
        async  selectVisitor(rows, page ,visitor){
            const matchedRow = rows.filter({
                has : page.locator("td"),
                hasText :visitor
            })
        
            await matchedRow.locator("input").check();
            
        }



}

module.exports = { SecurityVisitors } 