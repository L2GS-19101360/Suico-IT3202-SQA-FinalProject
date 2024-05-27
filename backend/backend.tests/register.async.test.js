const axios = require('axios');
const { registerUserAccount, registerLibrarianAccount } = require('../backend.async/register.async');

jest.mock('axios');

describe('Testing Registration Backend with Jest', () => {
    test('Register User Account with all required information', async () => {
        const data = {
            firstname: "Mac",
            lastname: "Taylor",
            email: "MacTaylor@gmail.com",
            password: "Mac"
        };

        const response = {
            data: {
                error: false,
                message: "User Created",
                data: {
                    insertId: 1,
                    accessToken: "validAccessToken",
                    refreshToken: "validRefreshToken"
                }
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await registerUserAccount(data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });

    test('Register User Account with not all required information', async () => {
        const data = {
            firstname: null,
            lastname: null,
            email: null,
            password: null
        };

        const response = {
            data: {
                error: true,
                message: "Provide All Information"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await registerUserAccount(data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });

    test('Register User Account with not all required information without firstname', async () => {
        const data = {
            firstname: null,
            lastname: "Taylor",
            email: "MacTaylor@gmail.com",
            password: "Mac"
        };

        const response = {
            data: {
                error: true,
                message: "Provide All Information"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await registerUserAccount(data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });

    test('Register User Account with not all required information without lastname', async () => {
        const data = {
            firstname: "Mac",
            lastname: null,
            email: "MacTaylor@gmail.com",
            password: "Mac"
        };

        const response = {
            data: {
                error: true,
                message: "Provide All Information"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await registerUserAccount(data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });

    test('Register User Account with not all required information without email', async () => {
        const data = {
            firstname: "Mac",
            lastname: "Taylor",
            email: null,
            password: "Mac"
        };

        const response = {
            data: {
                error: true,
                message: "Provide All Information"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await registerUserAccount(data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });

    test('Register User Account with not all required information without password', async () => {
        const data = {
            firstname: "Mac",
            lastname: "Taylor",
            email: "MacTaylor@gmail.com",
            password: null
        };

        const response = {
            data: {
                error: true,
                message: "Provide All Information"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await registerUserAccount(data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });

    test('Register Librarian Account with all required information', async () => {
        const data = {
            firstname: "Mac",
            lastname: "Taylor",
            email: "MacTaylor@gmail.com",
            password: "Mac",
        };

        const response = {
            data: {
                error: false,
                message: "User Created",
                data: {
                    insertId: 2,
                    accessToken: "validAccessToken",
                    refreshToken: "validRefreshToken"
                }
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await registerLibrarianAccount(data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });

    test('Register Librarian Account with not all required information', async () => {
        const data = {
            firstname: null,
            lastname: null,
            email: null,
            password: null
        };

        const response = {
            data: {
                error: true,
                message: "Provide All Information"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await registerLibrarianAccount(data.firstname, data.lastname, data.email);

        expect(result).toEqual(response.data);
    });

    test('Register Librarian Account with not all required information wihout firstname', async () => {
        const data = {
            firstname: null,
            lastname: "Taylor",
            email: "MacTaylor@gmail.com",
            password: "Mac",
        };

        const response = {
            data: {
                error: true,
                message: "Provide All Information"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await registerLibrarianAccount(data.firstname, data.lastname, data.email);

        expect(result).toEqual(response.data);
    });

    test('Register Librarian Account with not all required information wihout lastname', async () => {
        const data = {
            firstname: "Mac",
            lastname: null,
            email: "MacTaylor@gmail.com",
            password: "Mac",
        };

        const response = {
            data: {
                error: true,
                message: "Provide All Information"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await registerLibrarianAccount(data.firstname, data.lastname, data.email);

        expect(result).toEqual(response.data);
    });

    test('Register Librarian Account with not all required information wihout email', async () => {
        const data = {
            firstname: "Mac",
            lastname: "Taylor",
            email: null,
            password: "Mac",
        };

        const response = {
            data: {
                error: true,
                message: "Provide All Information"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await registerLibrarianAccount(data.firstname, data.lastname, data.email);

        expect(result).toEqual(response.data);
    });

    test('Register Librarian Account with not all required information wihout email', async () => {
        const data = {
            firstname: "Mac",
            lastname: "Taylor",
            email: "MacTaylor@gmail.com",
            password: null,
        };

        const response = {
            data: {
                error: true,
                message: "Provide All Information"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await registerLibrarianAccount(data.firstname, data.lastname, data.email);

        expect(result).toEqual(response.data);
    });
});
