const { Builder, By, until } = require('selenium-webdriver');

async function registerUserFrontend(firstName, lastName, email, password, rePassword, expectSuccess) {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the registration page
        await driver.get('https://lg2slibrarysystem.netlify.app/RegisterPage');

        // Fill in the first name
        if (firstName) {
            const firstNameInput = await driver.findElement(By.css('input[placeholder="Enter First Name"]'));
            await firstNameInput.sendKeys(firstName);
        }

        // Fill in the last name
        if (lastName) {
            const lastNameInput = await driver.findElement(By.css('input[placeholder="Enter Last Name"]'));
            await lastNameInput.sendKeys(lastName);
        }

        // Fill in the email
        if (email) {
            const emailInput = await driver.findElement(By.css('input[placeholder="Enter Email"]'));
            await emailInput.sendKeys(email);
        }

        // Fill in the password
        if (password) {
            const passwordInput = await driver.findElement(By.css('input[placeholder="Enter Password"]'));
            await passwordInput.sendKeys(password);
        }

        // Fill in the confirm password
        if (rePassword) {
            const rePasswordInput = await driver.findElement(By.css('input[placeholder="Confirm Password"]'));
            await rePasswordInput.sendKeys(rePassword);
        }

        // Click the register button
        const registerButton = await driver.findElement(By.css('button[type="submit"]'));
        await registerButton.click();

        // Wait for the expected result
        if (expectSuccess) {
            await driver.wait(until.urlContains('/UserDashboard'), 10000);
        } else {
            await driver.wait(until.elementLocated(By.css('.alert-danger')), 10000);
        }

        return true;
    } catch (error) {
        if (expectSuccess) {
            throw error;
        }
        return false;
    } finally {
        await driver.quit();
    }
}

module.exports = {
    registerUserFrontend,
}