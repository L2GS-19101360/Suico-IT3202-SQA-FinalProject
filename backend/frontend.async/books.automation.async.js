const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');

async function loginAdmin(driver) {
    await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');
    await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);
    await driver.findElement(By.css('input[type="email"]')).sendKeys('Lawrence123@gmail.com');
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

async function updateSelectedBookFrontend(selectedBookId, bookImageFile, bookName, bookAuthor, bookGenre, bookContentFile, isValid) {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await loginAdmin(driver);
        await navigateToManageBooks(driver);

        const bookRow = await findBookRow(driver, selectedBookId);

        if (!bookRow) {
            console.error(`Book with ID ${selectedBookId} not found`);
            return false; // Book not found, return false
        }

        // Find and click the update button within the book row
        const updateButton = await bookRow.findElement(By.css(`button[variant="warning"], button.btn-warning`));
        await updateButton.click();

        // Wait for the modal to appear
        await driver.wait(until.elementLocated(By.css('.modal.show')), 20000);

        // Clear previous values and enter new ones
        if (bookImageFile) {
            const absoluteImagePath = path.resolve(__dirname, '..', 'sampleBookData', bookImageFile);
            const imageInput = await driver.findElement(By.css('.book-image-input'));
            await driver.wait(until.elementIsVisible(imageInput), 5000); // Wait for visibility
            await imageInput.clear();
            await imageInput.sendKeys(absoluteImagePath);
        }

        if (bookName) {
            const titleInput = await driver.findElement(By.css('.book-title-input'));
            await driver.wait(until.elementIsVisible(titleInput), 5000); // Wait for visibility
            await titleInput.clear();
            await titleInput.sendKeys(bookName);
        }

        if (bookAuthor) {
            const authorInput = await driver.findElement(By.css('.book-author-input'));
            await driver.wait(until.elementIsVisible(authorInput), 5000); // Wait for visibility
            await authorInput.clear();
            await authorInput.sendKeys(bookAuthor);
        }

        if (bookGenre) {
            const genreInput = await driver.findElement(By.css('.book-genre-input'));
            await driver.wait(until.elementIsVisible(genreInput), 5000); // Wait for visibility
            await genreInput.clear();
            await genreInput.sendKeys(bookGenre);
        }

        if (bookContentFile) {
            const absoluteContentPath = path.resolve(__dirname, '..', 'sampleBookData', bookContentFile);
            const contentInput = await driver.findElement(By.css('.book-content-input'));
            await driver.wait(until.elementIsVisible(contentInput), 5000); // Wait for visibility
            await contentInput.clear();
            await contentInput.sendKeys(absoluteContentPath);
        }

        // Re-locate the submit button before clicking it
        const submitButton = await driver.findElement(By.css('.modal.show button[variant="warning"], .modal.show button.btn-warning'));
        await driver.wait(until.elementIsVisible(submitButton), 5000); // Wait for visibility
        await submitButton.click();

        // // Add any additional wait conditions if necessary, e.g., wait for a success message
        // await driver.wait(until.elementIsNotVisible(submitButton), 10000);

        if (isValid) {
            // Wait for the book to appear in the table
            await driver.wait(until.elementLocated(By.xpath(`//td[contains(text(), '${bookName}')]`)), 10000);
        } else {
            // Wait for the alert to appear
            await driver.wait(until.elementLocated(By.css('.alert-danger')), 20000);
        }

        return true;
    } catch (err) {
        console.error('Error during book update:', err);
        const pageSource = await driver.getPageSource();
        console.log('Page source at time of error:', pageSource);

        if (isValid) {
            throw err; // Throw error if it's a valid test case
        } else {
            return false; // Return false if it's an invalid test case
        }
    } finally {
        await driver.sleep(5000);
        await driver.quit();
    }
}



async function createNewBookFrontend(bookImageFile, bookName, bookAuthor, bookGenre, bookContentFile, isValid) {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');

        // Login
        await driver.wait(until.elementLocated(By.css('input[type="email"]')), 20000);
        await driver.findElement(By.css('input[type="email"]')).sendKeys('Lawrence123@gmail.com');
        await driver.findElement(By.css('input[type="password"]')).sendKeys('Lawrence');
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Wait for login success and navigate to Admin Dashboard
        await driver.wait(until.urlIs('https://lg2slibrarysystem.netlify.app/AdminDashboard'), 20000);

        // Navigate to Manage Books
        await driver.get('https://lg2slibrarysystem.netlify.app/ManageBooks');

        // Click on Create New Book button
        await driver.wait(until.elementLocated(By.css('button.btn-success')), 10000);
        const createBookButton = await driver.findElement(By.css('button.btn-success'));
        await createBookButton.click();

        // Wait for the modal to appear
        await driver.wait(until.elementLocated(By.css('.modal.show')), 10000);

        if (bookImageFile) {
            const absoluteImagePath = path.resolve(__dirname, '..', 'sampleBookData', bookImageFile);
            await driver.findElement(By.css('.book-image-input')).sendKeys(absoluteImagePath);
        }

        if (bookName) {
            await driver.findElement(By.css('.book-title-input')).sendKeys(bookName);
        }

        if (bookAuthor) {
            await driver.findElement(By.css('.book-author-input')).sendKeys(bookAuthor);
        }

        if (bookGenre) {
            await driver.findElement(By.css('.book-genre-input')).sendKeys(bookGenre);
        }

        if (bookContentFile) {
            const absoluteContentPath = path.resolve(__dirname, '..', 'sampleBookData', bookContentFile);
            await driver.findElement(By.css('.book-content-input')).sendKeys(absoluteContentPath);
        }

        // Click on Store Book button
        await driver.findElement(By.id('store-book')).click();

        if (isValid) {
            // Wait for the book to appear in the table
            await driver.wait(until.elementLocated(By.xpath(`//td[contains(text(), '${bookName}')]`)), 10000);
        } else {
            // Wait for the alert to appear
            await driver.wait(until.elementLocated(By.css('.alert-danger')), 10000);
        }

        return true;
    } catch (err) {
        console.error('Error during book creation:', err);
        const pageSource = await driver.getPageSource();
        console.log('Page source at time of error:', pageSource);

        if (isValid) {
            throw err; // Throw error if it's a valid test case
        } else {
            return false; // Return false if it's an invalid test case
        }
    } finally {
        // Wait for a few seconds before quitting the WebDriver session
        await driver.sleep(5000);
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
        await driver.findElement(By.css('input[type="email"]')).sendKeys('Lawrence123@gmail.com');
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
        await driver.findElement(By.css('input[type="email"]')).sendKeys('Lawrence123@gmail.com');
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
        await driver.findElement(By.css('input[type="email"]')).sendKeys('Lawrence123@gmail.com');
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
        await driver.findElement(By.css('input[type="email"]')).sendKeys('Lawrence123@gmail.com');
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
    deleteBookFrontend,
    updateSelectedBookFrontend
};
