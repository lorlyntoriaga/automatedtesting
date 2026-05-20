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
    console.log("Sales app clicked");

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
      until.elementLocated(
        By.css('a[data-menu-xmlid="stock.out_picking"]'),
      ),
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
      until.elementLocated(By.id("partner_id_0")), 4000
    )

    await driver.wait(until.elementIsVisible(contactDel), 4000)
    contactDel.click()
    await driver.sleep(3000);

    // Select contact in the dropdown
    const selectContact = await driver.wait(
      until.elementLocated(By.id('partner_id_0_0_0')), 4000
    )

    await driver.wait(until.elementIsVisible(selectContact), 4000)
    selectContact.click()
    await driver.sleep(3000);
    console.log("Contact is selected");

    //Add Operation Type
    const operType = await driver.wait(
      until.elementLocated(By.id("picking_type_id_0")), 4000
    )

    await driver.wait(until.elementIsVisible(operType), 4000)
    operType.click()
    await driver.sleep(3000);

    // Select operation type in the dropdown
    const selectOperType = await driver.wait(
      until.elementLocated(By.id('picking_type_id_0_0_0')), 4000
    )

    await driver.wait(until.elementIsVisible(selectOperType), 4000)
    selectOperType.click()
    await driver.sleep(7000);
    console.log("Operation Type is selected");

    // Go To Warehouse
    const goToWarehouse = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(@class,'btn-primary') and text()='Go to Warehouses']")),
      4000,
    );

    await driver.wait(until.elementIsVisible(goToWarehouse), 4000);
    await goToWarehouse.click();
    console.log("New Delivery clicked");

    await driver.sleep(3000);

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



  } catch (err) {
    console.error("test failed:", err);
  } finally {
    await driver.quit();
  }
};

main();
