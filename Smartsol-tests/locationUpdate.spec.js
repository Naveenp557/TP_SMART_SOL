const { test, expert, expect } = require('@playwright/test');

//POM Class
const { Authentication } = require('../pageObject/Authentication');
const { LocationUpdate } = require('../pageObject/LocationUpdate');

test(`location update from master settings`, async ({ page }) => {

    const auth = new Authentication(page);
    const locationUpdate = new LocationUpdate(page);

    //Calling login function
    await auth.loginPage('harsha@tparamount.com', 'password');

    // //Adding location
    await locationUpdate.profileIcon.click();
    await locationUpdate.settings.click();
    await locationUpdate.location.click();
    await locationUpdate.addLocationName.fill('Mehdipatnam');
    await locationUpdate.locationNickName.fill('MHD');
    await locationUpdate.addressline.fill('Near to entrance city');
    await locationUpdate.city.fill('Hyderabad');
    await locationUpdate.state.fill('Telangana');
    await locationUpdate.country.fill('India');
    await locationUpdate.pincode.fill('500005');
    await locationUpdate.submit.click();

    //Update Location
});
