const { Builder, By, until } = require('selenium-webdriver');

async function loginPageUserFrontend(email, password, isValid) {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the login page
        await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');

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

        // Wait for the expected result
        if (isValid) {
            await driver.wait(until.urlContains('/UserDashboard'), 10000);
        } else {
            await driver.wait(until.elementLocated(By.css('.alert-danger')), 10000);
        }

        return true;
    } catch (error) {
        if (isValid) {
            throw error;
        }
        return false;
    } finally {
        await driver.quit();
    }
}

async function loginPageLibrarianFrontend(email, password, isValid) {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the login page
        await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');

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

        // Wait for the expected result
        if (isValid) {
            await driver.wait(until.urlContains('/LibrarianDashboard'), 10000);
        } else {
            await driver.wait(until.elementLocated(By.css('.alert-danger')), 10000);
        }

        return true;
    } catch (error) {
        if (isValid) {
            throw error;
        }
        return false;
    } finally {
        await driver.quit();
    }
}

async function loginPageAdminFrontend(email, password, isValid) {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the login page
        await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');

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

        // Wait for the expected result
        if (isValid) {
            await driver.wait(until.urlContains('/AdminDashboard'), 10000);
        } else {
            await driver.wait(until.elementLocated(By.css('.alert-danger')), 10000);
        }

        return true;
    } catch (error) {
        if (isValid) {
            throw error;
        }
        return false;
    } finally {
        await driver.quit();
    }
}

module.exports = {
    loginPageAdminFrontend,
    loginPageLibrarianFrontend,
    loginPageUserFrontend
};
