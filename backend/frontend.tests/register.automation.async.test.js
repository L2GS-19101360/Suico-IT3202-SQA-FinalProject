const { registerUserFrontend } = require('../frontend.async/register.automation.async');

jest.setTimeout(30000);

describe('Testing User Register Page Frontend with Jest and Selenium-Webdriver', () => {
    test('Register User Account with all required information', async () => {
        const result = await registerUserFrontend('John', 'Doe', 'John123', 'Doe', 'Doe', true);
        expect(result).toBe(true);
    });

    test('Register User Account without all required information', async () => {
        const result = await registerUserFrontend(null, null, null, null, null, false);
        expect(result).toBe(true);
    });

    test('Register User Account without first name', async () => {
        const result = await registerUserFrontend(null, 'Doe', 'John123', 'Doe', 'Doe', false);
        expect(result).toBe(true);
    });

    test('Register User Account without last name', async () => {
        const result = await registerUserFrontend('John', null, 'John123', 'Doe', 'Doe', false);
        expect(result).toBe(true);
    });

    test('Register User Account without email', async () => {
        const result = await registerUserFrontend('John', 'Doe', null, 'Doe', 'Doe', false);
        expect(result).toBe(true);
    });

    test('Register User Account without password and confirm password', async () => {
        const result = await registerUserFrontend('John', 'Doe', 'John123', null, null, false);
        expect(result).toBe(true);
    });
});
