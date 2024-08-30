const e = require('express');

class EmployeTimesheet{
    constructor(page){
        this.page = page;
    }

    async generateOTP(employeeId, otp){
        const axios = require('axios');
        let data = JSON.stringify({
        "otpCodes": [
            {
            "employeeId": employeeId,
            "otp": otp
            }
        ]
        });

        let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: 'https://tpnew.tpsmartsol.com/workforce/api/v1/employees/employee/employeeCodes',
        headers: { 
            'accept': 'application/json, text/plain, */*', 
            'content-type': 'application/json', 
        },
        data : data
        };

        const response = await axios.request(config)
        return response.data
    }

    async navigateToTimeSheets() {
        // await this.page.getByRole('link', { name: ' Workforce ' }).click();
        await this.page.getByRole('link', { name: 'Timesheets' }).click();

    }


    async openTimeSheet(shiftName){
        await this.page.getByRole('row', { name: shiftName }).getByRole('button').click();
        // await this.page.pause();
    }

    
    async handleCheckIn() {
        await this.page.getByRole('button', { name: 'Check-In' }).click();

    }


    async handleCheckOut() {
        await this.page.getByRole('button', { name: 'Check-Out' }).click();

    }


    async fillOTPAndCheckInOut(otp){
        await this.page.locator('.ant-input').first().click();
        await this.page.locator('.ant-input').first().fill(otp[0]);
        await this.page.locator('div:nth-child(3) > .ant-input').fill(otp[1]);
        await this.page.locator('div:nth-child(4) > .ant-input').fill(otp[2]);
        await this.page.locator('div:nth-child(5) > .ant-input').fill(otp[3]);
        await this.page.locator('div:nth-child(6) > .ant-input').fill(otp[4]);
        await this.page.locator('div:nth-child(7) > .ant-input').fill(otp[5]);
        
        await this.page.locator("//button[normalize-space()='Cancel']").click();
        await this.page.locator("//button[normalize-space()='Cancel']").click();

        
    }

    generateSixDigitRandomNumber() {
        return Math.floor(100000 + Math.random() * 900000);
    }
      
    async getRowCheckInStatus(EMPID) {
       
        const rowLocator = this.page.locator('tr', { hasText: EMPID });    
        const statusText = await rowLocator.locator('td').nth(0);
        console.log(await statusText.textContent());
        return await statusText.textContent();

    }

      
}

module.exports = {EmployeTimesheet}