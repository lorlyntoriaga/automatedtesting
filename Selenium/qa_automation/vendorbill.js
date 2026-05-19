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
const path = require("path");


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

    // Click Purchase App
    const purchaseBtn = await driver.wait(
      until.elementLocated(By.id("result_app_5")),
      8000,
    );

    await driver.wait(until.elementIsVisible(purchaseBtn), 4000);
    await purchaseBtn.click();
    console.log("Purchase button clicked");

    // Click Order menu
    const orderbtn = await driver.wait(
      until.elementLocated(
        By.css(
          'button[data-menu-xmlid="purchase.menu_procurement_management"]',
        ),
      ),
      8000,
    );

    await driver.wait(until.elementIsVisible(orderbtn), 4000);
    await orderbtn.click();
    console.log("Order menu is clicked");

    await driver.sleep(2000);

    // Purhase Order menu
    const purchaseOrder = await driver.wait(
      until.elementLocated(By.xpath("//a[contains(text(),'Purchase Orders')]")),
      7000,
    );

    await driver.wait(until.elementIsVisible(purchaseOrder), 4000);

    // Click using JavaScript (most reliable in Odoo)
    await driver.executeScript("arguments[0].click();", purchaseOrder);
    console.log("Purchase Order menu is clicked");

    await driver.sleep(5000);

    // Wait until purchase order rows
    await driver.wait(
      until.elementsLocated(By.css("table.o_list_table tbody tr.o_data_row")),
      7000,
    );

    // Get all purchase order rows
    const rows = await driver.findElements(
      By.css("table.o_list_table tbody tr.o_data_row"),
    );

    // Check if rows exist
    if (rows.length > 0) {
      // Get first available purchase order
      const firstRow = rows[0];
      await driver.sleep(5000);

      // Find PO clickable cell
      const poElement = await firstRow.findElement(By.css("td[name='name']"));

      // Get PO number
      const poNumber = await poElement.getText();
      await driver.sleep(5000);

      console.log("Opening Purchase Order:", poNumber);

      // Scroll into view
      await driver.executeScript(
        "arguments[0].scrollIntoView({block:'center'});",
        poElement,
      );

      // Click Purchase Order
      await poElement.click();
      await driver.sleep(5000);

      // Wait until "Upload Bill" button is visible
      const uploadBillButton = await driver.wait(
        until.elementLocated(
          By.xpath("//button[contains(text(),'Upload Bill')]"),
        ),
        15000,
      );

      // Scroll into view
      await driver.executeScript(
        "arguments[0].scrollIntoView({block:'center'});",
        uploadBillButton,
      );

      // Click button
      await uploadBillButton.click();
      console.log("Upload Bill button clicked");
      await driver.sleep(5000);

      // Locate file
      const filePath = path.resolve("vendorcollana.txt")
      console.log("Upload file: ", filePath)

       const fileInput = await driver.wait(
            until.elementLocated(
                By.css("input.document_file_uploader")
            ),
            20000
        );

        // REMOVE HIDDEN CLASS
        await driver.executeScript(`
            arguments[0].classList.remove('d-none');
        `, fileInput);

        // UPLOAD FILE DIRECTLY
        await fileInput.sendKeys(filePath);
        await driver.sleep(5000);
        console.log("vendorbill.txt uploaded successfully");

      // Add Place of Supply 
      const placeOfSupply = driver.wait(
        until.elementLocated(By.id("l10n_in_state_id_0")), 4000
      )  

      await driver.wait(until.elementIsVisible(placeOfSupply), 4000);
      await placeOfSupply.click();
      console.log("Place of Supply field is clicked");

      // Select Place of Supply
      const selectPOS = await driver.wait(
        until.elementLocated(By.id("l10n_in_state_id_0_0_0")),
        4000,
      );

      await driver.wait(until.elementIsVisible(selectPOS), 4000);
      selectPOS.click();

      await driver.sleep(5000);

      // Click Bill date
      const billDate = await driver.wait(
        until.elementLocated(By.id("invoice_date_1")),
        4000,
      );

      await driver.wait(until.elementIsVisible(billDate), 4000);
      await billDate.click();
      console.log("bill date date-picker is clicked");

      await driver.sleep(3000);

      // 2. Select day 18
      const date18 = await driver.wait(
        until.elementLocated(
          By.xpath(
            "//div[contains(@class,'o_date_item_cell') and .//div[text()='18']]",
          ),
        ),
        8000,
      );

      await driver.wait(until.elementIsVisible(date18), 4000);
      await driver.wait(until.elementIsEnabled(date18), 4000);
      await date18.click();
      console.log("Select date 18");

      await driver.sleep(3000);


    } else {
      console.log("No Purchase Orders Found");
    }
  } catch (err) {
    console.error("test failed:", err);
  } finally {
    await driver.quit();
  }
};

main();
