const { Builder, By, until } = require('selenium-webdriver');

async function loginUser(driver) {
    await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');
    await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);
    await driver.findElement(By.css('input[type="email"]')).sendKeys('HomerSimpson@gmail.com');
    await driver.findElement(By.css('input[type="password"]')).sendKeys('Homer');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlIs('https://lg2slibrarysystem.netlify.app/UserDashboard'), 10000);
}

async function navigateToUserProfile(driver) {
    await driver.get('https://lg2slibrarysystem.netlify.app/UserProfile');
}

async function updateUserProfile(data) {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        await loginUser(driver);
        await navigateToUserProfile(driver);

        
        return true;
    } catch (error) {
        // Log any errors that occur
        console.error("Error updating user profile:", error);
        return false;
    } finally {
        // Quit the WebDriver session
        await driver.quit();
    }
}

async function loginAdmin(driver) {
    await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');
    await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);
    await driver.findElement(By.css('input[type="email"]')).sendKeys('GilbertLawrence@gmail.com');
    await driver.findElement(By.css('input[type="password"]')).sendKeys('Lawrence');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlIs('https://lg2slibrarysystem.netlify.app/AdminDashboard'), 10000);
}

async function navigateToManageUsers(driver) {
    await driver.get('https://lg2slibrarysystem.netlify.app/ManageUsers');
    await driver.wait(until.elementLocated(By.css('table')), 10000); // Wait until the table is present
}

async function findUserRow(driver, userId) {
    const numericUserId = Number(userId); // Ensure userId is a number
    const userRowSelector = `//tr[td[contains(text(), '${numericUserId}')]]`;
    console.log(`Looking for user row with selector: ${userRowSelector}`); // Added logging for debugging
    await driver.wait(until.elementLocated(By.xpath(userRowSelector)), 10000); // Wait until the row is present
    return await driver.findElement(By.xpath(userRowSelector));
}

async function activateUserAccount(driver, userId) {
    try {
        const userRow = await findUserRow(driver, userId);
        const activateButton = await userRow.findElement(By.css('#activate-button'));

        // Increase the wait time for element visibility check
        await driver.wait(until.elementIsVisible(activateButton), 15000); // Increased wait time to 15 seconds

        await activateButton.click();

        // Wait for the activate button to disappear or for a specific condition indicating activation completion
        await driver.wait(async () => {
            try {
                await activateButton.isDisplayed();
                return false; // Still visible, wait more
            } catch (error) {
                return true; // Not visible anymore, activation completed
            }
        }, 20000); // Increased wait time to 20 seconds

        return true;
    } catch (err) {
        console.error('Error during activating user:', err);
        return false;
    }
}

async function deactivateUserAccount(driver, userId) {
    try {
        const userRow = await findUserRow(driver, userId);
        const deactivateButton = await userRow.findElement(By.css('#deactivate-button'));
        await driver.wait(until.elementIsVisible(deactivateButton), 15000); // Increased wait time to 15 seconds
        await deactivateButton.click();

        // Wait for the deactivate button to disappear or for a specific condition indicating deactivation completion
        await driver.wait(async () => {
            try {
                await deactivateButton.isDisplayed();
                return false; // Still visible, wait more
            } catch (error) {
                return true; // Not visible anymore, deactivation completed
            }
        }, 20000); // Increased wait time to 20 seconds

        return true;
    } catch (err) {
        console.error('Error during deactivating user:', err);
        return false;
    }
}

async function updateUserByActivateButton(userId) {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        await loginAdmin(driver);
        await navigateToManageUsers(driver);
        return await activateUserAccount(driver, userId);
    } finally {
        await driver.quit();
    }
}

async function updateUserByDeactivateButton(userId) {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        await loginAdmin(driver);
        await navigateToManageUsers(driver);
        return await deactivateUserAccount(driver, userId);
    } finally {
        await driver.quit();
    }
}

async function searchUser(driver, searchInput) {
    // Wait until the search input field is present
    await driver.wait(until.elementLocated(By.css('input[placeholder="Enter User Information"]')), 10000);

    // Enter the search query
    await driver.findElement(By.css('input[placeholder="Enter User Information"]')).sendKeys(searchInput);

    // Optionally, add a wait to ensure search results are loaded
    await driver.sleep(2000);

    // Check if any user results are displayed
    const userRows = await driver.findElements(By.css('table tbody tr'));
    return userRows.length > 0;
}

async function filterUsersByRole(driver, role) {
    // Wait until the dropdown is present
    await driver.wait(until.elementLocated(By.id('dropdown-basic')), 10000);

    // Click the dropdown
    await driver.findElement(By.id('dropdown-basic')).click();

    // Wait until the dropdown options are visible
    await driver.wait(until.elementLocated(By.css('.dropdown-menu.show')), 10000);

    // Click the desired role option
    const roleOption = await driver.findElement(By.xpath(`//a[text()="${role}"]`));
    await roleOption.click();

    // Optionally, add a wait to ensure filter results are loaded
    await driver.sleep(2000);

    // Check if any user results are displayed
    const userRows = await driver.findElements(By.css('table tbody tr'));
    return userRows.length > 0;
}

async function viewUsersBySearchInput(searchInput) {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await loginAdmin(driver);
        await navigateToManageUsers(driver);
        return await searchUser(driver, searchInput);
    } catch (err) {
        console.error('Error during search users by input:', err);
        return false;
    } finally {
        await driver.quit();
    }
}

async function filterUsersByRoleOption(role) {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await loginAdmin(driver);
        await navigateToManageUsers(driver);
        return await filterUsersByRole(driver, role);
    } catch (err) {
        console.error('Error during filter users by role:', err);
        return false;
    } finally {
        await driver.quit();
    }
}

module.exports = {
    viewUsersBySearchInput,
    filterUsersByRoleOption,
    updateUserByActivateButton,
    updateUserByDeactivateButton,
    updateUserProfile
};
