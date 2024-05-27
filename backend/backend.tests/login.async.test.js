const axios = require('axios');
const loginUser = require('../backend.async/login.async');

jest.mock('axios');

describe('Testing Login Account Backend with Jest', () => {
    test('User logins in valid email and password', async () => {
        const data = {
            email: "GilbertLawrence@gmail.com",
            password: "Lawrence"
        };

        const response = {
            data: {
                error: false,
                message: "Login successful",
                tokens: {
                    accessToken: "validAccessToken",
                    refreshToken: "validRefreshToken"
                }
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await loginUser(data.email, data.password);

        expect(result).toEqual(response.data);
    });

    test('User logins in valid email but invalid password', async () => {
        const data = {
            email: "GilbertLawrence@gmail.com",
            password: "Gilbert"
        };

        const response = {
            data: {
                error: true,
                message: "User not found"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await loginUser(data.email, data.password);

        expect(result).toEqual(response.data);
    });

    test('User logins in invalid email but valid password', async () => {
        const data = {
            email: "Gilbert123@gmail.com",
            password: "Lawrence"
        };

        const response = {
            data: {
                error: true,
                message: "User not found"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await loginUser(data.email, data.password);

        expect(result).toEqual(response.data);
    });

    test('User logins in invalid email and password', async () => {
        const data = {
            email: "Gilbert123@gmail.com",
            password: "Lawrence123"
        };

        const response = {
            data: {
                error: true,
                message: "User not found"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await loginUser(data.email, data.password);

        expect(result).toEqual(response.data);
    });

    test('Account does not exist', async () => {
        const data = {
            email: "IssacNewton@gmail.com",
            password: "Newton"
        };

        const response = {
            data: {
                error: true,
                message: "User not found"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await loginUser(data.email, data.password);

        expect(result).toEqual(response.data);
    });
});
