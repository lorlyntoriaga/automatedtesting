
const {By, Builder, Browser, until, Key, Button} = require('selenium-webdriver');
const { elementLocated, elementIsVisible } = require('selenium-webdriver/lib/until');
const fs = require('fs');

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

    // Fill up the Purchase Form
    const addVendor = await driver.wait(
        until.elementLocated(By.id('partner_id_0')), 
        7000);

    await driver.wait(until.elementIsVisible(addVendor), 4000);

    //type vendor name and clear (if needed) and send keys
    await addVendor.clear();
    await addVendor.sendKeys("Collana Ona");

     // optionally verify vendor value
    const vendorValue = await addVendor.getAttribute("value");
    console.log("vendor entered:", vendorValue);

    await driver.sleep(4000)

    const crtVendor = await driver.wait(
        until.elementLocated(By.id('partner_id_0_0_0')), 
        4000);

    await driver.wait(until.elementIsVisible(crtVendor), 4000);
    await crtVendor.click();
    console.log('Vendor field is click and added');

    await driver.sleep(3000)

    // add vendor ref 
    const addVendorRef = await driver.wait(
        until.elementLocated(By.id('partner_ref_0')), 4000)

    await driver.wait(until.elementIsVisible(addVendorRef), 4000);

    //type vendor ref and clear (if needed) and send keys
    await addVendorRef.clear();
    await addVendorRef.sendKeys("SO00001");

    // optionally verify value
    const vendorRefValue = await addVendorRef.getAttribute("value");
    console.log("vendor ref entered:", vendorRefValue);

    await driver.sleep(3000)

    const crtVendorRef = await driver.wait(
        until.elementLocated(By.id('partner_ref_0')), 
        4000);

    await driver.wait(until.elementIsVisible(crtVendorRef), 4000);
    await crtVendorRef.click();
    console.log('Vendor Ref field is click and added');

    await driver.sleep(7000)

    const currency = await driver.wait(
        until.elementLocated(By.id('currency_id_0')), 
        5000);

    await driver.wait(until.elementIsVisible(currency), 4000);

    //to clear currency (if needed) and send keys
    await currency.clear();
    await currency.sendKeys("INR");

    // optionally verify value of currency
    const currValue = await currency.getAttribute("value");
    console.log("currency entered:", currValue);

    const selectCurrency = await driver.wait(
        until.elementLocated(By.id('currency_id_0_0_0')), 
        4000
    );

    await driver.wait(until.elementIsVisible(selectCurrency), 4000)
    await selectCurrency.click();
    console.log("INR is selected");

    await driver.sleep(3000)

    // enter zip PO Code 
    const zip = await driver.wait(
        until.elementLocated(By.id('x_studio_ziperp_code_0')), 
        4000);

    await driver.wait(until.elementIsVisible(zip), 4000);

    await zip.clear();
    await zip.sendKeys("PO00001");

     await driver.sleep(3000)

    const zipvalue = await zip.getAttribute("value");
    console.log("zip code entered", zipvalue);

    await driver.sleep(3000)

    // select a warehouse
    const delTo = await driver.wait(
        until.elementLocated(By.id('picking_type_id_0')), 
        4000);

    await driver.wait(until.elementIsVisible(delTo), 4000);

    await delTo.click();
    console.log("Deliver To field is clicked")

     await driver.sleep(3000)

    // select date for order deadling 
    const orderDeadline = await driver.wait(
        until.elementLocated(By.id('date_order_0')), 
        4000
    );

    await driver.wait(until.elementIsVisible(orderDeadline), 4000);
    await orderDeadline.click()
    console.log("order deadline date picker is clicked");

    await driver.sleep(3000)

     // 2. Select day 15
    const date15 = await driver.wait(
      until.elementLocated(
        By.xpath("//div[contains(@class,'o_date_item_cell') and .//div[text()='15']]")
      ),
      8000
    );

    await driver.wait(until.elementIsVisible(date15), 4000);
    await driver.wait(until.elementIsEnabled(date15), 4000);

    await date15.click();
    console.log('Select date 15')

   
    /* select expected arrival date picker
     const expectedArr = await driver.wait(
        until.elementLocated(By.id('date_planned_0')), 5000
    );

    await driver.wait(until.elementIsVisible(expectedArr), 5000);
    await expectedArr.click();
    console.log("Expected Arrival date picker is clicked"); */

    
     // Click Add product link
    const addProduct = driver.wait(
        until.elementLocated(By.linkText('Add a product')), 
        3000);

    await driver.wait(until.elementIsVisible(addProduct), 3000)
    await addProduct.click();
    console.log("Add a product link clicked");

    await driver.sleep(3000)

    // Search product
    const searchProduct = await driver.wait(
        until.elementLocated(By.css('input[placeholder="Search a product"]')), 
        4000);

    await driver.wait(until.elementIsVisible(searchProduct), 4000);

    // clear (if needed) and send keys in search product
    await searchProduct.clear();
    await searchProduct.sendKeys("Paracetamol")

    // optionally verify value
    const productValue = await searchProduct.getAttribute("value");
    console.log("product entered:", productValue);

    await driver.sleep(3000)

    // Select searched product
    const clickProductSearch = await driver.wait(
        until.elementLocated(By.id('autocomplete_0_0'), 
        4000))

    await driver.wait(until.elementIsVisible(clickProductSearch), 4000);
    await clickProductSearch.click();

    await driver.sleep(2000)

    // click quantity
    const addQuantity = await driver.wait(
        until.elementLocated(By.name('product_qty'), 
    4000))

    await driver.wait(until.elementIsVisible(addQuantity), 4000);
    await addQuantity.click();

    // Wait for the input to appear inside the cell
    const input = await driver.wait(
      until.elementLocated(By.xpath("//td[@name='product_qty']//input")),
      8000
    );

    // Clear existing value and set to 2
    await input.sendKeys(Key.chord(Key.CONTROL, 'a')); // select all
    await input.sendKeys(Key.BACK_SPACE);              // clear
    await input.sendKeys('2');
    await input.sendKeys(Key.ENTER);                   // save

    // optionally verify value
    const quantityValue = await addQuantity.getAttribute("value");
    console.log("quantity entered:", quantityValue);

    await driver.sleep(4000)

    // Go to Other Information Tab
    const otherInfo = await driver.wait(
        until.elementLocated(By.xpath("//a[@name='purchase_delivery_invoice']")),
         4000
    );

    await driver.wait(until.elementIsVisible(otherInfo), 3000);
    await otherInfo.click();
    console.log("Other Information Tab is clicked");

    await driver.sleep(3000)

     // Go to Product Tab
    const productTab = await driver.wait(
        until.elementLocated(By.xpath("//a[@name='products']")),
         4000
    );

    await driver.wait(until.elementIsVisible(productTab), 3000);
    await productTab.click();
    console.log("Product Tab is clicked");

    await driver.sleep(3000)

    // Click Send Message button
    const sendMessage = await driver.wait(
        until.elementLocated(By.css('button.o-mail-Chatter-sendMessage')),
        4000
    ); 

    await driver.wait(until.elementIsVisible(sendMessage), 4000);
    await sendMessage.click();
    console.log("Send button is clicked")

    await driver.sleep(2000);

     // Wait for popup input (DO NOT wait for visibility)
    let emailInput = await driver.wait(
      until.elementLocated(By.css("input[placeholder='e.g. mail@example.com']")),
      10000
    );

    // Force focus + type email
    await driver.executeScript(`
      arguments[0].focus();
      arguments[0].value = "test@example.com";
      arguments[0].dispatchEvent(new Event('input', { bubbles: true }));
    `, emailInput);

    console.log("Email entered");

    // Click "Set Email" button
    const setEmailBtn = await driver.wait(
      until.elementLocated(By.xpath("//button[normalize-space()='Set Email']")),
      5000
    );

    // Use JS click (popup overlays can block normal click)
    await driver.executeScript("arguments[0].click();", setEmailBtn);

    console.log("Set Email button clicked");

    /* Click Send Message button
    const typeMessage = await driver.wait(
        until.elementLocated(By.css('button.o-mail-Chatter-sendMessage')),
        4000
    ); 

    await driver.wait(until.elementIsVisible(typeMessage), 4000);
    await typeMessage.click();
    await typeMessage.sendKeys('Hello Collana');

    // get the value of added message
    const typeMessageValue = await typeMessage.getAttribute('value');
    console.log('message entered', typeMessageValue) 

    await driver.sleep(2000); */


    } catch(err) {
    console.error("test failed:", err);
    } finally {
    await driver.quit();

    }
}

main()