const { Builder, By, until } = require('selenium-webdriver');

async function viewBooksByFilterOption(filteredGenre) {
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

        // Navigate to the Manage Books page
        await driver.get('https://lg2slibrarysystem.netlify.app/ManageBooks');

        // Wait until the dropdown is present
        await driver.wait(until.elementLocated(By.id('dropdown-basic')), 10000);

        // Click the dropdown to open it
        await driver.findElement(By.id('dropdown-basic')).click();

        // Select the genre from the dropdown
        await driver.wait(until.elementLocated(By.xpath(`//a[contains(text(), '${filteredGenre}')]`)), 10000).click();

        // Wait for the table with books to be updated based on the selected genre
        await driver.wait(until.elementLocated(By.css('table tbody tr')), 10000);

        // Fetch the table rows
        let rows = await driver.findElements(By.css('table tbody tr'));
        console.log(`Number of books found for genre "${filteredGenre}": ${rows.length}`);

        // Ensure there are rows matching the selected genre
        if (rows.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error(`Error during filtering books by genre "${filteredGenre}":`, err);
        return false;
    } finally {
        await driver.quit();
    }
}

async function viewBooksByAuthorSearchBar(searchInput) {
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

        // Navigate to the Manage Books page
        await driver.get('https://lg2slibrarysystem.netlify.app/ManageBooks');

        // Wait until the search input field is present
        await driver.wait(until.elementLocated(By.css('input[placeholder="Enter Book Information"]')), 10000);

        // Enter the search input
        await driver.findElement(By.css('input[placeholder="Enter Book Information"]')).sendKeys(searchInput);

        // Wait for the table with books to be updated based on the search input
        await driver.wait(until.elementLocated(By.css('table tbody tr')), 10000);

        // Fetch the table rows
        let rows = await driver.findElements(By.css('table tbody tr'));
        console.log(`Number of books found: ${rows.length}`);

        // Ensure there are rows matching the search input
        if (rows.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error('Error during book search:', err);
        return false;
    } finally {
        await driver.quit();
    }
}

async function viewBooksByTitleSearchBar(searchInput) {
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

        // Navigate to the Manage Books page
        await driver.get('https://lg2slibrarysystem.netlify.app/ManageBooks');

        // Wait until the search input field is present
        await driver.wait(until.elementLocated(By.css('input[placeholder="Enter Book Information"]')), 10000);

        // Enter the search input
        await driver.findElement(By.css('input[placeholder="Enter Book Information"]')).sendKeys(searchInput);

        // Wait for the table with books to be updated based on the search input
        await driver.wait(until.elementLocated(By.css('table tbody tr')), 10000);

        // Fetch the table rows
        let rows = await driver.findElements(By.css('table tbody tr'));
        console.log(`Number of books found: ${rows.length}`);

        // Ensure there are rows matching the search input
        if (rows.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error('Error during book search:', err);
        return false;
    } finally {
        await driver.quit();
    }
}

async function viewAllBooksFrontend() {
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

        // Navigate to the Manage Books page
        await driver.get('https://lg2slibrarysystem.netlify.app/ManageBooks');

        // Wait until the table with books is present
        await driver.wait(until.elementLocated(By.css('table')), 10000);

        console.log('Admin login successful and navigated to Manage Books');

        return true;
    } catch (err) {
        console.error('Error during admin login or navigation:', err);
        return false;
    } finally {
        await driver.quit();
    }
}

module.exports = {
    viewAllBooksFrontend,
    viewBooksByTitleSearchBar,
    viewBooksByAuthorSearchBar,
    viewBooksByFilterOption
};
