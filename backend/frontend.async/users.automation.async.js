const { Builder, By, until } = require('selenium-webdriver');

async function activateUserAccount() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the login page
        await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');

        // Wait until the email input field is present
        await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);

        // Enter the predefined email and password
        await driver.findElement(By.css('input[type="email"]')).sendKeys('HomerSimpson@gmail.com');
        await driver.findElement(By.css('input[type="password"]')).sendKeys('Simpson');

        // Click the login button
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Wait for redirection to the UserProfile page or check the current URL
        await driver.wait(until.urlContains('/ManageUser'), 10000);

    } catch (err) {
        console.error('Error during profile update:', err);
        return false;
    } finally {
        await driver.quit();
    }
}

async function deactivateUserAccount() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the login page
        await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');

        // Wait until the email input field is present
        await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);

        // Enter the predefined email and password
        await driver.findElement(By.css('input[type="email"]')).sendKeys('HomerSimpson@gmail.com');
        await driver.findElement(By.css('input[type="password"]')).sendKeys('Simpson');

        // Click the login button
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Wait for redirection to the UserProfile page or check the current URL
        await driver.wait(until.urlContains('/ManageUser'), 10000);

    } catch (err) {
        console.error('Error during profile update:', err);
        return false;
    } finally {
        await driver.quit();
    }
}

async function updateUserProfileFrontend() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the login page
        await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');

        // Wait until the email input field is present
        await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);

        // Enter the predefined email and password
        await driver.findElement(By.css('input[type="email"]')).sendKeys('HomerSimpson@gmail.com');
        await driver.findElement(By.css('input[type="password"]')).sendKeys('Simpson');

        // Click the login button
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Wait for redirection to the UserProfile page or check the current URL
        await driver.wait(until.urlContains('/UserProfile'), 10000);

        // Log the current URL for debugging
        const currentUrl = await driver.getCurrentUrl();
        console.log('Current URL after login:', currentUrl);

        if (currentUrl.includes('/UserProfile')) {
            // Wait until the profile page is fully loaded
            await driver.wait(until.elementLocated(By.css('h1')), 10000);

            // Enable editing
            await driver.findElement(By.css('button[variant="warning"]')).click();

            // Update user details
            const firstNameInput = driver.findElement(By.css('input[placeholder="Enter First Name"]'));
            await firstNameInput.clear();
            await firstNameInput.sendKeys('Tom');

            const lastNameInput = driver.findElement(By.css('input[placeholder="Enter Last Name"]'));
            await lastNameInput.clear();
            await lastNameInput.sendKeys('Cat');

            const emailInput = driver.findElement(By.css('input[placeholder="Enter Email"]'));
            await emailInput.clear();
            await emailInput.sendKeys('CatTom');

            const passwordInput = driver.findElement(By.css('input[placeholder="Enter Password"]'));
            await passwordInput.clear();
            await passwordInput.sendKeys('Cat123');

            const confirmPasswordInput = driver.findElement(By.css('input[placeholder="Enter Password"]'));
            await confirmPasswordInput.clear();
            await confirmPasswordInput.sendKeys('Cat123');

            // Save changes
            await driver.findElement(By.css('button[type="submit"]')).click();

            // Wait for redirection or confirmation message
            await driver.wait(until.urlIs('https://lg2slibrarysystem.netlify.app/LoginPage'), 10000);

            return true;
        } else {
            console.error('Failed to navigate to UserProfile page. Current URL:', currentUrl);
            return false;
        }
    } catch (err) {
        console.error('Error during profile update:', err);
        return false;
    } finally {
        await driver.quit();
    }
}


async function performLoginAndNavigateToManageUsers(driver) {
    await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');
    await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);
    await driver.findElement(By.css('input[type="email"]')).sendKeys('GilbertLawrence@gmail.com');
    await driver.findElement(By.css('input[type="password"]')).sendKeys('Lawrence');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlIs('https://lg2slibrarysystem.netlify.app/AdminDashboard'), 10000);
    await driver.get('https://lg2slibrarysystem.netlify.app/ManageUsers');
}

async function searchAccountByEmailFrontend(emailInput) {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await performLoginAndNavigateToManageUsers(driver);

        const searchBar = await driver.findElement(By.css('input[placeholder="Enter User Information"]'));
        await searchBar.sendKeys(emailInput);
        await driver.sleep(2000);

        const users = await driver.findElements(By.css('tbody > tr'));
        for (let user of users) {
            const email = await user.findElement(By.css('td:nth-child(4)')).getText();
            if (!email.includes(emailInput)) {
                throw new Error('Email not found in search results');
            }
        }

        return true;
    } catch (err) {
        console.error('Error during email search:', err);
        return false;
    } finally {
        await driver.quit();
    }
}

