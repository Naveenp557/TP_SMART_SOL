class Notifications {

    constructor(page) {

        this.notificationsoption = page.locator("//span[normalize-space()='Notifications' and @class = 'noti-dot']");
        this.employeeCreate = page.getByRole('table').locator('div').nth(1);
        this.employeeEdit = page.locator("(//div[@class = 'ant-select-selector'])[5]");
        this.employeeDelete = page.locator("(//div[@class = 'ant-select-selector'])[8]");
        this.employeeApproval = page.locator("tr:nth-child(4) > td:nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-overflow");
        this.leaveCreate = page.locator("(//div[@class = 'ant-select-selector'])[14]");
        this.leaveEdit = page.locator("(//div[@class = 'ant-select-selector'])[17]");
        this.leaveDelete = page.locator("(//div[@class = 'ant-select-selector'])[20]");
        this.leaveApproval = page.locator("(//div[@class = 'ant-select-selector'])[23]");
        this.backHome = page.locator("//span[text() = 'Back to Home ']");
        this.leaveslink = page.locator("//span[contains(text(), 'Leaves')]");
        this.leavebutton = page.locator("//button[normalize-space()='Leave']");
        this.employeeID = page.locator("//input[@placeholder='Choose an Employee Id']");
        this.leavereason = page.locator("//textarea[@name = 'leaveReason']");
        this.leavesubmit = page.locator("//button[normalize-space()='Submit']");
        this.notificationsicon = page.locator("//i[@style='margin-right: 18px;']");
        this.spanLocator = page.locator('(//span[contains(text(), "Employee Venu Shetty\'s new leave request is pending approval")])[1]');
        this.employeeLink = page.locator("//a[@href='/home/workforce/employee']");
        this.employeeButton = page.locator("//button[normalize-space()='Employee']");
        this.employeeFName = page.locator("//input[@placeholder='First Name']");
        this.employeeLname = page.locator("//input[@placeholder='Last Name']");
        this.employeeSaveandContinue = page.locator("//button[normalize-space()='Save & Continue']");
        this.phoneno = page.locator("(//input[@class= 'form-control ' and @type = 'tel'])[1]");
        this.email = page.locator("//input[@aria-label='email']");
        this.addressline1 = page.locator("//input[@name='addressLineOne']");
        this.city = page.locator("//input[@aria-label='city']");
        this.state = page.locator("//input[@aria-label='state']");
        this.pincode = page.locator("//input[@aria-label='pincode']");
        this.emergencyConatctName = page.locator("//input[@aria-label='emergencyContactName']");
        this.emergencyEmergencyConatctNo = page.locator("(//input[@class= 'form-control ' and @type = 'tel'])[2]");
        this.employeeDoB = page.locator("//input[@type='date']");
        this.employeeExpYears = page.locator("(//input[@placeholder='0 0'])[1]");
        this.employeeExpMonths = page.locator("(//input[@placeholder='0 0'])[2]");
        this.leaveapproval = page.locator("(//tr[@class = 'ant-table-row ant-table-row-level-0']//td)[1]");

    }

    async checkAndSelectValue(page, textContentWithBlank, setLocator) {
        if (textContentWithBlank.includes('Harsha')) {
            console.log('It contains Harsha');
        } else {
            console.log('Harsha not found, performing actions to select Harsha...');

            // Click to open the dropdown
            if (setLocator == 'EmployeeCreate') {
                this.employeeCreate.click();
            }
            else if (setLocator == 'EmployeeEdit') {
                this.employeeEdit.click();
            }
            else if (setLocator == 'EmployeeDelete') {
                this.employeeDelete.click();
            }
            else if (setLocator == 'EmployeeApproval') {
                this.employeeApproval.click();
            }
            else if (setLocator == 'LeaveCreate') {
                this.leaveCreate.click();
            }
            else if (setLocator == 'LeaveEdit') {
                this.leaveEdit.click();
            }
            else if (setLocator == 'LeaveDelete') {
                this.leaveDelete.click();
            }
            else if (setLocator == 'LeaveApproval') {
                this.leaveApproval.click();
            }
            await page.waitForTimeout(1000);
            // Navigate through dropdown options
            for (let i = 0; i < 10; i++) {
                await page.keyboard.press('ArrowDown');
            }

            // Handle multiple elements with the same title
            const allOptions = page.locator('div.ant-select-item-option[title="Harsha Reddy"]');

            // Iterate over the options to find one that is not selected
            let OptionToClick;
            const optionCount = await allOptions.count();

            for (let i = 0; i < optionCount; i++) {
                const option = allOptions.nth(i);
                const isSelected = await option.getAttribute('aria-selected') === 'true';
                if (!isSelected) {
                    OptionToClick = option;
                    break;
                }
            }

            if (OptionToClick) {
                // Click on the non-selected element
                await OptionToClick.click();
                console.log('Clicked on the option with title "Harsha Reddy".');
            } else {
                console.log('No unselected element with title "Harsha Reddy" found.');
            }
            await page.getByRole('button', { name: 'Save Changes' }).click();

        }
    }

    /**
 * Calculates a future date based on the number of days from today.
 * @param {number} daysInFuture - Number of days to add to the current date.
 * @returns {string} - The future date in YYYY-MM-DD format.
 */
    async getFutureDate(daysInFuture) {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + daysInFuture);
        return futureDate.toISOString().split('T')[0];
    }

    /**
 * Generates a random string of specified length.
 * @param {number} length - Length of the random string.
 * @returns {string} - The generated random string.
 */
    async generateRandomText(length) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomText = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            randomText += charset[randomIndex];
        }
        return randomText;
    }

    /**
 * Generates a random ten-digit number as a string.
 * @returns {string} A random ten-digit number.
 */
    async generateRandomTenDigitNumber() {
        return Math.floor(1000000000 + Math.random() * 9000000000).toString();
    }

}

module.exports = { Notifications } 