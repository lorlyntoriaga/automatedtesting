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

    // click Purchase App
    const purchaseBtn = await driver.wait(
      until.elementLocated(By.id("result_app_6")),
      8000,
    );

    await driver.wait(until.elementIsVisible(purchaseBtn), 4000);
    await purchaseBtn.click();
    console.log("Inventory App is clicked");

    await driver.sleep(2000);

    // Click Reporting menu
    const rprtInv = await driver.wait(
      until.elementLocated(
        By.css('button[data-menu-xmlid="stock.menu_warehouse_report"]'),
      ),
      8000,
    );

    await driver.wait(until.elementIsVisible(rprtInv), 4000);
    await rprtInv.click();
    console.log("Reporting menu is clicked");

    await driver.sleep(2000);

    // Reporting's Stock menu
    const rprtStck = await driver.wait(
      until.elementLocated(
        By.css('a[data-menu-xmlid="stock.menu_product_stock"]'),
      ),
      8000,
    );

    await driver.wait(until.elementIsVisible(rprtStck), 4000);

    //  Click using JavaScript (most reliable in Odoo)
    await driver.executeScript("arguments[0].click();", rprtStck);
    console.log("Stock is clicked");

    await driver.sleep(6000);

    // Click the Goods
     const goodsStck = await driver.wait(
      until.elementLocated(
         By.xpath("//span[contains(@class,'o_search_panel_label_title') and text()='Goods']"),
      ),
      8000,
    );

    await driver.wait(until.elementIsVisible(goodsStck), 4000);
    await goodsStck.click();
    console.log("Goods is clicked");


    // Switch to Location
    await rprtInv.click();
    console.log("Reporting menu is clicked");
    await driver.sleep(2000);

    // Reporting's Location menu
    const rprtLoc = await driver.wait(
      until.elementLocated(
        By.css('a[data-menu-xmlid="stock.menu_valuation"]'),
      ),
      8000,
    );

    await driver.wait(until.elementIsVisible(rprtLoc), 4000);

    //  Click using JavaScript (most reliable in Odoo)
    await driver.executeScript("arguments[0].click();", rprtLoc);
    console.log("Location is clicked");

    await driver.sleep(4000);

     const removeBtn = await driver.findElement(
      By.xpath("//button[contains(@class,'o_facet_remove')]"),
    );

    await removeBtn.click();
    await driver.sleep(6000);


    // Switch Move History
    // Click Reporting menu
    await rprtInv.click();
    console.log("Reporting menu is clicked");

    await driver.sleep(2000);

    // Reporting's Move History menu
    const rprtMH = await driver.wait(
      until.elementLocated(
        By.css('a[data-menu-xmlid="stock.stock_move_line_menu"]'),
      ),
      8000,
    );

    await driver.wait(until.elementIsVisible(rprtMH), 4000);

    //  Click using JavaScript (most reliable in Odoo)
    await driver.executeScript("arguments[0].click();", rprtMH);
    console.log("Move History is clicked");

    await driver.sleep(6000);


    // Move Menu
    await rprtInv.click();
    console.log("Reporting menu is clicked");

    await driver.sleep(2000);

     const rprtMA = await driver.wait(
      until.elementLocated(
        By.css('a[data-menu-xmlid="stock.stock_move_line_menu"]'),
      ),
      8000,
    );

    await driver.wait(until.elementIsVisible(rprtMA), 4000);

    //  Click using JavaScript (most reliable in Odoo)
    await driver.executeScript("arguments[0].click();", rprtMA);
    console.log("Move Analysis is clicked");

    await driver.sleep(6000);
    

  } catch (err) {
    console.error("test failed:", err);
  } finally {
    await driver.quit();
  }
};

main();
