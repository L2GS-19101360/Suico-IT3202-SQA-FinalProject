const { loginPageAdminFrontend, loginPageLibrarianFrontend, loginPageUserFrontend } = require('../frontend.async/login.automation.async');

jest.setTimeout(30000); // Set a higher timeout for Selenium tests

describe('Testing User Login Page Frontend with Jest and Selenium-Webdriver', () => {
    test('Login with valid admin credentials', async () => {
        const email = 'HomerSimpson@gmail.com';
        const password = 'Simpson';
        
        const result = await loginPageUserFrontend(email, password, true);
        expect(result).toBe(true);
    });

    test('Login with no inputs', async () => {
        const email = null;
        const password = null;
        
        const result = await loginPageUserFrontend(email, password, false);
        expect(result).toBe(false);
    });

    test('Login admin with valid email and invalid password', async () => {
        const email = 'HomerSimpson@gmail.com';
        const password = 'Apple';
        
        const result = await loginPageUserFrontend(email, password, false);
        expect(result).toBe(true);
    });

    test('Login admin with invalid email and valid password', async () => {
        const email = 'IssacNewton@gmail.com';
        const password = 'Simpson';
        
        const result = await loginPageUserFrontend(email, password, false);
        expect(result).toBe(true);
    });

    test('Login with invalid admin credentials', async () => {
        const email = 'IssacNetwon@gmail.com';
        const password = 'Apple';
        
        const result = await loginPageUserFrontend(email, password, false);
        expect(result).toBe(true);
    });
});

describe('Testing Librarian Login Page Frontend with Jest and Selenium-Webdriver', () => {
    test('Login with valid admin credentials', async () => {
        const email = 'HouseGregory@gmail.com';
        const password = 'Gregory';
        
        const result = await loginPageLibrarianFrontend(email, password, true);
        expect(result).toBe(true);
    });

    test('Login with no inputs', async () => {
        const email = null;
        const password = null;
        
        const result = await loginPageLibrarianFrontend(email, password, false);
        expect(result).toBe(false);
    });

    test('Login admin with valid email and invalid password', async () => {
        const email = 'HouseGregory@gmail.com';
        const password = 'Apple';
        
        const result = await loginPageLibrarianFrontend(email, password, false);
        expect(result).toBe(true);
    });

    test('Login admin with invalid email and valid password', async () => {
        const email = 'IssacNewton@gmail.com';
        const password = 'Gregory';
        
        const result = await loginPageLibrarianFrontend(email, password, false);
        expect(result).toBe(true);
    });

    test('Login with invalid admin credentials', async () => {
        const email = 'IssacNetwon@gmail.com';
        const password = 'Apple';
        
        const result = await loginPageLibrarianFrontend(email, password, false);
        expect(result).toBe(true);
    });
});

describe('Testing Admin Login Page Frontend with Jest and Selenium-Webdriver', () => {
    test('Login with valid admin credentials', async () => {
        const email = 'GilbertLawrence@gmail.com';
        const password = 'Lawrence';
        
        const result = await loginPageAdminFrontend(email, password, true);
        expect(result).toBe(true);
    });

    test('Login with no inputs', async () => {
        const email = null;
        const password = null;
        
        const result = await loginPageAdminFrontend(email, password, false);
        expect(result).toBe(false);
    });

    test('Login admin with valid email and invalid password', async () => {
        const email = 'GilbertLawrence@gmail.com';
        const password = 'Apple';
        
        const result = await loginPageAdminFrontend(email, password, false);
        expect(result).toBe(true);
    });

    test('Login admin with invalid email and valid password', async () => {
        const email = 'IssacNewton@gmail.com';
        const password = 'Lawrence';
        
        const result = await loginPageAdminFrontend(email, password, false);
        expect(result).toBe(true);
    });

    test('Login with invalid admin credentials', async () => {
        const email = 'IssacNetwon@gmail.com';
        const password = 'Apple';
        
        const result = await loginPageAdminFrontend(email, password, false);
        expect(result).toBe(true);
    });
});
