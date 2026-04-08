
const {By, Builder, Browser, until, Button} = require('selenium-webdriver');
const { elementLocated, elementIsVisible } = require('selenium-webdriver/lib/until');

const main = async () => {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    
    try{
    await driver.get('https://reach52-test.odoo.com/odoo');

    const title = await driver.getTitle()
    console.log('page title', title)

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
        15000
    );

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
        10000
    );

    await driver.wait(until.elementIsVisible(loginBtn), 5000);
    await loginBtn.click();
    console.log("Login button clicked");

    await driver.sleep(2000);

    // click Purchase App
    const purchaseBtn = await driver.wait(
        until.elementLocated(By.id('result_app_6')),
        10000
    );

    await driver.wait(until.elementIsVisible(purchaseBtn), 5000);
    await purchaseBtn.click();
    console.log("Purchase button clicked");

    await driver.sleep(2000)

    // Click Order menu
    const orderbtn = await driver.wait(
        until.elementLocated(By.css('button[data-menu-xmlid="purchase.menu_procurement_management"]')),
        10000
    )

    await driver.wait(until.elementIsVisible(orderbtn), 5000);
    await orderbtn.click();
    console.log("Order menu is clicked");

    await driver.sleep(2000)

    // Purhase Order
    const purchaseorder = await driver.wait(
        until.elementLocated(By.css('a[data-menu-xmlid="purchase.menu_purchase_form_action"]')),
        10000
    )

    await driver.wait(until.elementIsVisible(purchaseorder), 5000);

    //  Step 3: Click using JavaScript (most reliable in Odoo)
    await driver.executeScript("arguments[0].click();", purchaseorder);
    console.log("Purchase Order menu is clicked")

    await driver.sleep(5000)

    // new Purchase button
    const newPurcBtn = await driver.wait(
        until.elementLocated(By.css('button.o_list_button_add')), 
        5000);

    await driver.wait(until.elementIsVisible(newPurcBtn), 5000);
    await newPurcBtn.click();
    console.log("New Purchase button clicked");

    await driver.sleep(5000)

    // Fill up the Purchase Form
    const addVendor = await driver.wait(
        until.elementLocated(By.id('partner_id_0')), 
        12000);

    await driver.wait(until.elementIsVisible(addVendor), 5000);

    //type vendor name and clear (if needed) and send keys
    await addVendor.clear();
    await addVendor.sendKeys("Collana Ona");

     // optionally verify vendor value
    const vendorValue = await addVendor.getAttribute("value");
    console.log("vendor entered:", vendorValue);

    await driver.sleep(3000)

    const crtVendor = await driver.wait(
        until.elementLocated(By.id('partner_id_0_0_0')), 
        5000);

    await driver.wait(until.elementIsVisible(crtVendor), 5000);
    await crtVendor.click();
    console.log('Vendor field is click and added');

    await driver.sleep(3000)

    // add vendor ref 
    const addVendorRef = await driver.wait(
        until.elementLocated(By.id('partner_ref_0')), 5000
    )

    await driver.wait(until.elementIsVisible(addVendorRef), 5000);

    //type vendor ref and clear (if needed) and send keys
    await addVendorRef.clear();
    await addVendorRef.sendKeys("SO00001");

    // optionally verify value
    const vendorRefValue = await addVendorRef.getAttribute("value");
    console.log("vendor ref entered:", vendorRefValue);

    await driver.sleep(3000)

    const crtVendorRef = await driver.wait(
        until.elementLocated(By.id('partner_ref_0')), 
        5000);

    await driver.wait(until.elementIsVisible(crtVendorRef), 5000);
    await crtVendorRef.click();
    console.log('Vendor Ref field is click and added');

    await driver.sleep(9000)

    const currency = await driver.wait(
        until.elementLocated(By.id('currency_id_0')), 3000);

    await driver.wait(until.elementIsVisible(currency), 5000);

    //to clear currency (if needed) and send keys
    await currency.clear();
    await currency.sendKeys("INR");

    // optionally verify value of currency
    const currValue = await currency.getAttribute("value");
    console.log("currency entered:", currValue);

    await driver.sleep(3000)

    } catch(err) {
    console.error("test failed:", err);
    } finally {
    await driver.quit();

    }
}

main()