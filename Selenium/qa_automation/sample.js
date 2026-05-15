const { Builder } = require('selenium-webdriver');

const main = async () => {
    console.log("starting");

    const driver = await new Builder()
        .forBrowser('chrome')
        .build();

    console.log("chrome opened");

    await driver.get('https://google.com');
};

main().catch(err => {
    console.error("ERROR:");
    console.error(err);
});