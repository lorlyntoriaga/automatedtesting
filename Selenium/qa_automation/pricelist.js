const {
  By,
  Builder,
  Browser,
  until,
  Key,
  Button,
} = require("selenium-webdriver");
const {
  elementLocated,
  elementIsVisible,
} = require("selenium-webdriver/lib/until");

const main = async () => {
  const driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    await driver.get("https://odoo.uat.reach52.com/web/database/selector");

    // Maximize browser window
    driver.manage().window().maximize();
    await driver.sleep(2000);
    await driver.executeScript("window.scrollBy(0, 500);");
    await driver.sleep(3000);

    // Shows page title and database
    const dblistpage = await driver.getTitle();
    console.log("database list page", dblistpage);

    await driver.sleep(4000);

    // Wait until correct page is loaded
    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes("database") || url.includes("db=");
    }, 5000);

    // Wait for DB list container
    await driver.wait(until.elementLocated(By.css(".list-group")), 5000);

    // Debug: confirm links exist
    let links = await driver.findElements(By.css("a"));
    console.log("Links found:", links.length);

    // Click target DB
    let dbLink = await driver.findElement(
      By.xpath("//a[contains(@href,'review')]"),
    );

    await dbLink.click();
    await driver.sleep(2000);

    const usernameInput = await driver.wait(
      until.elementLocated(By.id("login")),
      5000,
    );

    await driver.wait(until.elementIsVisible(usernameInput), 5000);

    // clear (if needed) and send keys
    await usernameInput.clear();
    await usernameInput.sendKeys("odoo.dev1@reach52.com");

    // optionally verify value
    const value = await usernameInput.getAttribute("value");
    console.log("username entered:", value);

    // wait for the username field to be present and visible
    const passwordInput = await driver.wait(
      until.elementLocated(By.id("password")),
      15000,
    );

    await driver.wait(until.elementIsVisible(passwordInput), 4000);

    // clear (if needed) and send keys
    await passwordInput.clear();
    await passwordInput.sendKeys("password-R52");

    // optionally verify value
    const pwdValue = await passwordInput.getAttribute("value");
    console.log("Password entered:", pwdValue);

    // wait for submit button
    const loginBtn = await driver.wait(
      until.elementLocated(By.css("button.btn.btn-primary")),
      5000,
    );

    await driver.wait(until.elementIsVisible(loginBtn), 4000);
    await loginBtn.click();
    console.log("Login button clicked");

    await driver.sleep(3000);

    

      } catch (err) {
    console.error("test failed:", err);
  } finally {
    await driver.quit();
  }
};

main();
