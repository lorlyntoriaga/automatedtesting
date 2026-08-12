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

    // click Inventory App
    const invBtn = await driver.wait(
      until.elementLocated(By.id("result_app_6")),
      8000,
    );

    await driver.wait(until.elementIsVisible(invBtn), 4000);
    await invBtn.click();
    console.log("Inventory app clicked");

    await driver.sleep(2000);

    // Click Operations menu
    const operationMenu = await driver.wait(
      until.elementLocated(
        By.css('button[data-menu-xmlid="stock.menu_stock_warehouse_mgmt"]'),
      ),
      8000,
    );

    await driver.wait(until.elementIsVisible(operationMenu), 4000);
    await operationMenu.click();
    console.log("Operations menu is clicked");

    await driver.sleep(2000);

    // Sales
    const productMenu = await driver.wait(
      until.elementLocated(By.css('a[data-menu-xmlid="stock.out_picking"]')),
      8000,
    );

    await driver.wait(until.elementIsVisible(productMenu), 4000);

    //  Step 3: Click using JavaScript (most reliable in Odoo)
    await driver.executeScript("arguments[0].click();", productMenu);
    console.log("Deliveries is clicked");

    await driver.sleep(4000);

    const removeBtn = await driver.findElement(
      By.xpath("//button[contains(@class,'o_facet_remove')]"),
    );

    await removeBtn.click();
    await driver.sleep(4000);

    // New Deliveries
    const newDel = await driver.wait(
      until.elementLocated(By.css("button.btn.btn-primary")),
      4000,
    );

    await driver.wait(until.elementIsVisible(newDel), 4000);
    await newDel.click();
    console.log("New Delivery clicked");

    await driver.sleep(3000);

    // Add contact
    const contactDel = await driver.wait(
      until.elementLocated(By.id("partner_id_0")),
      4000,
    );

    await driver.wait(until.elementIsVisible(contactDel), 4000);
    contactDel.click();
    await driver.sleep(3000);

    // Select contact in the dropdown
    const selectContact = await driver.wait(
      until.elementLocated(By.id("partner_id_0_0_0")),
      4000,
    );

    await driver.wait(until.elementIsVisible(selectContact), 4000);
    selectContact.click();
    await driver.sleep(3000);
    console.log("Contact is selected");

    //Add Operation Type
    const operType = await driver.wait(
      until.elementLocated(By.id("picking_type_id_0")),
      4000,
    );

    await driver.wait(until.elementIsVisible(operType), 4000);
    operType.click();
    await driver.sleep(3000);

    // Select operation type in the dropdown
    const selectOperType = await driver.wait(
      until.elementLocated(By.id("picking_type_id_0_0_0")),
      4000,
    );

    await driver.wait(until.elementIsVisible(selectOperType), 4000);
    selectOperType.click();
    await driver.sleep(7000);
    console.log("Operation Type is selected");

    /* Add Source Location
     const sourceLoc = await driver.wait(
      until.elementLocated(By.id("location_id_0")), 4000
    )

    await driver.wait(until.elementIsVisible(sourceLoc), 4000)
    sourceLoc.click()
    await driver.sleep(3000);

    // Select operation type in the dropdown
    const selectSource = await driver.wait(
      until.elementLocated(By.id('location_id_0_0_2')), 4000
    )

    await driver.wait(until.elementIsVisible(selectSource), 4000)
    selectSource.click()
    await driver.sleep(3000);
    console.log("Source Location is selected");

    // Add Destination Location
    const desLoc = await driver.wait(
      until.elementLocated(By.id("location_dest_id_0")), 4000
    )

    await driver.wait(until.elementIsVisible(desLoc), 4000)
    desLoc.click()
    await driver.sleep(3000);

    // Select operation type in the dropdown
    const selectDes = await driver.wait(
      until.elementLocated(By.id('location_dest_id_0_0_0')), 4000
    )

    await driver.wait(until.elementIsVisible(selectDes), 4000)
    selectDes.click()
    await driver.sleep(3000);
    console.log("Destined Location is selected"); */

    // Scheduled Date
    const scheduleDate = await driver.wait(
      until.elementLocated(By.id("scheduled_date_0")),
      4000,
    );

    await driver.wait(until.elementIsVisible(scheduleDate), 4000);
    await scheduleDate.click();
    console.log("Scheduled date picker is clicked");
    await driver.sleep(3000);

    // Select day 23
    const date23 = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//div[contains(@class,'o_date_item_cell') and .//div[text()='23']]",
        ),
      ),
      8000,
    );

    await driver.wait(until.elementIsVisible(date23), 4000);
    await driver.wait(until.elementIsEnabled(date23), 4000);
    await date23.click();
    console.log("Select date 23");
    await driver.sleep(3000);

    // Add a product
    const addProduct = await driver.wait(
      until.elementLocated(By.xpath("//a[normalize-space()='Add a Product']")),
      10000,
    );

    await addProduct.click();
    console.log("Add Prodcut link is clicked");
    await driver.sleep(3000);

    // Search product
    const searchProduct = await driver.wait(
      until.elementLocated(By.css('input[placeholder="Search a product"]')),
      5000,
    );

    await driver.wait(until.elementIsVisible(searchProduct), 5000);

    // clear (if needed) and send keys in search product
    await searchProduct.clear();
    await searchProduct.sendKeys("Paracetamol");

    // optionally verify value
    const productValue = await searchProduct.getAttribute("value");
    console.log("product entered:", productValue);

    await driver.sleep(3000);

    // Select searched product
    const clickProductSearch = await driver.wait(
      until.elementLocated(By.id("autocomplete_0_0"), 5000),
    );

    await driver.wait(until.elementIsVisible(clickProductSearch), 5000);
    await clickProductSearch.click();

    await driver.sleep(5000);

    // Click Demand
    const addDemand = await driver.wait(
      until.elementLocated(By.name("product_uom_qty"), 5000),
    );

    await driver.wait(until.elementIsVisible(addDemand), 5000);
    await addDemand.click();

    // Wait for the input to appear inside the cell
    const input = await driver.wait(
      until.elementLocated(By.xpath("//td[@name='product_uom_qty']//input")),
      8000,
    );

    // Clear existing value and set to 2
    await input.sendKeys(Key.chord(Key.CONTROL, "a")); // select all
    await input.sendKeys(Key.BACK_SPACE); // clear
    await input.sendKeys("2");

    // optionally verify value
    const quantityValue = await addDemand.getAttribute("value");
    console.log("quantity entered:", quantityValue);

    await driver.sleep(4000);

    // Click Rate
    const rateDeliveries = await driver.wait(
      until.elementLocated(By.name("price_unit"), 5000),
    );

    await driver.wait(until.elementIsVisible(rateDeliveries), 5000);
    await rateDeliveries.click();

    // Wait for the input to appear inside the cell
    const inputRate = await driver.wait(
      until.elementLocated(By.xpath("//td[@name='price_unit']//input")),
      8000,
    );

    // Clear existing value and set to 2
    await inputRate.sendKeys(Key.chord(Key.CONTROL, "a")); // select all
    await inputRate.sendKeys(Key.BACK_SPACE); // clear
    await inputRate.sendKeys("23");

    // optionally verify value
    const rateValue = await rateDeliveries.getAttribute("value");
    console.log("rate entered:", rateValue);

    await driver.sleep(5000);

    // Confirm the deliveries
    const saveBtn = await driver.wait(
      until.elementLocated(
        By.css('button.o_form_button_save[data-tooltip="Save manually"]'),
      ),
      8000,
    );

    // Click the save button
    await saveBtn.click();
    console.log("Deliveries is created");
  } catch (err) {
    console.error("test failed:", err);
  } finally {
    await driver.quit();
  }
};

main();
