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

    // Shows page title and database
    const dblistpage = await driver.getTitle();
    console.log("database list page", dblistpage);

    await driver.sleep(4000);

    // Wait until correct page is loaded
    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes("database") || url.includes("db=");
    }, 15000);

    // Wait for DB list container
    await driver.wait(until.elementLocated(By.css(".list-group")), 15000);

    // Debug: confirm links exist
    let links = await driver.findElements(By.css("a"));
    console.log("Links found:", links.length);

    // Click target DB
    let dbLink = await driver.findElement(
      By.xpath("//a[contains(@href,'uat_plan_b_review')]"),
    );

    await dbLink.click();
    await driver.sleep(2000);

    //wait for the username field to be present and visible
    const usernameInput = await driver.wait(
      until.elementLocated(By.id("login")),
      15000,
    );

    await driver.wait(until.elementIsVisible(usernameInput), 5000);

    // clear (if needed) and send keys
    await usernameInput.clear();
    await usernameInput.sendKeys("odoo.dev2@reach52.com");

    // optionally verify value
    const value = await usernameInput.getAttribute("value");
    console.log("username entered:", value);

    // wait for the username field to be present and visible
    const passwordInput = await driver.wait(
      until.elementLocated(By.id("password")),
      15000,
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
      until.elementLocated(By.css("button.btn.btn-primary")),
      8000,
    );

    await driver.wait(until.elementIsVisible(loginBtn), 4000);
    await loginBtn.click();
    console.log("Login button clicked");

    await driver.sleep(2000);

    // click Inventory App
    const invBtn = await driver.wait(
      until.elementLocated(By.id("result_app_6")),
      8000,
    );

    await driver.wait(until.elementIsVisible(invBtn), 4000);
    await invBtn.click();
    console.log("Inventory button clicked");

    await driver.sleep(2000);

    // Click Product menu
    const orderbtn = await driver.wait(
      until.elementLocated(
        By.css('button[data-menu-xmlid="stock.menu_stock_inventory_control"]'),
      ),
      8000,
    );

    await driver.wait(until.elementIsVisible(orderbtn), 4000);
    await orderbtn.click();
    console.log("Order menu is clicked");

    await driver.sleep(2000);

    // Product
    const productMenu = await driver.wait(
      until.elementLocated(
        By.css('a[data-menu-xmlid="stock.menu_product_variant_config_stock"]'),
      ),
      8000,
    );

    await driver.wait(until.elementIsVisible(productMenu), 4000);

    //  Step 3: Click using JavaScript (most reliable in Odoo)
    await driver.executeScript("arguments[0].click();", productMenu);
    console.log("Product menu is clicked");

    await driver.sleep(4000);

    // new product button
    const newProduct = await driver.wait(
      until.elementLocated(By.css("button.btn.btn-primary")),
      4000,
    );

    await driver.wait(until.elementIsVisible(newProduct), 4000);
    await newProduct.click();
    console.log("New product button clicked");

    // Add product name
    const productName = await driver.wait(
      until.elementLocated(By.id("name_0")),
      4000,
    );

    await driver.wait(until.elementIsVisible(productName), 3000);

    // clear (if needed) and send keys for Product Name
    await productName.clear();
    await productName.sendKeys("Gutzorb");
    await driver.sleep(4000);
    await productName.sendKeys(Key.ENTER);

    // optionally verify value
    const productValue = await productName.getAttribute("value");
    console.log("Name of product entered:", productValue);

    // add PTS
    const price = await driver.wait(
      until.elementLocated(By.id("list_price_0")),
      4000,
    );

    await driver.wait(until.elementIsVisible(price), 3000);

    // clear (if needed) and send keys for PTS
    await price.clear();
    await price.sendKeys("1000");
    await driver.sleep(3000);
    await price.sendKeys(Key.ENTER);

    // optionally verify value
    const priceValue = await price.getAttribute("value");
    console.log("PTS entered:", priceValue);

    await driver.sleep(3000);

    // Add cost
    const costProduct = await driver.wait(
      until.elementLocated(By.id("standard_price_0")),
      3000,
    );

    await driver.wait(until.elementIsVisible(costProduct), 3000);

    // clear (if needed) and send keys for Cost Product
    await costProduct.clear();
    await costProduct.sendKeys("750");
    await driver.sleep(3000);
    await costProduct.sendKeys(Key.ENTER);

    // optionally verify value
    const costValue = await costProduct.getAttribute("value");
    console.log("Cost entered:", costValue);

    await driver.sleep(3000);

    // Add Category
    const categoryProd = await driver.wait(
      until.elementLocated(By.id("categ_id_0")),
      3000,
    );

    await driver.wait(until.elementIsVisible(categoryProd), 3000);
    await categoryProd.click();
    console.log("Product Category is clicked");

    // Select a Product Category
    console.log("Cost entered:", costValue);

    await driver.sleep(3000);

    // Add Category
    const searchCatProd = await driver.wait(
      until.elementLocated(By.id("categ_id_0_0_3")),
      3000,
    );

    await driver.wait(until.elementIsVisible(searchCatProd), 3000);
    await searchCatProd.click();
    console.log("Selected 'Search' for product category");

    await driver.sleep(3000);

    // Add New Product Category
    const newCatProd = await driver.wait(
      until.elementLocated(By.css("button.o_create_button")),
      5000,
    );

    await driver.wait(until.elementIsVisible(newCatProd), 3000);
    await newCatProd.click();
    console.log("Click New for product category");

    await driver.sleep(3000);

    // Add Category Name
    const categoryName = await driver.wait(
      until.elementLocated(By.id("name_0")),
      4000,
    );

    await driver.wait(until.elementIsVisible(productName), 3000);

    // clear (if needed) and send keys for Category Name
    await categoryName.clear();
    await categoryName.sendKeys("Pharmaceuticals");
    await driver.sleep(4000);
    await categoryName.sendKeys(Key.ENTER);

    await driver.sleep(4000);

    // Click Removal Strategy
    const clickRemStrat = await driver.wait(
      until.elementLocated(By.id("removal_strategy_id_0")),
      4000,
    );

    await driver.wait(until.elementIsVisible(clickRemStrat), 3000);
    await clickRemStrat.click();
    console.log("Click 'Removal Strategy dropdown");

    await driver.sleep(3000);

    // Select Removal Strategy
    const selectRemStrat = await driver.wait(
      until.elementLocated(By.id("removal_strategy_id_0_0_0")),
      4000,
    );

    await driver.wait(until.elementIsVisible(selectRemStrat), 3000);
    await selectRemStrat.click();
    console.log("Selected 'Removal Strategy for a product category");

    await driver.sleep(3000);

    // Save Category
    const saveCategory = await driver.wait(
      until.elementLocated(By.css("button.btn.btn-primary.o_form_button_save")),
      5000,
    );

    await driver.wait(until.elementIsVisible(saveCategory), 3000);
    await saveCategory.click();
    console.log("Save product category");

    await driver.sleep(3000);

    // Add product reference
    const prodRef = await driver.wait(
      until.elementLocated(By.id("default_code_0")),
      3000,
    );

    await driver.wait(until.elementIsVisible(prodRef), 3000);

    // clear (if needed) and send keys for Product Reference
    await prodRef.clear();
    await prodRef.sendKeys("GUTZORB-001");
    await driver.sleep(3000);
    await prodRef.sendKeys(Key.ENTER);

    await driver.sleep(3000);

    // Click Attributes and Variants
    const variantsTab = await driver.wait(
      until.elementLocated(By.css("a[name='variants']")),
      4000,
    );

    await driver.wait(until.elementIsVisible(variantsTab), 5000);
    variantsTab.click();
    console.log("Attributes and Variants Tab is clicked");

    await driver.sleep(3000);

    // Add new line for Attributes & Variants
    // Wait for the element to appear
    const addLineAtt = await driver.wait(
      until.elementLocated(By.xpath('//a[text()="Add a line"]')),
      10000,
    );

    await driver.wait(until.elementIsVisible(addLineAtt), 3000);
    addLineAtt.click();
    console.log("add line is clicked");

    await driver.sleep(3000);

    // enter size in the field
    const fieldAtt = await driver.wait(
      until.elementLocated(By.css("input.o-autocomplete--input.o_input")),
      8000,
    );

    // Click the field
    await fieldAtt.click();
    await fieldAtt.sendKeys("size");
    console.log("Attribute type successfully.");

    await driver.sleep(3000);

    // select Size as attribute
    const attSize = await driver.wait(
      until.elementLocated(By.id("autocomplete_0_0")),
      3000,
    );

    await driver.wait(until.elementIsVisible(attSize), 3000);
    attSize.click();
    console.log("Size is clicked for attribute");

    await driver.sleep(3000);

    // Wait until the autocomplete input is visible
    const addSize = await driver.wait(
      until.elementLocated(By.css('td[name="value_ids"]')),
      5000,
    );

    // Wait until interactable
    await driver.wait(until.elementIsVisible(addSize), 7000);
    await addSize.click();
    console.log("Attribute value is clicked");

    // Add value to attribute
    const attField = await driver.wait(
      until.elementLocated(
        By.xpath('(//input[contains(@class,"o-autocomplete--input")])[2]'),
      ),
      10000,
    );

    // Click and type text
    await attField.click();

    await driver.sleep(3000);
    await attField.sendKeys("60ml");
    await attField.sendKeys(Key.ENTER);

    // optionally verify value
    const sizeValue = await attField.getAttribute("value");
    console.log("quantity entered:", sizeValue);

    await driver.sleep(3000);

    // Click Sales Tab
    const salesTab = await driver.wait(
      until.elementLocated(By.css("a[name='sales']")),
      4000,
    );

    await driver.wait(until.elementIsVisible(salesTab), 5000);
    salesTab.click();
    console.log("Sales Tab is clicked");

    await driver.sleep(3000);

    // Add Quotation Description
    const quotDes = await driver.wait(
      until.elementLocated(By.css("input.o-autocomplete--input.o_input")),
      8000,
    );

    // Click the field
    await quotDes.click();
    await quotDes.sendKeys("Gitzob Diarrhea Relief Syrup 120ml");
    console.log("Quotation Description added successfully.");

    await driver.sleep(3000);

    // Click Price Tab
    const priceTab = await driver.wait(
      until.elementLocated(By.css("a[name='sales_price']")),
      4000,
    );

    await driver.wait(until.elementIsVisible(priceTab), 5000);
    priceTab.click();
    console.log("Price Tab is clicked");

    await driver.sleep(3000);

    // Click Purchase Tab
    const purchaseTab = await driver.wait(
      until.elementLocated(By.css("a[name='purchase']")),
      4000,
    );

    await driver.wait(until.elementIsVisible(purchaseTab), 5000);
    purchaseTab.click();
    console.log("Purchase Tab is clicked");

    await driver.sleep(3000);

    // Wait for the element to appear
    const addLinePur = await driver.wait(
      until.elementLocated(By.xpath('//a[text()="Add a line"]')),
      10000,
    );

    await driver.wait(until.elementIsVisible(addLinePur), 3000);
    addLinePur.click();
    console.log("add line for Purchase is clicked");

    await driver.sleep(3000);

    // enter vendor name in the field
    const typeVendor = await driver.wait(
      until.elementLocated(By.css("input.o-autocomplete--input.o_input")),
      8000,
    );

    // Click the field
    await typeVendor.click();
    await typeVendor.sendKeys("Gupta");
    console.log("Vendor typed");

    await driver.sleep(3000);

    // select Size as attribute
    const selectVendor = await driver.wait(
      until.elementLocated(By.id("autocomplete_0_1")),
      3000,
    );

    await driver.wait(until.elementIsVisible(selectVendor), 3000);
    selectVendor.click();
    console.log("selected a Vendor");

    await driver.sleep(3000);

    // Click Quantity for Purchase Tab
    const addQtyPur = await driver.wait(
      until.elementLocated(By.name("min_qty"), 4000),
    );

    await driver.wait(until.elementIsVisible(addQtyPur), 4000);
    await addQtyPur.click();

    // Wait for the input to appear inside the cell
    const addQtyPurInp = await driver.wait(
      until.elementLocated(By.xpath("//td[@name='min_qty']//input")),
      8000,
    );

    // Clear existing value and set to 100
    await addQtyPurInp.sendKeys(Key.chord(Key.CONTROL, "a")); // select all
    await addQtyPurInp.sendKeys(Key.BACK_SPACE); // clear
    await addQtyPurInp.sendKeys("100");
    await driver.sleep(3000);

    // optionally verify value
    const qtyValue = await addQtyPurInp.getAttribute("value");
    console.log("quantity entered:", qtyValue);

    await driver.sleep(5000);

    // Click Inventory Tab
    const inventoryTab = await driver.wait(
      until.elementLocated(By.css("a[name='inventory']")),
      4000,
    );

    await driver.wait(until.elementIsVisible(inventoryTab), 5000);
    inventoryTab.click();
    console.log("Inventory Tab is clicked");

    await driver.sleep(3000);

    // Click Accounting Tab
    const accTab = await driver.wait(
      until.elementLocated(By.css("a[name='invoicing']")),
      4000,
    );

    await driver.wait(until.elementIsVisible(accTab), 5000);
    accTab.click();
    console.log("Accounting Tab is clicked");

    await driver.sleep(3000);

    // Click General Information
    const genInfoTab = await driver.wait(
      until.elementLocated(By.css("a[name='general_information']")),
      4000,
    );

    await driver.wait(until.elementIsVisible(genInfoTab), 5000);
    genInfoTab.click();
    console.log("General Information Tab is clicked");

    await driver.sleep(3000);

    // save internal notes
    const paragraphDiv = await driver.wait(
      until.elementLocated(By.css("div.o-paragraph.o-we-hint[o-we-hint-text]")),
      10000,
    );

    // Example: click or send keys
    await paragraphDiv.click();
    await paragraphDiv.sendKeys("Hello");

    // Click Send Message button
    const sendMessage = await driver.wait(
      until.elementLocated(By.css("button.o-mail-Chatter-sendMessage")),
      4000,
    );

    await driver.wait(until.elementIsVisible(sendMessage), 4000);
    await sendMessage.click();
    console.log("Send button is clicked");

    /* Wait for popup input (DO NOT wait for visibility)
        const emailInput = await driver.wait(
        until.elementLocated(By.css("input[placeholder='e.g. mail@example.com']")),
        10000
        );

        // Force focus + type email
        await driver.executeScript(`
        arguments[0].focus();
        arguments[0].value = "test@example.com";
        arguments[0].dispatchEvent(new Event('input', { bubbles: true }));
        `, emailInput);
        await driver.sleep(5000);
        
        console.log("Email entered");  */

    // add message
    const addEmail = await driver.wait(
      until.elementLocated(By.css("textarea.o-mail-Composer-input")),
      4000,
    );

    await driver.wait(until.elementIsVisible(addEmail), 10000);
    await driver.wait(until.elementIsEnabled(addEmail), 10000);
    addEmail.click();

    // clear (if needed) and send keys in Send Message field
    await addEmail.clear();
    await addEmail.sendKeys("Priority note");
    await addEmail.sendKeys(Key.ENTER);
    await driver.sleep(3000);

    // optionally verify value
    const emailValue = await addEmail.getAttribute("value");
    console.log("Send message entered:", emailValue);

    // Click Send Message button
    const sendButton = await driver.wait(
      until.elementLocated(By.css("button.o-mail-Composer-send")),
      4000,
    );

    await driver.wait(until.elementIsVisible(sendButton), 4000);
    await sendButton.click();

    await driver.sleep(3000);

    // Click Log Button
    const logButton = await driver.wait(
      until.elementLocated(By.css("button.o-mail-Chatter-logNote")),
      4000,
    );

    await driver.wait(until.elementIsVisible(logButton), 7000);
    await logButton.click();
    console.log("Log is clicked");

    await driver.sleep(3000);

    const textarea = await driver.wait(
      until.elementLocated(
        By.css('textarea[placeholder^="Log an internal note"]'),
      ),
      15000,
    );

    await driver.wait(until.elementIsVisible(textarea), 10000);
    await driver.executeScript("arguments[0].scrollIntoView(true);", textarea);
    await textarea.click();
    await textarea.sendKeys("Hello");

    await driver.sleep(3000);

    // Click Activity button
    const actButton = await driver.wait(
      until.elementLocated(By.css("button.o-mail-Chatter-activity")),
      4000,
    );

    await driver.wait(until.elementIsVisible(actButton), 7000);
    await actButton.click();
    console.log("Activity button is clicked");

    await driver.sleep(5000);

    // CLick Save button
    const saveButton = await driver.wait(
      until.elementLocated(By.name("action_schedule_activities")),
      4000,
    );

    await driver.wait(until.elementIsVisible(saveButton), 7000);
    await saveButton.click();
    console.log("Save button is clicked");

    await driver.sleep(4000);
  } catch (err) {
    console.error("test failed:", err);
  } finally {
    await driver.quit();
  }
};

main();
