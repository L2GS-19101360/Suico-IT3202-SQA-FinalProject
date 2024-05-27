const { viewAllUserFrontend, viewAllFilterUserAccountsFrontend, viewAllFilterLibrarianAccountsFrontend, searchAccountByFirstNameFrontend, searchAccountByLastNameFrontend, searchAccountByEmailFrontend, updateUserProfileFrontend, activateUserAccount, deactivateUserAccount } = require('../frontend.async/users.automation.async');

jest.setTimeout(30000);

async function performLoginAndNavigateToManageUsers(driver) {
    await driver.get('https://lg2slibrarysystem.netlify.app/LoginPage');
    await driver.wait(until.elementLocated(By.css('input[type="email"]')), 10000);
    await driver.findElement(By.css('input[type="email"]')).sendKeys('GilbertLawrence@gmail.com');
    await driver.findElement(By.css('input[type="password"]')).sendKeys('Lawrence');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlIs('https://lg2slibrarysystem.netlify.app/AdminDashboard'), 10000);
    await driver.get('https://lg2slibrarysystem.netlify.app/ManageUsers');
}

describe('Testing Activate and Deactivate User and Librarian Accounts Frontend with Jest and Selenium-Webdriver', () => {
    test('Activate User Account using the FaUnlockAlt button', async () => {
        const driver = await new Builder().forBrowser('chrome').build();
        try {
            await performLoginAndNavigateToManageUsers(driver);

            // Search for the user
            const searchBar = await driver.findElement(By.css('input[placeholder="Enter User Information"]'));
            await searchBar.sendKeys('HomerSimpson@gmail.com');
            await driver.sleep(2000);

            // Find the activation button (FaUnlockAlt) and click it
            const activateButton = await driver.findElement(By.css('td button[variant="success"]'));
            await activateButton.click();
            
            // Wait for the user to be activated (checking green "active" status)
            await driver.wait(until.elementLocated(By.css('td p[style*="color: green"]')), 5000);

            expect(true).toBe(true);
        } catch (err) {
            console.error('Error activating user account:', err);
            expect(false).toBe(true); // Fail the test
        } finally {
            await driver.quit();
        }
    });

    test('Deactivate User Account using the FaLock button', async () => {
        const driver = await new Builder().forBrowser('chrome').build();
        try {
            await performLoginAndNavigateToManageUsers(driver);

            // Search for the user
            const searchBar = await driver.findElement(By.css('input[placeholder="Enter User Information"]'));
            await searchBar.sendKeys('HomerSimpson@gmail.com');
            await driver.sleep(2000);

            // Find the deactivation button (FaLock) and click it
            const deactivateButton = await driver.findElement(By.css('td button[variant="danger"]'));
            await deactivateButton.click();

            // Wait for the user to be deactivated (checking red "inactive" status)
            await driver.wait(until.elementLocated(By.css('td p[style*="color: red"]')), 5000);

            expect(true).toBe(true);
        } catch (err) {
            console.error('Error deactivating user account:', err);
            expect(false).toBe(true); // Fail the test
        } finally {
            await driver.quit();
        }
    });

    test('Activate Librarian Account using the FaUnlockAlt button', async () => {
        const driver = await new Builder().forBrowser('chrome').build();
        try {
            await performLoginAndNavigateToManageUsers(driver);

            // Filter for librarians
            await driver.findElement(By.id('dropdown-basic')).click();
            await driver.findElement(By.css('div.dropdown-menu > a:nth-child(3)')).click();
            await driver.sleep(2000);

            // Find the activation button (FaUnlockAlt) and click it
            const activateButton = await driver.findElement(By.css('td button[variant="success"]'));
            await activateButton.click();

            // Wait for the librarian to be activated (checking green "active" status)
            await driver.wait(until.elementLocated(By.css('td p[style*="color: green"]')), 5000);

            expect(true).toBe(true);
        } catch (err) {
            console.error('Error activating librarian account:', err);
            expect(false).toBe(true); // Fail the test
        } finally {
            await driver.quit();
        }
    });

    test('Deactivate Librarian Account using the FaLock button', async () => {
        const driver = await new Builder().forBrowser('chrome').build();
        try {
            await performLoginAndNavigateToManageUsers(driver);

            // Filter for librarians
            await driver.findElement(By.id('dropdown-basic')).click();
            await driver.findElement(By.css('div.dropdown-menu > a:nth-child(3)')).click();
            await driver.sleep(2000);

            // Find the deactivation button (FaLock) and click it
            const deactivateButton = await driver.findElement(By.css('td button[variant="danger"]'));
            await deactivateButton.click();

            // Wait for the librarian to be deactivated (checking red "inactive" status)
            await driver.wait(until.elementLocated(By.css('td p[style*="color: red"]')), 5000);

            expect(true).toBe(true);
        } catch (err) {
            console.error('Error deactivating librarian account:', err);
            expect(false).toBe(true); // Fail the test
        } finally {
            await driver.quit();
        }
    });
});

// describe('Testing User Profile Update Frontend with Jest and Selenium-Webdriver', () => {
//     test('Update User Account with all required information', async () => {
//         const data = {
//             image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FTom.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Tom.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=xk9r1AdyQ87NM023U%2FPesk7I%2BO%2BNFP9hdPTZgOBfVtJUuuL0YtacNeXdYX0EKBERqulVI%2Fy68dPWfuCshVEafg4RXPW6%2FJieVOVTCruLjHUsMnN3CmcWXdhYuz3e3xhaa8nCBXmaW8HE2ocrgAbbl%2FUpYc2s6QOmGnjf4D6HESvrcl8ZECRUrpvhDDJbSPquwVz%2FfGbYDCOAq7uqdqptEUkIrFpwCbr2PwOyORzlOn84%2F9H8lDpENwmRhHIIAAToXx4YWZUeyALb%2BSwjkkfF1c90XFHPSgNI55mqzT0KeWDqWmllwE9A7G2lJl554OqI2HSnxtZeBQ859shdCaQJag%3D%3D",
//             image_filename: "Tom.jpg",
//             firstname: "Tom",
//             lastname: "Cat",
//             email: "CatTom@gmail.com",
//             password: "Cat123"
//         }
        
//         const result = await updateUserProfileFrontend();
//         expect(result).toBe(true);
//     });
// });

// describe('Testing Admin Manage User Frontend with Jest and Selenium-Webdriver', () => {
//     test('View All Users Frontend', async () => {
//         const result = await viewAllUserFrontend(true);
//         expect(result).toBe(true);
//     });

//     test('View All Filter Users Accounts Frontend', async () => {
//         const result = await viewAllFilterUserAccountsFrontend();
//         expect(result).toBe(true);
//     });

//     test('View All Filter Librarian Accounts Frontend', async () => {
//         const result = await viewAllFilterLibrarianAccountsFrontend();
//         expect(result).toBe(true);
//     });

//     test('Search Account by first name in Search Bar', async () => {
//         const result = await searchAccountByFirstNameFrontend("Homer");
//         expect(result).toBe(true);
//     });

//     test('Search Account by last name in Search Bar', async () => {
//         const result = await searchAccountByLastNameFrontend("Simpson");
//         expect(result).toBe(true);
//     });

//     test('Search Account by email in Search Bar', async () => {
//         const result = await searchAccountByEmailFrontend("HomerSimpson@gmail.com");
//         expect(result).toBe(true);
//     });
// });
