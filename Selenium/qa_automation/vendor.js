const {By, Builder, Browser, until, Key, Button} = require('selenium-webdriver');
const { elementLocated, elementIsVisible } = require('selenium-webdriver/lib/until');

const main = async () => {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    
    try{
   await driver.get('https://odoo.uat.reach52.com/web/database/selector');

    // Shows page title and database
    const dblistpage = await driver.getTitle()
    console.log('database list page', dblistpage)

    await driver.sleep(4000);

   // Wait until correct page is loaded
    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes("database") || url.includes("db=");
    }, 15000);

    // Wait for DB list container
    await driver.wait(
      until.elementLocated(By.css(".list-group")),
      15000
    );

    // Debug: confirm links exist
    let links = await driver.findElements(By.css("a"));
    console.log("Links found:", links.length);

    // Click target DB
    let dbLink = await driver.findElement(
      By.xpath("//a[contains(@href,'dev18-demo')]")
    );

    await dbLink.click();
    await driver.sleep(2000);

    //wait for the username field to be present and visible
    const usernameInput = await driver.wait(
        until.elementLocated(By.id("login")), 
        15000);

    await driver.wait(until.elementIsVisible(usernameInput), 5000);

    // clear (if needed) and send keys
    await usernameInput.clear();
    await usernameInput.sendKeys("odoo.erp@reach52.com");

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
    await passwordInput.sendKeys("password-R52");

    // optionally verify value
    const pwdValue = await passwordInput.getAttribute("value");
    console.log("Password entered:", pwdValue);

    // wait for submit button
    const loginBtn = await driver.wait(
        until.elementLocated(By.css('button.btn.btn-primary')),
        8000);

    await driver.wait(until.elementIsVisible(loginBtn), 4000);
    await loginBtn.click();
    console.log("Login button clicked");

    await driver.sleep(2000);


     // click Purchase App
    const purchaseBtn = await driver.wait(
        until.elementLocated(By.id('result_app_5')),
        8000);

    await driver.wait(until.elementIsVisible(purchaseBtn), 4000);
    await purchaseBtn.click();
    console.log("Purchase button clicked");

    await driver.sleep(2000)

    // Click Order menu
    const orderbtn = await driver.wait(
        until.elementLocated(By.css('button[data-menu-xmlid="purchase.menu_procurement_management"]')),
        8000);

    await driver.wait(until.elementIsVisible(orderbtn), 4000);
    await orderbtn.click();
    console.log("Order menu is clicked");

    await driver.sleep(2000)

    // Purhase Order
    const vendor = await driver.wait(
        until.elementLocated(By.css('a[data-menu-xmlid="purchase.menu_procurement_management_supplier_name"]')),
        8000);

    await driver.wait(until.elementIsVisible(vendor), 4000);

    //  Step 3: Click using JavaScript (most reliable in Odoo)
    await driver.executeScript("arguments[0].click();", vendor);
    console.log("Purchase Order menu is clicked")

    await driver.sleep(4000)

    // new Vendor button
    const newVendor = await driver.wait(
        until.elementLocated(By.css('button.o_list_button_add')), 
        4000);

    await driver.wait(until.elementIsVisible(newVendor), 4000);
    await newVendor.click();
    console.log("New Vendor button clicked");

    await driver.sleep(4000)

    const vendorName = await driver.wait(
        until.elementLocated(By.css('input[placeholder="e.g. Lumber Inc"]')), 
        4000);

    await driver.wait(until.elementIsVisible(vendorName), 3000)

    // clear (if needed) and send keys in search product
    await vendorName.clear();
    await vendorName.sendKeys("MS GUPTA TEXTILES")
    await driver.sleep(4000)
    await vendorName.sendKeys(Key.ENTER)

    // optionally verify value
    const vendorValue = await vendorName.getAttribute("value");
    console.log("Name of vendor entered:", vendorValue);

    await driver.sleep(4000)

    // click random things
    const rngclick = await driver.wait(
        until.elementLocated(By.css('input[placeholder="Street..."]')), 
        4000);

    await driver.wait(until.elementIsVisible(rngclick), 3000)
    rngclick.click();
    console.log("Random field (Street) is clicked")

    await driver.sleep(4000)


     } catch(err) {
    console.error("test failed:", err);
    } finally {
    await driver.quit();

    }
}

main()