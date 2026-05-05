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
      By.xpath("//a[contains(@href,'uat_plan_b_review')]")
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
    await usernameInput.sendKeys("odoo.dev2@reach52.com");

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

      // click Inventory App
    const invBtn = await driver.wait(
        until.elementLocated(By.id('result_app_6')),
        8000);

    await driver.wait(until.elementIsVisible(invBtn), 4000);
    await invBtn.click();
    console.log("Inventory button clicked");

    await driver.sleep(2000)

    // Click Product menu
    const orderbtn = await driver.wait(
        until.elementLocated(By.css('button[data-menu-xmlid="stock.menu_stock_inventory_control"]')),
        8000);

    await driver.wait(until.elementIsVisible(orderbtn), 4000);
    await orderbtn.click();
    console.log("Order menu is clicked");

    await driver.sleep(2000)

     // Product 
    const productMenu = await driver.wait(
        until.elementLocated(By.css('a[data-menu-xmlid="stock.menu_product_variant_config_stock"]')),
        8000);

    await driver.wait(until.elementIsVisible(productMenu), 4000);

    //  Step 3: Click using JavaScript (most reliable in Odoo)
    await driver.executeScript("arguments[0].click();", productMenu);
    console.log("Product menu is clicked")

    await driver.sleep(4000)

    // new product button
    const newProduct = await driver.wait(
        until.elementLocated(By.css('button.btn.btn-primary')), 
        4000);

    await driver.wait(until.elementIsVisible(newProduct), 4000);
    await newProduct.click();
    console.log("New product button clicked");

    // Add product name
    const productName = await driver.wait(
        until.elementLocated(By.id('name_0')), 
        4000);

    await driver.wait(until.elementIsVisible(productName), 3000)

    // clear (if needed) and send keys for Product Name
    await productName.clear();
    await productName.sendKeys("Gutzorb")
    await driver.sleep(4000)
    await productName.sendKeys(Key.ENTER)

    // optionally verify value
    const productValue = await productName.getAttribute("value");
    console.log("Name of product entered:", productValue);

    // add PTS
    const price = await driver.wait(
        until.elementLocated(By.id('list_price_0')), 
        4000);

    await driver.wait(until.elementIsVisible(price), 3000)

    // clear (if needed) and send keys for PTS
    await price.clear();
    await price.sendKeys("1000")
    await driver.sleep(3000)
    await price.sendKeys(Key.ENTER)

    // optionally verify value
    const priceValue = await price.getAttribute("value");
    console.log("PTS entered:", priceValue);

    await driver.sleep(3000)

    // Add cost
    const costProduct = await driver.wait(
        until.elementLocated(By.id('standard_price_0')), 
        3000);

    await driver.wait(until.elementIsVisible(costProduct), 3000)

    // clear (if needed) and send keys for Cost Product
    await costProduct.clear();
    await costProduct.sendKeys("750")
    await driver.sleep(3000)
    await costProduct.sendKeys(Key.ENTER)

    // optionally verify value
    const costValue = await costProduct.getAttribute("value");
    console.log("PTS entered:", costValue);

    await driver.sleep(3000)

    // Add Category
    const categoryProd = await driver.wait(
        until.elementLocated(By.id('categ_id_0')), 
        3000);

    await driver.wait(until.elementIsVisible(categoryProd), 3000)
    await categoryProd.click();
    console.log("Product Category is clicked");

    // Select a Product Category
    console.log("PTS entered:", costValue);

    await driver.sleep(3000)

    // Add Category
    const searchCatProd = await driver.wait(
        until.elementLocated(By.id('categ_id_0_0_3')), 
        3000);

    await driver.wait(until.elementIsVisible(searchCatProd), 3000)
    await searchCatProd.click();
    console.log("Selected 'Search' for product category");

    await driver.sleep(3000)

    // Add New Product Category
    const newCatProd = await driver.wait(
        until.elementLocated(By.css('button.o_create_button')), 
        5000);

    await driver.wait(until.elementIsVisible(newCatProd), 3000)
    await newCatProd.click();
    console.log("Click New for product category")

    await driver.sleep(3000)

    // Add Category Name
     const categoryName = await driver.wait(
        until.elementLocated(By.id('name_0')), 
        4000);

    await driver.wait(until.elementIsVisible(productName), 3000)

    // clear (if needed) and send keys for Category Name
    await categoryName.clear();
    await categoryName.sendKeys("Pharmaceuticals")
    await driver.sleep(4000)
    await categoryName.sendKeys(Key.ENTER)

    await driver.sleep(3000)

    // Click Removal Strategy
    const clickRemStrat = await driver.wait(
        until.elementLocated(By.id('removal_strategy_id_0')), 
        4000);

    await driver.wait(until.elementIsVisible(clickRemStrat), 3000)

    // Select Removal Strategy
    const selectRemStrat = await driver.wait(
        until.elementLocated(By.id('removal_strategy_id_0_0_0')), 
        3000);

    await driver.wait(until.elementIsVisible(selectRemStrat), 3000)
    await selectRemStrat.click();
    console.log("Selected 'Removal Strategy for a product category");

    await driver.sleep(3000)

    // Save Category
    const saveCategory = await driver.wait(
        until.elementLocated(By.css('button.o_form_button_save')), 
        5000);

    await driver.wait(until.elementIsVisible(saveCategory), 3000)
    await saveCategory.click();
    console.log("Save product category")

    await driver.sleep(3000)

    // Add product reference
     const prodRef = await driver.wait(
        until.elementLocated(By.id('default_code_0')), 
        3000);

    await driver.wait(until.elementIsVisible(prodRef), 3000)

    // clear (if needed) and send keys for Product Reference
    await prodRef.clear();
    await prodRef.sendKeys("GUTZORB-001")
    await driver.sleep(3000)
    await prodRef.sendKeys(Key.ENTER)

    await driver.sleep(3000)
    

    } catch(err) {
    console.error("test failed:", err);
    } finally {
    await driver.quit();

    }

    }

main()