async function searchAccountByLastNameFrontend(lastnameInput) {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await performLoginAndNavigateToManageUsers(driver);

        const searchBar = await driver.findElement(By.css('input[placeholder="Enter User Information"]'));
        await searchBar.sendKeys(lastnameInput);
        await driver.sleep(2000);

        const users = await driver.findElements(By.css('tbody > tr'));
        for (let user of users) {
            const lastname = await user.findElement(By.css('td:nth-child(3)')).getText();
            if (!lastname.toLowerCase().includes(lastnameInput.toLowerCase())) {
                throw new Error('Last name not found in search results');
            }
        }

        return true;
    } catch (err) {
        console.error('Error during last name search:', err);
        return false;
    } finally {
        await driver.quit();
    }
}

async function searchAccountByFirstNameFrontend(firstnameInput) {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await performLoginAndNavigateToManageUsers(driver);

        const searchBar = await driver.findElement(By.css('input[placeholder="Enter User Information"]'));
        await searchBar.sendKeys(firstnameInput);
        await driver.sleep(2000);

        const users = await driver.findElements(By.css('tbody > tr'));
        for (let user of users) {
            const firstname = await user.findElement(By.css('td:nth-child(2)')).getText();
            if (!firstname.toLowerCase().includes(firstnameInput.toLowerCase())) {
                throw new Error('First name not found in search results');
            }
        }

        return true;
    } catch (err) {
        console.error('Error during first name search:', err);
        return false;
    } finally {
        await driver.quit();
    }
}

async function viewAllFilterLibrarianAccountsFrontend() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await performLoginAndNavigateToManageUsers(driver);

        await driver.findElement(By.id('dropdown-basic')).click();
        await driver.findElement(By.css('div.dropdown-menu > a:nth-child(3)')).click();
        await driver.sleep(2000);

        const users = await driver.findElements(By.css('tbody > tr'));
        for (let user of users) {
            const role = await user.findElement(By.css('td:nth-child(5)')).getText();
            if (role !== 'librarian') {
                throw new Error('Non-librarian user found in librarian filter');
            }
        }

        return true;
    } catch (err) {
        console.error('Error during filtering or verification:', err);
        return false;
    } finally {
        await driver.quit();
    }
}

async function viewAllFilterUserAccountsFrontend() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await performLoginAndNavigateToManageUsers(driver);

        await driver.findElement(By.id('dropdown-basic')).click();
        await driver.findElement(By.css('div.dropdown-menu > a:nth-child(2)')).click();
        await driver.sleep(2000);

        const users = await driver.findElements(By.css('tbody > tr'));
        for (let user of users) {
            const role = await user.findElement(By.css('td:nth-child(5)')).getText();
            if (role !== 'user') {
                throw new Error('Non-user found in user filter');
            }
        }

        return true;
    } catch (err) {
        console.error('Error during filtering or verification:', err);
        return false;
    } finally {
        await driver.quit();
    }
}

async function viewAllUserFrontend(expectSuccess) {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');
        await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);
        await driver.findElement(By.css('input[type="email"]')).sendKeys('GilbertLawrence@gmail.com');
        await driver.findElement(By.css('input[type="password"]')).sendKeys('Lawrence');
        await driver.findElement(By.css('button[type="submit"]')).click();
        await driver.wait(until.urlIs('https://lg2slibrarysystem.netlify.app/AdminDashboard'), 10000);

        await driver.get('https://lg2slibrarysystem.netlify.app/ManageUsers');

        try {
            if (expectSuccess) {
                await driver.wait(until.urlContains('/ManageUsers'), 10000);
                await driver.wait(until.elementLocated(By.css('.some-specific-element')), 10000);
            } else {
                await driver.wait(until.elementLocated(By.css('.alert-danger')), 10000);
            }

            return true;
        } catch (error) {
            console.error("Error during Manage Users page verification:", error);
            if (expectSuccess) {
                throw error;
            }
            return false;
        }
    } catch (err) {
        console.error('Error during admin login or navigation:', err);
        return false;
    } finally {
        await driver.quit();
    }
}

module.exports = {
    updateUserProfileFrontend,
    searchAccountByEmailFrontend,
    searchAccountByLastNameFrontend,
    searchAccountByFirstNameFrontend,
    viewAllFilterLibrarianAccountsFrontend,
    viewAllFilterUserAccountsFrontend,
    viewAllUserFrontend,
    activateUserAccount,
    deactivateUserAccount
};
