const { loginPageAdminFrontend, loginPageLibrarianFrontend, loginPageUserFrontend } = require('../frontend.async/login.automation.async');

jest.setTimeout(30000); // Set a higher timeout for Selenium tests

describe('Testing User Login Page Frontend with Jest and Selenium-Webdriver', () => {
    test('Login with valid user credentials', async () => {
        const email = 'HomerSimpson123@gmail.com';
        const password = 'Homer123';
        
        const result = await loginPageUserFrontend(email, password, true);
        expect(result).toBe(true);
    });

    test('Login with no inputs', async () => {
        const email = null;
        const password = null;
        
        const result = await loginPageUserFrontend(email, password, false);
        expect(result).toBe(false);
    });

    test('Login user with valid email and invalid password', async () => {
        const email = 'HomerSimpson123@gmail.com';
        const password = 'Apple';
        
        const result = await loginPageUserFrontend(email, password, false);
        expect(result).toBe(true);
    });

    test('Login user with invalid email and valid password', async () => {
        const email = 'IssacNewton@gmail.com';
        const password = 'Homer123';
        
        const result = await loginPageUserFrontend(email, password, false);
        expect(result).toBe(true);
    });

    test('Login with invalid user credentials', async () => {
        const email = 'IssacNetwon@gmail.com';
        const password = 'Apple';
        
        const result = await loginPageUserFrontend(email, password, false);
        expect(result).toBe(true);
    });

    test('Login with deactivated user credentials', async () => {
        const email = 'BobJones@gmail.com';
        const password = 'Jones';
        
        const result = await loginPageUserFrontend(email, password, false);
        expect(result).toBe(true);
    });
});

describe('Testing Librarian Login Page Frontend with Jest and Selenium-Webdriver', () => {
    test('Login with valid librarian credentials', async () => {
        const email = 'House123@gmail.com';
        const password = 'House';
        
        const result = await loginPageLibrarianFrontend(email, password, true);
        expect(result).toBe(true);
    });

    test('Login with no inputs', async () => {
        const email = null;
        const password = null;
        
        const result = await loginPageLibrarianFrontend(email, password, false);
        expect(result).toBe(false);
    });

    test('Login librarian with valid email and invalid password', async () => {
        const email = 'House123@gmail.com';
        const password = 'Apple';
        
        const result = await loginPageLibrarianFrontend(email, password, false);
        expect(result).toBe(true);
    });

    test('Login librarian with invalid email and valid password', async () => {
        const email = 'IssacNewton@gmail.com';
        const password = 'House';
        
        const result = await loginPageLibrarianFrontend(email, password, false);
        expect(result).toBe(true);
    });

    test('Login with invalid librarian credentials', async () => {
        const email = 'IssacNetwon@gmail.com';
        const password = 'Apple';
        
        const result = await loginPageLibrarianFrontend(email, password, false);
        expect(result).toBe(true);
    });

    test('Login with deactivated librarian credentials', async () => {
        const email = 'RobertChase@gmail.com';
        const password = 'Robert';
        
        const result = await loginPageLibrarianFrontend(email, password, false);
        expect(result).toBe(true);
    });
});

describe('Testing Admin Login Page Frontend with Jest and Selenium-Webdriver', () => {
    test('Login with valid admin credentials', async () => {
        const email = 'LawrenceSuico@gmail.com';
        const password = 'Suico';
        
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
        const email = 'LawrenceSuico@gmail.com';
        const password = 'Apple';
        
        const result = await loginPageAdminFrontend(email, password, false);
        expect(result).toBe(true);
    });

    test('Login admin with invalid email and valid password', async () => {
        const email = 'IssacNewton@gmail.com';
        const password = 'Robert';
        
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
