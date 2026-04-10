const {By, Builder, Browser, until} = require('selenium-webdriver');
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

    await driver.sleep(2000)

    // click Purchase App
    const purchaseBtn = await driver.wait(
        until.elementLocated(By.id('result_app_6')),
        10000
    );

    await driver.wait(until.elementIsVisible(purchaseBtn), 5000);
    await purchaseBtn.click();
    console.log("Purchase button clicked");

    await driver.sleep(2000)

    // click New Purchase Button
    const newReqOfQuotBtn = await driver.wait(
        until.elementLocated(By.css('button.o_list_button_add')),
        10000
    );

    await driver.wait(until.elementIsVisible(newReqOfQuotBtn), 5000);
    await newReqOfQuotBtn.click();
    console.log("New Request of Quotation button is clicked");

    await driver.sleep(2000)

    // create new partner
    const partnerInput = await driver.wait(
        until.elementLocated(By.id('partner_id_0')), 
        12000);

    await driver.wait(until.elementIsVisible(partnerInput), 5000);

    //type partner name and clear (if needed) and send keys
    await partnerInput.clear();
    await partnerInput.sendKeys("Johnson & Johnson");

    // optionally verify value
    const partnerValue = await partnerInput.getAttribute("value");
    console.log("partner entered:", partnerValue);

    await driver.sleep(2000)

    const crtPartner = await driver.wait(
        until.elementLocated(By.id('partner_id_0_0_0')), 
        5000);

    await driver.wait(until.elementIsVisible(crtPartner), 5000);
    await crtPartner.click();

    await driver.sleep(2000)

    // click Order Date Picker
    const orderDate = await driver.wait(
        until.elementLocated(By.id('date_order_0')), 
        5000);

    await driver.wait(until.elementIsVisible(orderDate), 5000);
    await orderDate.click();

    /* wait calendar popup
    await driver.wait(
        until.elementLocated(By.css(".bootstrap-datetimepicker-widget")),
        10000
    );

    click day 27 (example)
    let day = await driver.findElement(
        By.xpath("//td[not(contains(@class,'old')) and text()='27']")
    );
    await day.click(); */

    console.log('Date Picker is clicked');
    await driver.sleep(2000)

    // Click Add product link
    const addProduct = driver.wait(
        until.elementLocated(By.linkText('Add a product')), 
        2000);

    await driver.wait(until.elementIsVisible(addProduct), 3000)
    await addProduct.click();
    console.log("Add a product link clicked");

    await driver.sleep(3000)

    // Search product
    const searchProduct = await driver.wait(
        until.elementLocated(By.css('input[placeholder="Search a product"]')), 
        5000);

    await driver.wait(until.elementIsVisible(searchProduct), 5000);

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
        5000))

    await driver.wait(until.elementIsVisible(clickProductSearch), 5000);
    await clickProductSearch.click();

    await driver.sleep(2000)

    // click quantity
    const addQuantity = await driver.wait(
        until.elementLocated(By.name('product_qty'), 
    5000))

    await driver.wait(until.elementIsVisible(addQuantity), 5000);
    await addQuantity.click();

     // Wait for the input to appear inside the cell
       const input = await driver.wait(
         until.elementLocated(By.xpath("//td[@name='product_qty']//input")),
         10000
       );
   
       // Clear existing value and set to 2
       await input.sendKeys(Key.chord(Key.CONTROL, 'a')); // select all
       await input.sendKeys(Key.BACK_SPACE);              // clear
       await input.sendKeys('2');
       await input.sendKeys(Key.ENTER);                   // save

    // optionally verify value
    const quantityValue = await addQuantity.getAttribute("value");
    console.log("quantity entered:", quantityValue);


    await driver.sleep(2000)

    // Confirm Purchase
    const confirmPurchaseBtn = await driver.wait(
        until.elementLocated(By.id('draft_confirm')),
        10000
    );

    await driver.wait(until.elementIsVisible(confirmPurchaseBtn), 5000);
    await confirmPurchaseBtn.click();
     console.log("Confirm Purchase button clicked");

    await driver.sleep(5000)


    } catch(err) {
    console.error("test failed:", err);
    } finally {
    await driver.quit();

    }
}
main()