class LocationUpdate {

    constructor(page) {

        this.profileIcon = page.locator("//div[@class = 'custom-name-avatar sb-avatar__text']");
        this.settings = page.locator("(//a[normalize-space()='Settings'])[1]");
        this.location = page.locator("//button[normalize-space()='Location']");
        this.addLocationName = page.locator("//input[@placeholder='Location Name']");
        this.locationNickName = page.locator("//input[@placeholder='Location Nick Name']");
        this.addressline = page.locator("//input[@autocomplete='new-address']");
        this.city = page.locator("input[placeholder='City']");
        this.state = page.locator("//select[@placeholder = 'State']");
        this.country = page.locator("//select[@placeholder='Country']");
        this.pincode = page.locator("//input[@placeholder='Pincode']");
        this.submit = page.locator("//button[normalize-space()='Submit']");
        this.tableLocator = page.locator("table tbody tr");
        this.table = page.locator("table");

    }

    // Method to get the number of rows in the table
    async getRowCount() {
        return await this.tableLocator.count();
    }

    // Method to get all td values from a specific row
    async getTdValuesFromRow(rowIndex) {
        const rowLocator = this.tableLocator.nth(rowIndex); // Get the row at the specified index
        const tdLocators = rowLocator.locator('td'); // Locate all td elements in that row
        return await tdLocators.allTextContents(); // Get text contents of all td elements
    }

    // Method to select and interact with a specific row
    async selectRow(rowIndex) {
        const rowLocator = this.tableLocator.nth(rowIndex); // Get the row at the specified index
        await rowLocator.click(); // Perform an action on the row, such as clicking
    }

    async clearPincode() {
        await this.pincode.fill(''); // Fill the field with an empty string to clear it

        // Verify the field is cleared
        const pincodeValue = await this.pincode.inputValue();
        if (pincodeValue !== '') {
            throw new Error(`Expected pincode to be cleared, but got '${pincodeValue}'`);
        }
        console.log('Pincode field successfully cleared.');
    }

    async clearLocationNickName() {
        await this.locationNickName.fill(''); // Fill the field with an empty string to clear it

        // Verify the field is cleared
        const locationNickNameValue = await this.locationNickName.inputValue();
        if (locationNickNameValue !== '') {
            throw new Error(`Expected Location Nick Name to be cleared, but got '${locationNickNameValue}'`);
        }
        console.log('Location Nick Name field successfully cleared.');
    }

    // const RowCount = await locationUpdate.tableLocator.count();
    // console.log(`Number of rc: ${RowCount}`);

    //   // Get td values from a specific row (e.g., the first row)
    //   const tdValues = await locationUpdate.getTdValuesFromRow(0); // Replace 0 with the desired row index
    //   console.log('TD values:', tdValues);

    //   // Select and click on a specific row (e.g., the first row)
    //   await locationUpdate.selectRow(0);


}

module.exports = { LocationUpdate } 