const { test, expect } = require("@playwright/test");
const { Authentication } = require("../pageObject/Authentication");
const { PurposeOfVisit } = require("../pageObject/PurposeOfVisitor");

test("test", async ({ page }) => {
  const auth = new Authentication(page);
  await auth.loginPage("harsha@tparamount.com", "password");

  const purpose = new PurposeOfVisit(page);
  await purpose.navigateToPurpose();

  const purposeName = "new";
  const purposeUpdated = `${purposeName}updated`;

  await purpose.createPurpose(purposeName);
  const rowCreateLocator = page.locator('tr', { hasText: purposeName });
  await expect(rowCreateLocator).toBeVisible();

  await page.waitForTimeout(2000);
  await purpose.updatePurpose(purposeName, purposeUpdated);
  const rowUpdateLocator = page.locator('tr', { hasText: purposeUpdated });
  await expect(rowUpdateLocator).toBeVisible();

  await page.waitForTimeout(2000);
  await purpose.deletePurpose(purposeUpdated);
  const rowDeleteLocator = page.locator('tr', { hasText: purposeUpdated });
  await expect(rowDeleteLocator).not.toBeVisible();


});
