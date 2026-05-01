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


     // click Purchase App
    const purchaseBtn = await driver.wait(
        until.elementLocated(By.id('result_app_5')),
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
    const vendor = await driver.wait(
        until.elementLocated(By.css('a[data-menu-xmlid="purchase.menu_procurement_management_supplier_name"]')),
        8000);

    await driver.wait(until.elementIsVisible(vendor), 4000);

    //  Step 3: Click using JavaScript (most reliable in Odoo)
    await driver.executeScript("arguments[0].click();", vendor);
    console.log("Purchase Order menu is clicked")

    await driver.sleep(4000)

    // new Vendor button
    const newVendor = await driver.wait(
        until.elementLocated(By.css('button.o_list_button_add')), 
        4000);

    await driver.wait(until.elementIsVisible(newVendor), 4000);
    await newVendor.click();
    console.log("New Vendor button clicked");

    await driver.sleep(4000)

    const vendorName = await driver.wait(
        until.elementLocated(By.css('input[placeholder="e.g. Lumber Inc"]')), 
        4000);

    await driver.wait(until.elementIsVisible(vendorName), 3000)

    // clear (if needed) and send keys for vendor Name
    await vendorName.clear();
    await vendorName.sendKeys("MS GUPTA TEXTILES")
    await driver.sleep(4000)
    await vendorName.sendKeys(Key.ENTER)

    // optionally verify value
    const vendorValue = await vendorName.getAttribute("value");
    console.log("Name of vendor entered:", vendorValue);

    await driver.sleep(4000)

    //click email
     const addEmail = await driver.wait(
        until.elementLocated(By.id('email_0')), 
        4000);

    await driver.wait(until.elementIsVisible(addEmail), 3000)
    addEmail.click();
    console.log("Email is clicked")

    // clear (if needed) and send keys in mobile
    await addEmail.clear();
    await addEmail.sendKeys("gupta@gmail.com")
    await addEmail.sendKeys(Key.ENTER)
    await driver.sleep(4000)

    // optionally verify value
    const emailValue = await addEmail.getAttribute("value");
    console.log("email entered:", emailValue);

    await driver.sleep(2000)

    // add phone number
    const addPhone = await driver.wait(
        until.elementLocated(By.id('phone_0')), 
        4000);

    await driver.wait(until.elementIsVisible(addPhone), 3000)
    addPhone.click();
    console.log("Phone field is clicked")

    // clear (if needed) and send keys in mobile
    await addPhone.clear();
    await addPhone.sendKeys("09185426378")
    await addPhone.sendKeys(Key.ENTER)
    await driver.sleep(4000)

    // optionally verify value
    const phoneValue = await addPhone.getAttribute("value");
    console.log("Name of vendor entered:", phoneValue);


    // click street
    const addStreet = await driver.wait(
        until.elementLocated(By.css('input[placeholder="Street..."]')), 
        4000);

    await driver.wait(until.elementIsVisible(addStreet), 3000)
    addStreet.click();
    console.log("Street is clicked")

    // clear (if needed) and send keys in Street
    await addStreet.clear();
    await addStreet.sendKeys("VILLAGE MOGINAND NAHAN ROAD KALA AMB TESIL NAHAN DISTT. SIRMOUR")
    await addStreet.sendKeys(Key.ENTER)
    await driver.sleep(3000)

    // optionally verify value
    const streetValue = await addStreet.getAttribute("value");
    console.log("Street entered:", streetValue);

    await driver.sleep(3000)

    // click street 2
    const addStreet2 = await driver.wait(
        until.elementLocated(By.css('input[placeholder="Street 2..."]')), 
        4000);

    await driver.wait(until.elementIsVisible(addStreet2), 3000)
    addStreet2.click();
    

    // clear (if needed) and send keys in Street 2
    await addStreet2.clear();
    await addStreet2.sendKeys("MARUNGKO")
    await addStreet2.sendKeys(Key.ENTER)
    await driver.sleep(3000)

    // optionally verify value
    const street2Value = await addStreet2.getAttribute("value");
    console.log("Street entered:", street2Value);

    await driver.sleep(3000)

    // click city
    const addCity = await driver.wait(
        until.elementLocated(By.css('input[placeholder="City"]')), 
        4000);

    await driver.wait(until.elementIsVisible(addCity), 3000)
    addCity.click();
    

    /* clear (if needed) and send keys in search product
    await addCity.clear();
    await addCity.sendKeys("Olo")
    await addCity.sendKeys(Key.ENTER)
    await driver.sleep(3000) 

    // optionally verify value
    const cityValue = await addCity.getAttribute("value");
    console.log("City entered:", cityValue); */

    await driver.sleep(3000)

    // add zip

    const addZIP = await driver.wait(
        until.elementLocated(By.css('input[placeholder="ZIP"]')), 
        4000);

    await driver.wait(until.elementIsVisible(addCity), 3000)
    addZIP.click();
    

    // clear (if needed) and send keys in ZIP 
    await addZIP.clear();
    await addZIP.sendKeys("173030")
    await addZIP.sendKeys(Key.ENTER)
    await driver.sleep(3000)

    // optionally verify value
    const zipValue = await addZIP.getAttribute("value");
    console.log("ZIP entered:", zipValue);

    await driver.sleep(3000)

    // add State
    const addState = await driver.wait(
        until.elementLocated(By.id('state_id_0')), 
        4000);

    await driver.wait(until.elementIsVisible(addState), 3000)
    addState.click();

    await driver.sleep(5000)

    // select a state
    const selectState = await driver.wait(
        until.elementLocated(By.id('state_id_0_0_0')), 
        4000);

    await driver.wait(until.elementIsVisible(selectState), 4000)
    selectState.click()

    await driver.sleep(5000)

    // add GST
    const addGST = await driver.wait(
        until.elementLocated(By.id('l10n_in_gst_treatment_0')), 
        4000);

    await driver.wait(until.elementIsVisible(addGST), 4000)
    addGST.click()

    await driver.sleep(3000)

    // select GST
    const selectGST = await driver.wait(
        until.elementLocated(By.xpath("//span[.//div[text()='Registered Business - Regular']]")), 
        4000);

    await driver.wait(until.elementIsVisible(selectGST), 4000)
    selectGST.click()
    console.log("GST is clicked")

    await driver.sleep(4000)

    // add website
    const addWebsite = await driver.wait(
        until.elementLocated(By.id('website_0')), 
        4000);

    await driver.wait(until.elementIsVisible(addWebsite), 4000)
    addWebsite.click()

    await driver.sleep(3000)

    // clear (if needed) and send keys in Website
    await addWebsite.clear();
    await addWebsite.sendKeys("www.gupta.com")
    await addWebsite.sendKeys(Key.ENTER)

    await driver.sleep(3000)

    // add Tags
    const addTags = await driver.wait(
        until.elementLocated(By.id('category_id_0')), 
        4000);

    await driver.wait(until.elementIsVisible(addTags), 4000)
    addTags.click()


    // create Tags
    const createTags = await driver.wait(
        until.elementLocated(By.id('category_id_0_0_0')), 
        4000);

    await driver.wait(until.elementIsVisible(createTags), 4000)
    createTags.click()

    await driver.sleep(4000)

    /* Add details for tags
    const addDetailstTag = await driver.wait(
        until.elementLocated(By.id('name_0')), 
        4000);
    
    await driver.wait(until.elementIsVisible(addDetailstTag), 4000)
    addDetailstTag.click()

    // clear (if needed) and send keys in Tags Details
    await addDetailstTag.clear();
    await addDetailstTag.sendKeys("Consulting Services")
    await addDetailstTag.sendKeys(Key.ENTER)
    await driver.sleep(3000) 

    // optionally verify value
    const tagsNameValue = await addStreet.getAttribute("value");
    console.log("Tags name entered:", tagsNameValue);

    await driver.sleep(3000)

    // add tags category
     const addCatTag = await driver.wait(
        until.elementLocated(By.id('parent_id_0')), 
        4000);
    
    await driver.wait(until.elementIsVisible(addCatTag), 4000)
    addCatTag.click() */

    // click contact card
    const addContact = driver.wait(
        until.elementLocated(By.xpath("//div[contains(@class,'o-kanban-button-new') and normalize-space()='Add Contact']")),
        4000)
        

    await driver.wait(until.elementIsVisible(addContact), 3000)
    addContact.click()
    console.log("Add contact is clicked")
    
    // Add Contact Name
    const addNameContact = driver.wait(
        until.elementLocated(By.id('name_0')),
    3000)

    await driver.wait(until.elementIsVisible(addNameContact), 5000)
    addNameContact.click()
    console.log("Name the contact is clicked")


     // clear (if needed) and send keys in Website
    await addNameContact.clear();
    await addNameContact.sendKeys("Jessica Halpert")
    await addNameContact.sendKeys(Key.ENTER)

    // optionally verify value
    const contactValue = await addNameContact.getAttribute("value");
    console.log("ZIP entered:", contactValue);

    await driver.sleep(3000)

    // Add Contact Email
    const addEmailContact = driver.wait(
        until.elementLocated(By.id('email_0')),
    3000)

    await driver.wait(until.elementIsVisible(addEmailContact), 5000)
    addEmailContact.click()
    console.log("Email is clicked")


     // clear (if needed) and send keys in Website
    await addEmailContact.clear();
    await addEmailContact.sendKeys("jessica@gmail.com")
    await addEmailContact.sendKeys(Key.ENTER)

    // optionally verify value
    const emailContactValue = await addEmailContact.getAttribute("value");
    console.log("Contact Name entered:", emailContactValue);

    await driver.sleep(3000)

    // Add Contact Phone number
    const addContactPhone = driver.wait(
        until.elementLocated(By.id('phone_0')),
    3000)

    await driver.wait(until.elementIsVisible(addContactPhone), 5000)
    addContactPhone.click()
    console.log("Contact Phone is clicked")


     // clear (if needed) and send keys in Website
    await addContactPhone.clear();
    await addContactPhone.sendKeys("09154452387")
    await addContactPhone.sendKeys(Key.ENTER)

    // optionally verify value
    const phoneContactValue = await addContactPhone.getAttribute("value");
    console.log("Contact Phone entered:", phoneContactValue);

    await driver.sleep(3000)

    // Add a Job Title
    const addJobTitle = driver.wait(
        until.elementLocated(By.id('function_0')),
    3000)

    await driver.wait(until.elementIsVisible(addJobTitle), 5000)
    addJobTitle.click()
    console.log("Contact Job Title is clicked")


     // clear (if needed) and send keys in Website
    await addJobTitle.clear();
    await addJobTitle.sendKeys("Sales Person")
    await addJobTitle.sendKeys(Key.ENTER)

    // optionally verify value
    const jobValue = await addJobTitle.getAttribute("value");
    console.log("Contact Job Title entered:", jobValue);

    await driver.sleep(3000)

    const contactSave = driver.wait(
        until.elementLocated(By.xpath("//button[contains(@class,'o_form_button_save') and normalize-space()='Save & Close']")),
    3000)

    await driver.wait(until.elementIsVisible(contactSave), 5000)
    contactSave.click()
    console.log("Save the contact")

    await driver.sleep(5000)

    // click city
    const salesTab = await driver.wait(
        until.elementLocated(By.css("a[name='sales_purchases']")), 
        4000);
    
    await driver.wait(until.elementIsVisible(salesTab), 5000)
    salesTab.click()
    console.log("Sales & Tab is clicked")

    await driver.sleep(3000)

    // Click Accounting Tab
    const accountingTab = await driver.wait(
        until.elementLocated(By.css("a[name='accounting']")), 
        4000);
    
    await driver.wait(until.elementIsVisible(accountingTab), 5000)
    accountingTab.click()
    console.log("Accounting Tab is clicked")

    await driver.sleep(3000)

    // Click Notes Tab

    const noteTab = await driver.wait(
        until.elementLocated(By.css("a[name=internal_notes]")),
    3000)

    await driver.wait(until.elementLocated(noteTab), 4000)
    noteTab.click()

    await driver.sleep(3000)

     } catch(err) {
    console.error("test failed:", err);
    } finally {
    await driver.quit();

    }
}

main()