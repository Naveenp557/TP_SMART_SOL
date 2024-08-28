class Authentication {
  constructor(page) {
    this.page = page;
  }

  //Reusable function for login page
  async loginPage(email, password) {
    //Launch URL

    await this.page.goto("https://tpnew.tpsmartsol.com/");

    //navigate to login page
    await this.page.fill('//input[@type="email"]', email);
    await this.page.fill('//input[@type="password"]', password);
    await this.page.click('//button[@type="submit"]');
  }
}

module.exports = { Authentication };
