const axios = require('axios');
const { Builder, By, until } = require('selenium-webdriver');

async function loginPageFrontend(email, password, isValid) {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the login page
        await driver.get('http://localhost:3000/LoginPage');

        // Wait until the email input is present
        await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);
        
        // Fill in the email and password fields
        const emailInput = await driver.findElement(By.css('input[type="email"]'));
        await emailInput.sendKeys(email);
        
        const passwordInput = await driver.findElement(By.css('input[type="password"]'));
        await passwordInput.sendKeys(password);

        // Click the login button
        const loginButton = await driver.findElement(By.css('button[type="submit"]'));
        await loginButton.click();

        // Wait for the alert to appear
        if (isValid) {
            await driver.wait(until.urlContains('/Dashboard'), 10000);
        } else {
            await driver.wait(until.elementLocated(By.css('.alert-danger')), 10000);
        }

        // Return true if the test passed
        return true;
    } finally {
        await driver.quit();
    }
}

module.exports = {
    loginPageFrontend
};