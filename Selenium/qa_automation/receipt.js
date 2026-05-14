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

    // Click Purchase button
    // click Purchase App
        const purchaseBtn = await driver.wait(
            until.elementLocated(By.id('result_app_5')),
            8000);

        await driver.wait(until.elementIsVisible(purchaseBtn), 4000);
        await purchaseBtn.click();
        console.log("Purchase button clicked");

        await driver.sleep(2000)

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

        await driver.sleep(3000)

        const selectCurrency = await driver.wait(
            until.elementLocated(By.id('currency_id_0_0_0')), 
            4000
        );

        await driver.wait(until.elementIsVisible(selectCurrency), 4000)
        await selectCurrency.click();
        console.log("INR is selected");

        await driver.sleep(3000)

        /* enter zip PO Code 
        const zip = await driver.wait(
            until.elementLocated(By.id('x_studio_ziperp_code_0')), 
            4000);

        await driver.wait(until.elementIsVisible(zip), 4000);

        await zip.clear();
        await zip.sendKeys("PO00001");

        await driver.sleep(3000)

        const zipvalue = await zip.getAttribute("value");
        console.log("zip code entered", zipvalue);

        await driver.sleep(3000) */

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

     // 2. Select day 18
        const date18 = await driver.wait(
        until.elementLocated(
            By.xpath("//div[contains(@class,'o_date_item_cell') and .//div[text()='18']]")),
        8000
        );

        await driver.wait(until.elementIsVisible(date18), 4000);
        await driver.wait(until.elementIsEnabled(date18), 4000);
        await date18.click();
        console.log('Select date 18')

   
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


        /*  Wait for popup input (DO NOT wait for visibility)
        const emailInput = await driver.wait(
        until.elementLocated(By.css("input[placeholder='e.g. mail@example.com']")),
        10000
        );

        Force focus + type email
        await driver.executeScript(`
        arguments[0].focus();
        arguments[0].value = "test@example.com";
        arguments[0].dispatchEvent(new Event('input', { bubbles: true }));
        `, emailInput);
        await driver.sleep(5000);
        
        console.log("Email entered"); */

    // add message
        const addEmail = await driver.wait(
            until.elementLocated(By.css('textarea.o-mail-Composer-input')), 
            4000);

        await driver.wait(until.elementIsVisible(addEmail), 10000);
        await driver.wait(until.elementIsEnabled(addEmail), 10000);
        addEmail.click();
        

        // clear (if needed) and send keys in send message field
        await addEmail.clear();
        await addEmail.sendKeys("This is a priority")
        await addEmail.sendKeys(Key.ENTER)
        await driver.sleep(3000)

    // optionally verify value
        const emailValue = await addEmail.getAttribute("value");
        console.log("Send message entered:", emailValue);


        /* Click "Set Email" button
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

    // Click Send Message button
        const sendButton = await driver.wait(
            until.elementLocated(By.css('button.o-mail-Composer-send')),
            4000
        ); 

        await driver.wait(until.elementIsVisible(sendButton), 4000);
        await sendButton.click();

        await driver.sleep(5000);

    // Click Log Button
        const logButton = await driver.wait(
            until.elementLocated(By.css('button.o-mail-Chatter-logNote')),
            4000
        ); 

        await driver.wait(until.elementIsVisible(logButton), 7000);
        await logButton.click();
        console.log("Log is clicked")

        await driver.sleep(5000);

        const textarea = await driver.wait(
        until.elementLocated(By.css('textarea[placeholder^="Log an internal note"]')),
        15000
        );

        await driver.wait(until.elementIsVisible(textarea), 10000);

        await driver.executeScript("arguments[0].scrollIntoView(true);", textarea);

        await textarea.click();
        await textarea.sendKeys("Hello");

        await driver.sleep(3000)

    // Click Activity button
        const actButton = await driver.wait(
            until.elementLocated(By.css('button.o-mail-Chatter-activity')),
            4000
        ); 

        await driver.wait(until.elementIsVisible(actButton), 7000);
        await actButton.click();
        console.log("Activity button is clicked")

        await driver.sleep(5000);

     // CLick Save button
        const saveButton = await driver.wait(
            until.elementLocated(By.name('action_schedule_activities')),
            4000
        ); 

        await driver.wait(until.elementIsVisible(saveButton), 7000);
        await saveButton.click();
        console.log("Save button is clicked")

    // Confirm Purchase Order from RFQ
        const confirmOrder = await driver.wait(
            until.elementLocated(By.name('button_confirm')),
            4000
        )

        await driver.wait(until.elementIsVisible(confirmOrder), 7000);
        await confirmOrder.click();
        console.log("Confirm button is clicked (Purchased Order is created)")

        await driver.sleep(3000);

    // Go to Receipt
        const goToReceipt = await driver.wait(
            until.elementLocated(By.name('action_view_picking')), 
            4000
        )

        await driver.wait(until.elementIsVisible(goToReceipt), 7000);
        await goToReceipt.click();
        console.log("Go to Receipt")

        await driver.sleep(5000);

    // Check the details of the product in Receipt screen
        const goToDetails = await driver.wait(
            until.elementLocated(By.xpath("//button[@name='action_show_details']")),
            4000
        )

        await driver.wait(until.elementIsVisible(goToDetails), 7000);
        await goToDetails.click();
        console.log("Go to Product details")

    // Click the Product
        const productName = 'Paracetamol'

    // Generic dynamic locator
        const productXpath = `//a[contains(@class,'o_form_uri') and contains(text(),'${productName}')]`;

    // Wait for the product link
        const productElement = await driver.wait(
            until.elementLocated(By.xpath(productXpath)),
            10000
        );

    // Click the product
        await productElement.click();        
        console.log(`${productName} clicked successfully`);

        await driver.sleep(3000);

    /* Go to General Information tab to check the Track Inventory
        const genTab = await driver.wait(
            until.elementLocated(By.name('general_information')), 
            4000
        )

        await driver.wait(until.elementIsVisible(genTab), 7000);
        await genTab.click();
        console.log("Go to General Information Tab")

        await driver.sleep(3000);

    // Click Tracking field
        const tracking = await driver.wait(
            until.elementLocated(By.id('tracking_1')), 
            4000
        )

        await driver.wait(until.elementIsVisible(tracking), 7000);
        await tracking.click();
        console.log("Click the tracking field")

        await driver.sleep(4000);

    // Select Lots for tracking
     const lotsOpt = await driver.wait(
            until.elementLocated(By.xpath("//span[contains(@class,'o_select_menu_item')]//div[text()='By Lots']")), 
            4000
        )

        await driver.wait(until.elementIsVisible(lotsOpt), 7000);
        await lotsOpt.click();
        console.log("Select Lots for Tracking")

        await driver.sleep(4000); */

    // Click Inventory Tab
         const inventoryTab = await driver.wait(
            until.elementLocated(By.css("a[name='inventory']")), 
            4000);
        
        await driver.wait(until.elementIsVisible(inventoryTab), 5000)
        inventoryTab.click()
        console.log("Inventory Tab is clicked")

        await driver.sleep(4000)
    
    // Check the Traceability expiration date checkbox
        // Locate the checkbox
        const expcb = await driver.wait(
            until.elementLocated(By.id("use_expiration_date_0")), 
            4000);

        // Check if not already checked
        const isChecked = await expcb.isSelected();

        if (!isChecked) {
            await driver.executeScript(
                "arguments[0].click();",
                expcb
            );
        }

        await driver.sleep(4000)


    // Add Expiration Date
        const exp = await driver.wait(
            until.elementLocated(By.id('expiration_time_0')), 
            4000
        )

        await driver.wait(until.elementIsVisible(exp), 7000);
        await exp.click();

    // clear (if needed) and send keys in send message field
        await exp.clear();
        await exp.sendKeys("182")
        await exp.sendKeys(Key.ENTER)
        await driver.sleep(3000)

        console.log("Add Expiration Date")

        await driver.sleep(3000);

    // Add Best Before Date
        const useTime = await driver.wait(
            until.elementLocated(By.id('use_time_0')), 
            4000
        )

        await driver.wait(until.elementIsVisible(useTime), 7000);
        await useTime.click();
        await useTime.sendKeys("30")
        await useTime.sendKeys(Key.ENTER)
        console.log("Add Best Before Date")

        await driver.sleep(3000);

    // Add removal date
        const remProduct = await driver.wait(
            until.elementLocated(By.id('removal_time_0')), 
            4000
        )

        await driver.wait(until.elementIsVisible(remProduct), 7000);
        await remProduct.click();
        await remProduct.sendKeys("45")
        await remProduct.sendKeys(Key.ENTER)
        console.log("Add Remove Date")

        await driver.sleep(3000);

    // Add alert date 
        const alertProd = await driver.wait(
            until.elementLocated(By.id('alert_time_0')), 
            4000
        )

        await driver.wait(until.elementIsVisible(alertProd), 6000);
        await alertProd.click();
        await alertProd.sendKeys("45")
        await alertProd.sendKeys(Key.ENTER)
        console.log("Add Alert Date")

        await driver.sleep(5000);

    // Confirm the RFQ
        const saveBtn = await driver.wait(
            until.elementLocated(By.css('button.o_form_button_save[data-tooltip="Save manually"]')),
            6000
        );

        // Click the save button
        await saveBtn.click();
        console.log('Save manually')

        await driver.sleep(3000);
        await driver.navigate().back();
        await driver.sleep(3000);
        

        // Check the details of the product in Receipt screen
        const goToDetLot = await driver.wait(
            until.elementLocated(By.xpath("//button[@name='action_show_details']")),
            4000
        )

        await driver.wait(until.elementIsVisible(goToDetLot), 7000);
        await goToDetLot.click();
        console.log("Go to Product details")
        await driver.sleep(4000);


    // Wait for the button to appear
        const generateLot = await driver.wait(
            until.elementLocated(By.xpath("//div[contains(@class,'o_widget_generate_serials')]//button")),
            4000
        );

        // Click the button
        await generateLot.click();
        console.log("Generate Serials/Lots button clicked");
        await driver.sleep(3000);


    // Click and Add lot serial number
         const lotSerial = await driver.wait(
            until.elementLocated(By.id('next_serial_0')), 
            4000
        )

        await driver.wait(until.elementIsVisible(lotSerial), 7000);
        await lotSerial.click();
        await lotSerial.sendKeys("LOT-PAR-0001")
        await lotSerial.sendKeys(Key.ENTER)
        console.log("Add Lot/Serial Number")
        await driver.sleep(3000);

    // Wait for the Generate button
        const generateButton = await driver.wait(
            until.elementLocated(By.xpath("//footer//button[contains(text(),'Generate')]")),
            4000
        );

        await driver.sleep(3000);

    // Click the Generate button
        await generateButton.click();
        console.log("Generate button clicked");
        await driver.sleep(3000);

    // Product Expiration date
    // Wait until the input field is visible
        const expirationDateInput = await driver.wait(
            until.elementLocated(By.css('td[name="expiration_date"]')),
            4000
        );

    // Scroll into view (optional)
        await driver.executeScript(
            "arguments[0].scrollIntoView(true);",
            expirationDateInput
        );
        await driver.sleep(4000);

    // Click the td element
        await expirationDateInput.click();

    // Locate month using title attribute
        const monthButton = await driver.wait(
            until.elementLocated(By.css('button[title="Select month"]')),
            6000
        );
    
        // Click the button
        await monthButton.click();
        console.log('Select month clicked successfully.');
        await driver.sleep(3000);


    // Locate year using title attribute 
        const yearButton = await driver.wait(
            until.elementLocated(By.css('button[title="Select year"]')),
            6000
        );

    // Click the button
        await monthButton.click();
        await driver.sleep(3000);
        console.log('Select year clicked successfully.');

    /// Wait until the year 2030 element is present
        const year2030 = await driver.wait(
            until.elementLocated(By.xpath('//div[contains(@class,"o_date_item_cell") and text()="2030"]')),
            6000
        );

    // Scroll into view (optional)
        await driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            year2030
        );

    // Click the year 2030
        await year2030.click();
        await driver.sleep(3000);
        console.log('Year 2030 selected successfully.');

        await driver.sleep(3000);

    // Wait for the month "Oct"
        const octMonth = await driver.wait(
            until.elementLocated(By.xpath('//div[contains(@class,"o_date_item_cell") and text()="Nov"]')),
            6000
        );

    // Click the month
        await octMonth.click();
        console.log('Month Nov selected successfully.');

        await driver.sleep(4000);

    
    // STEP 5 — Select day 30
        const day30 = await driver.wait(
            until.elementLocated(By.xpath("//div[contains(@class,'o_date_item_cell') and .//div[text()='30']]")),
            6000
        );

        await day30.click();
        console.log('November 30, 2030 selected successfully.');
        await driver.sleep(4000);

    //  Wait for the Apply button using its text
        const applyButton = await driver.wait(
            until.elementLocated(By.xpath('//button[.//span[text()="Apply"]]')),
            6000
        );

        await driver.sleep(4000);

    // Ensure it is visible
        await driver.wait(
            until.elementIsVisible(applyButton),
            5000
        );

    // Scroll into view (optional but useful in Odoo UI)
        await driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            applyButton
        );

        await driver.sleep(3000);

    // Click Apply button
        await applyButton.click();

        console.log('Apply button clicked successfully.');   
        await driver.sleep(4000); 

    // Wait for Save button using class + text
        const saveDetails = await driver.wait(
            until.elementLocated(By.xpath('//button[contains(@class,"o_form_button_save") and normalize-space()="Save"]')),
            6000
        );

        // Scroll into view (optional)
        await driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            saveDetails
        );

        // Click Save button
        await saveDetails.click();
        console.log('Save button clicked successfully.');
        await driver.sleep(5000);

    // Scroll horizontally
    // Wait for table renderer
        const tableContainer = await driver.wait(
            until.elementLocated(
                By.css('.o_list_renderer')
            ),
            5000
        );

        // Scroll horizontally to the RIGHT
        await driver.executeScript(`
            arguments[0].scrollLeft = arguments[0].scrollWidth;
        `, tableContainer);

        // OPTIONAL: wait a little after scrolling
        await driver.sleep(1000);  

    // From Owner
    // Wait until the input field is visible
        const clickFromOwner = await driver.wait(
            until.elementLocated(By.css('td[name="owner_id"]')),
            4000
        );

    // Scroll into view (optional)
        await driver.executeScript(
            "arguments[0].scrollIntoView(true);",
            clickFromOwner
        );
        await driver.sleep(4000);

    // Click the td element
        await clickFromOwner.click();
        await driver.sleep(4000); 


    // Select searched product
        const fromOwner = await driver.wait(
            until.elementLocated(By.id('autocomplete_0_1'), 
            4000))

        await driver.wait(until.elementIsVisible(fromOwner), 4000);
        await fromOwner.click();

        await driver.sleep(2000)

    // Add quantity input field
        const quantityInput = await driver.wait(
            until.elementLocated(
                By.css('td[name="quantity"] input.o_input')
            ),
            8000
        );

    // Scroll into view
        await driver.executeScript(
            "arguments[0].scrollIntoView({block:'center'});",
            quantityInput
        );

        await driver.sleep(4000); 
    
        // Clear existing value
        await quantityInput.clear();

        // Enter quantity
        await quantityInput.sendKeys('10');
        await driver.sleep(4000); 
        console.log('Quantity entered successfully.');


    } catch(err) {
    console.error("test failed:", err);
    } finally {
    await driver.quit();

    }
}

main()