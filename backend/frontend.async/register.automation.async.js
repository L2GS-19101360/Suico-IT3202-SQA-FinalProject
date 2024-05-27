const { Builder, By, until } = require('selenium-webdriver');

async function registerLibrarianFrontend(firstName, lastName, email, password, rePassword, expectSuccess) {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the login page
        await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');

        // Wait until the email input field is present
        await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);

        // Enter the predefined email and password
        await driver.findElement(By.css('input[type="email"]')).sendKeys('GilbertLawrence@gmail.com');
        await driver.findElement(By.css('input[type="password"]')).sendKeys('Lawrence');

        // Click the login button
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Wait for redirection to Admin Dashboard
        await driver.wait(until.urlIs('https://lg2slibrarysystem.netlify.app/AdminDashboard'), 10000);

        try {
            // Navigate to the Manage Users page
            await driver.get('https://lg2slibrarysystem.netlify.app/ManageUsers');

            // Click on the button to open the Create Librarian Modal
            const createLibrarianButton = await driver.findElement(By.css('button.btn-success'));
            await createLibrarianButton.click();

            // Wait until the modal is visible
            await driver.wait(until.elementLocated(By.css('.modal.show')), 10000);

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
                const rePasswordInput = await driver.findElement(By.css('input[placeholder="Enter Password"]'));
                await rePasswordInput.sendKeys(rePassword);
            }

            // Click the register button
            const registerButton = await driver.findElement(By.css('button[type="submit"]'));
            await registerButton.click();

            // Wait for the expected result
            if (expectSuccess) {
                await driver.wait(until.urlContains('/ManageUsers'), 10000); // Update this as needed based on success criteria
            } else {
                await driver.wait(until.elementLocated(By.css('.alert-danger')), 10000);
            }

            return true;
        } catch (error) {
            if (expectSuccess) {
                throw error;
            }
            return false;
        } 
        
        console.log('Admin login successful and navigated to Admin Dashboard');

    } catch (err) {
        console.error('Error during admin login:', err);
    } finally {
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