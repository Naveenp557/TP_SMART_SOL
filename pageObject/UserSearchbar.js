class UserSearchbar {
    
    
    constructor(page) {
        
        this.page = page;

        this.userTab = page.locator('//span[contains(@class,"noti-dot")][normalize-space()="Users"]')
        this.searchbar  = page.locator('//input[@type="search"]')
        this.userName = page.locator('//tbody/tr[1]/td[2]')
        this.email = page.locator('//tbody/tr[1]/td[3]')
        this.phone = page.locator('//tbody/tr[1]/td[4]')
        this.userRole = page.locator('//tbody/tr[1]/td[5]')
        this.location = page.locator('//tbody/tr[1]/td[6]/span[1]')

        

    }
}

module.exports = { UserSearchbar } 