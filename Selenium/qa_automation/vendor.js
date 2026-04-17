const {By, Builder, Browser, until, Key, Button} = require('selenium-webdriver');
const { elementLocated, elementIsVisible } = require('selenium-webdriver/lib/until');

const main = async () => {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    
    try{
    await driver.get('https://www.odoo.com/web/login');

    const title = await driver.getTitle()
    console.log('page title', title)

    //wait for the username field to be present and visible
    const usernameInput = await driver.wait(
        until.elementLocated(By.id("login")), 
        15000);

    await driver.wait(until.elementIsVisible(usernameInput), 5000);

    // clear (if needed) and send keys
    await usernameInput.clear();
    await usernameInput.sendKeys("shinodashana@gmail.com");

    // optionally verify value
    const value = await usernameInput.getAttribute("value");
    console.log("username entered:", value);

    // wait for the username field to be present and visible
    const passwordInput = await driver.wait(
        until.elementLocated(By.id('password')),
        15000);

    await driver.wait(until.elementIsVisible(passwordInput), 5000);

    // clear (if needed) and send keys
    await passwordInput.clear();
    await passwordInput.sendKeys("Animeako45.");

    // optionally verify value
    const pwdValue = await passwordInput.getAttribute("value");
    console.log("Password entered:", pwdValue);

    
    // 🔹 3. Handle Cloudflare CAPTCHA (manual step)
    console.log("👉 Please solve CAPTCHA manually...");
    await driver.sleep(20000); // give time to click "Verify you are human"

    // 🔹 4. Wait until Sign In button is enabled
    const signInBtn = await driver.findElement(
      By.xpath("//button[normalize-space()='Sign in']")
    );

    await driver.wait(async () => {
    const classes = await signInBtn.getAttribute('class');
      return !classes.includes('disabled') &&
             !classes.includes('cf_form_disabled');
    }, 30000);

    // 🔹 5. Scroll + Click
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      signInBtn
    );

    await signInBtn.click();

    // 🔹 6. Wait for successful login (example: dashboard)
    await driver.wait(until.urlContains('/web'), 15000);

    console.log("✅ Login successful");



     } catch(err) {
    console.error("test failed:", err);
    } finally {
    await driver.quit();

    }
}

main()