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
        until.elementLocated(By.id('result_app_6')),
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
    const purchaseorder = await driver.wait(
        until.elementLocated(By.css('a[data-menu-xmlid="purchase.menu_purchase_form_action"]')),
        8000);

    await driver.wait(until.elementIsVisible(purchaseorder), 4000);

    //  Step 3: Click using JavaScript (most reliable in Odoo)
    await driver.executeScript("arguments[0].click();", purchaseorder);
    console.log("Purchase Order menu is clicked")

    await driver.sleep(4000)

    // new Purchase button
    const newPurcBtn = await driver.wait(
        until.elementLocated(By.css('button.o_list_button_add')), 
        4000);

    await driver.wait(until.elementIsVisible(newPurcBtn), 4000);
    await newPurcBtn.click();
    console.log("New Purchase button clicked");

    await driver.sleep(4000)

     } catch(err) {
    console.error("test failed:", err);
    } finally {
    await driver.quit();

    }
}

main()