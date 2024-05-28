const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');

async function createNewBookFrontend(bookImageFile, bookImageFileName, bookName, bookAuthor, bookGenre, bookContentFile, bookContentFileName) {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the login page
        await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');
        console.log('Navigated to login page');

        // Wait until the email input field is present
        await driver.wait(until.elementLocated(By.css('input[type="email"]')), 20000);
        await driver.findElement(By.css('input[type="email"]')).sendKeys('GilbertLawrence@gmail.com');
        await driver.findElement(By.css('input[type="password"]')).sendKeys('Lawrence');
        await driver.findElement(By.css('button[type="submit"]')).click();
        console.log('Logged in');

        // Wait for redirection to Admin Dashboard
        await driver.wait(until.urlIs('https://lg2slibrarysystem.netlify.app/AdminDashboard'), 20000);
        console.log('Navigated to Admin Dashboard');

        // Navigate to the Manage Books page
        await driver.get('https://lg2slibrarysystem.netlify.app/ManageBooks');
        console.log('Navigated to Manage Books page');

        // Wait until the "Create New Book" button is present and click it to open the modal
        await driver.wait(until.elementLocated(By.css('button.btn-success')), 10000);
        const createBookButton = await driver.findElement(By.css('button.btn-success'));
        await createBookButton.click();
        console.log('Clicked "Create New Book" button');

        // Wait until the modal is visible
        await driver.wait(until.elementLocated(By.css('.modal.show')), 10000);

        // Fill in the book details
        const bookImageFilePath = path.resolve(__dirname, bookImageFile);
        const bookContentFilePath = path.resolve(__dirname, bookContentFile);

        await driver.findElement(By.css('input[type="file"][accept="image/jpeg, image/png"]')).sendKeys(bookImageFilePath);
        await driver.findElement(By.css('input[placeholder="Enter Book Title"]')).sendKeys(bookName);
        await driver.findElement(By.css('input[placeholder="Enter Book Author"]')).sendKeys(bookAuthor);

        // Select genre from dropdown
        await driver.findElement(By.css('.dropdown-toggle')).click();
        await driver.findElement(By.xpath(`//a[contains(text(), "${bookGenre}")]`)).click();

        await driver.findElement(By.css('input[type="file"][accept=".pdf"]')).sendKeys(bookContentFilePath);

        // Wait for the "Store Book" button to be present and visible
        const storeButtonSelector = 'button.store-book';
        await driver.wait(until.elementLocated(By.css(storeButtonSelector)), 20000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.css(storeButtonSelector))), 20000);
        console.log('Found "Store Book" button');

        // Click on the "Store Book" button
        await driver.findElement(By.css(storeButtonSelector)).click();

        // Wait for the modal to close indicating the book was created successfully
        await driver.wait(until.elementIsNotVisible(driver.findElement(By.css('.modal.show'))), 10000);

        console.log('Book creation process completed successfully');
        return true;
    } catch (err) {
        console.error('Error during book creation:', err);
        const pageSource = await driver.getPageSource();
        console.log('Page source at time of error:', pageSource);
        return false;
    } finally {
        await driver.quit();
    }
}

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
    createNewBookFrontend,
    viewAllBooksFrontend,
    viewBooksByTitleSearchBar,
    viewBooksByAuthorSearchBar,
    viewBooksByFilterOption
};
