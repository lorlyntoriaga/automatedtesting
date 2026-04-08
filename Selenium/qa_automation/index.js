const {By, Builder, Browser} = require('selenium-webdriver');

const main = async () => {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    
    await driver.get('https://www.google.com"');

    const title = await driver.getTitle()
    console.log(title)

    await driver.quit()

}
main()