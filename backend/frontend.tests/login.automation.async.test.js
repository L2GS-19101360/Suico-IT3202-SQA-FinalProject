const axios = require('axios');
const seleniumWebdriver = require('selenium-webdriver')
const { loginPageFrontend } = require('../frontend.async/login.automation.async')

jest.mock('axios');

jest.setTimeout(30000); // Set a higher timeout for Selenium tests

describe('Testing Login Page Frontend with Jest and Selenium-Webdriver', () => {
    test('Login with valid credentials', async () => {
        const email = 'GilbertLawrence@gmail.com';
        const password = 'Lawrence';
        
        const result = await loginPageFrontend(email, password, true);
        expect(result).toBe(true);
    });

    test('Login with invalid credentials', async () => {
        const email = 'IssacNetwon@gmail.com';
        const password = 'Apple';
        
        const result = await loginPageFrontend(email, password, false);
        expect(result).toBe(true);
    });

    test('Login with invalid email', async () => {
        const email = 'IssacNetwon@gmail.com';
        const password = 'Lawrence';
        
        const result = await loginPageFrontend(email, password, false);
        expect(result).toBe(true);
    });

    test('Login with invalid password', async () => {
        const email = 'GilbertLawrence@gmail.com';
        const password = 'Apple';
        
        const result = await loginPageFrontend(email, password, false);
        expect(result).toBe(true);
    });
});
