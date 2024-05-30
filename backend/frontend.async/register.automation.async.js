const { Builder, By, until } = require('selenium-webdriver');

async function registerLibrarianFrontend(firstName, lastName, email, password, rePassword, expectSuccess) {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        console.log("Navigating to Login Page");
        await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');

        console.log("Entering login credentials");
        await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);
        await driver.findElement(By.css('input[type="email"]')).sendKeys('Lawrence123@gmail.com');
        await driver.findElement(By.css('input[type="password"]')).sendKeys('Lawrence');
        await driver.findElement(By.css('button[type="submit"]')).click();

        console.log("Waiting for Admin Dashboard to load");
        await driver.wait(until.urlIs('https://lg2slibrarysystem.netlify.app/AdminDashboard'), 10000);

        console.log("Navigating to Manage Users");
        await driver.get('https://lg2slibrarysystem.netlify.app/ManageUsers');
        const createLibrarianButton = await driver.findElement(By.css('button.btn-success'));
        await createLibrarianButton.click();

        console.log("Waiting for Register Modal to show");
        await driver.wait(until.elementLocated(By.css('.modal.show')), 10000);

        if (firstName) {
            console.log(`Entering First Name: ${firstName}`);
            const firstNameInput = await driver.findElement(By.css('input[placeholder="Enter First Name"]'));
            await firstNameInput.sendKeys(firstName);
        }

        if (lastName) {
            console.log(`Entering Last Name: ${lastName}`);
            const lastNameInput = await driver.findElement(By.css('input[placeholder="Enter Last Name"]'));
            await lastNameInput.sendKeys(lastName);
        }

        if (email) {
            console.log(`Entering Email: ${email}`);
            const emailInput = await driver.findElement(By.css('input[placeholder="Enter Email"]'));
            await emailInput.sendKeys(email);
        }

        if (password) {
            console.log(`Entering Password`);
            const passwordInput = await driver.findElement(By.css('input[placeholder="Enter Password"]'));
            await passwordInput.sendKeys(password);
        }

        if (rePassword) {
            console.log(`Re-entering Password`);
            const rePasswordInput = await driver.findElement(By.css('input[placeholder="Re-Enter Password"]'));
            await rePasswordInput.sendKeys(rePassword);
        }

        console.log("Submitting the registration form");
        const registerButton = await driver.findElement(By.css('button[type="submit"]'));
        await registerButton.click();

        if (expectSuccess) {
            console.log("Waiting for success indicator");
            try {
                await driver.wait(until.elementLocated(By.css('.alert-success')), 20000);
                console.log("Registration success indicator found.");
            } catch (e) {
                console.error("Success indicator not found within timeout:", e);
                return true;
            }
        } else {
            console.log("Waiting for failure indicator");
            try {
                await driver.wait(until.elementLocated(By.css('.alert-danger')), 10000);
                console.log("Expected failure indicator found.");
            } catch (e) {
                console.error("Failure indicator not found within timeout:", e);
                return false;
            }
        }

        return true;
    } catch (error) {
        console.error("An error occurred:", error);
        return false;
    } finally {
        console.log("Closing the browser");
        await driver.sleep(5000); // Add a delay to allow observation
        await driver.quit();
    }
}

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
    registerLibrarianFrontend,
}