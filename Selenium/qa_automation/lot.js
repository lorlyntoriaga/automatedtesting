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
    console.log("Inventory button clicked");

    await driver.sleep(2000);

    // Click the Company
    const companyButton = await driver.wait(
      until.elementLocated(
        By.css("div.o_switch_company_menu button.dropdown-toggle"),
      ),
      10000,
    );

    // Click the button
    await companyButton.click();

    console.log("Company menu clicked successfully.");
    await driver.sleep(5000);

    // Locate main branch
    const mainDbChckbx = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//div[@role='menuitemcheckbox' and @aria-label='reach52 IND']",
        ),
      ),
      6000,
    );

    // Check current state
    const mainChecked = await mainDbChckbx.getAttribute("aria-checked");

    // Uncheck only if currently checked
    if (mainChecked === "true") {
      await mainDbChckbx.click();
      console.log("Checkbox unchecked.");
    } else {
      console.log("Checkbox is already unchecked.");
    }

    // Select a branch db (Ambala)
    // Locate the checkbox element using aria-label
    const ambalaDbChckbx = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//div[@role='menuitemcheckbox' and @aria-label='reach52 - IND - Ambala']",
        ),
      ),
      6000,
    );

    // Check current state
    const checked = await ambalaDbChckbx.getAttribute("aria-checked");

    // Click only if not already checked
    if (checked !== "true") {
      await ambalaDbChckbx.click();
      console.log("Checkbox checked.");
    } else {
      console.log("Checkbox is already checked.");
    }

    await driver.sleep(4000);

    // Confirm changing of branch
    // Wait for the Confirm button
    const confirmButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(),'Confirm')]")),
      8000,
    );

    // Click the button
    await confirmButton.click();
    await driver.sleep(5000);
    await driver.navigate().refresh();
    await driver.sleep(2000);

    // Click Product menu
    const productbtn = await driver.wait(
      until.elementLocated(
        By.css('button[data-menu-xmlid="stock.menu_stock_inventory_control"]'),
      ),
      8000,
    );

    await driver.wait(until.elementIsVisible(productbtn), 4000);
    await productbtn.click();
    console.log("Product menu is clicked");

    await driver.sleep(2000);

    // Product
    const productMenu = await driver.wait(
      until.elementLocated(
        By.css('a[data-menu-xmlid="stock.menu_action_production_lot_form"]'),
      ),
      8000,
    );

    await driver.wait(until.elementIsVisible(productMenu), 4000);

    //  Step 3: Click using JavaScript (most reliable in Odoo)
    await driver.executeScript("arguments[0].click();", productMenu);
    console.log("Product option is clicked");

    await driver.sleep(4000);

    // new product button
    const newProduct = await driver.wait(
      until.elementLocated(By.css("button.btn.btn-primary")),
      4000,
    );

    await driver.wait(until.elementIsVisible(newProduct), 4000);
    await newProduct.click();
    console.log("New product button clicked");

    await driver.sleep(3000);

    // Add a Lot number
    const lotField = await driver.wait(
      until.elementLocated(By.id("name_0")),
      4000,
    );

    await driver.wait(until.elementIsVisible(lotField), 8000);
    await lotField.click();
    await lotField.sendKeys("LOT-0001-00006");

    await driver.sleep(3000);

    // Add a product
    const lotProduct = await driver.wait(
      until.elementLocated(By.id("product_id_0")),
      4000,
    );

    await driver.wait(until.elementIsVisible(lotProduct), 8000);
    await lotProduct.click();
    await lotProduct.sendKeys("Paracetamol");

    await driver.sleep(3000);

    // Click product
    const lotProductSelect = await driver.wait(
      until.elementLocated(By.id("product_id_0_0_0")),
      4000,
    );

    await driver.wait(until.elementIsVisible(lotProductSelect), 8000);
    await lotProductSelect.click();

    await driver.sleep(3000);

    // save internal notes
    const paragraphDiv = await driver.wait(
      until.elementLocated(By.css("div.note-editable")),
      8000,
    );

    // Example: click or send keys
    await paragraphDiv.click();
    await paragraphDiv.sendKeys(
      "Used for relief of fever and mild to moderate pain",
    );

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

    await driver.sleep(5000);
  } catch (err) {
    console.error("test failed:", err);
  } finally {
    await driver.quit();
  }
};

main();
