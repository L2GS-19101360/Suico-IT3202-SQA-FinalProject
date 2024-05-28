const { Builder, By, until } = require('selenium-webdriver');

async function loginAdmin(driver) {
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
}

async function navigateToManageUsers(driver) {
    // Navigate to the Manage Users page
    await driver.get('https://lg2slibrarysystem.netlify.app/ManageUsers');
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
    filterUsersByRoleOption
};
