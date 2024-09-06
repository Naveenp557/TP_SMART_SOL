class LocationSearchbar {
    
    
    constructor(page) {
        
        this.page = page;

        this.searchbar  = page.locator('//span[normalize-space()="Employee Type"]')
        this.locationName = page.locator('//tbody/tr[1]/td[2]')
        this.addressLine = page.locator('//tbody/tr[1]/td[3]')
        this.city = page.locator('//tbody/tr[1]/td[4]')
        this.state = page.locator('//tbody/tr[1]/td[5]')
        this.pincode = page.locator('//tbody/tr[1]/td[6]')

        

    }
}

module.exports = { LocationSearchbar } 
