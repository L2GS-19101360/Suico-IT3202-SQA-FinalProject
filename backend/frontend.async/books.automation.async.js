const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');

async function loginAdmin(driver) {
    await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');
    await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);
    await driver.findElement(By.css('input[type="email"]')).sendKeys('GilbertLawrence@gmail.com');
    await driver.findElement(By.css('input[type="password"]')).sendKeys('Lawrence');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlIs('https://lg2slibrarysystem.netlify.app/AdminDashboard'), 10000);
}

async function navigateToManageBooks(driver) {
    await driver.get('https://lg2slibrarysystem.netlify.app/ManageBooks');
    await driver.wait(until.elementLocated(By.css('table')), 10000); // Wait until the table is present
}

async function findBookRow(driver, bookId) {
    const bookRowSelector = `//tbody/tr[td[normalize-space(text())='${bookId}']]`;
    try {
        await driver.wait(until.elementLocated(By.xpath(bookRowSelector)), 10000);
        return await driver.findElement(By.xpath(bookRowSelector));
    } catch (error) {
        console.error(`Error finding book row with ID ${bookId}:`, error);
        return null;
    }
}

async function deleteBookFrontend(bookId) {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await loginAdmin(driver);
        await navigateToManageBooks(driver);

        const bookRow = await findBookRow(driver, bookId);

        if (!bookRow) {
            console.error(`Book with ID ${bookId} not found`);
            return false; // Book not found, return false
        }

        const deleteButton = await bookRow.findElement(By.css(`button[id^="delete-book-${bookId}"]`));
        await deleteButton.click();

        await driver.wait(async () => {
            const rows = await driver.findElements(By.xpath(`//tbody/tr[td[normalize-space(text())='${bookId}']]`));
            return rows.length === 0;
        }, 10000);

        return true; // Deletion successful
    } catch (err) {
        console.error(`Error during book deletion:`, err);
        return false;
    } finally {
        await driver.quit();
    }
}


async function createNewBookFrontend(bookImageFile, bookImageFileName, bookName, bookAuthor, bookGenre, bookContentFile, bookContentFileName) {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');

        await driver.wait(until.elementLocated(By.css('input[type="email"]')), 20000);
        await driver.findElement(By.css('input[type="email"]')).sendKeys('GilbertLawrence@gmail.com');
        await driver.findElement(By.css('input[type="password"]')).sendKeys('Lawrence');
        await driver.findElement(By.css('button[type="submit"]')).click();

        await driver.wait(until.urlIs('https://lg2slibrarysystem.netlify.app/AdminDashboard'), 20000);

        await driver.get('https://lg2slibrarysystem.netlify.app/ManageBooks');

        await driver.wait(until.elementLocated(By.css('button.btn-success')), 10000);
        const createBookButton = await driver.findElement(By.css('button.btn-success'));
        await createBookButton.click();

        await driver.wait(until.elementLocated(By.css('.modal.show')), 10000);

        const bookImageFilePath = path.resolve(__dirname, bookImageFile);
        const bookContentFilePath = path.resolve(__dirname, bookContentFile);

        await driver.findElement(By.css('input[type="file"][accept="image/jpeg, image/png"]')).sendKeys(bookImageFilePath);
        await driver.findElement(By.css('input[placeholder="Enter Book Title"]')).sendKeys(bookName);
        await driver.findElement(By.css('input[placeholder="Enter Book Author"]')).sendKeys(bookAuthor);

        const dropdownButton = await driver.wait(until.elementLocated(By.css('button[id="dropdown-basic"]')), 10000);
        await driver.executeScript("arguments[0].scrollIntoView(true)", dropdownButton);
        await dropdownButton.click();

        const genreOption = await driver.findElement(By.xpath(`//div[contains(@class, "dropdown-menu")]/button[text()="${bookGenre}"]`));
        await driver.executeScript("arguments[0].scrollIntoView(true)", genreOption);
        await genreOption.click();

        await driver.findElement(By.css('input[type="file"][accept=".pdf"]')).sendKeys(bookContentFilePath);

        const storeButtonSelector = 'button.store-book';
        await driver.wait(until.elementLocated(By.css(storeButtonSelector)), 20000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.css(storeButtonSelector))), 20000);

        await driver.executeScript("arguments[0].scrollIntoView(true)", driver.findElement(By.css(storeButtonSelector)));
        await driver.findElement(By.css(storeButtonSelector)).click();

        await driver.wait(until.elementIsNotVisible(driver.findElement(By.css('.modal.show'))), 10000);

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
    viewBooksByFilterOption,
    deleteBookFrontend
};
