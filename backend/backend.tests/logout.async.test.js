const axios = require('axios');
const logoutUser = require('../backend.async/logout.async');

jest.mock('axios');

describe('Testing Logout Account Backend with Jest', () => {
    test('User logouts from the web application', async () => {
        const data = {
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJHaWxiZXJ0TGF3cmVuY2VAZ21haWwuY29tIiwiaWF0IjoxNzE2NzcwOTQ5LCJleHAiOjE3MTczNzU3NDl9.RcLM_BbBRGSGW6w64C9iWZvcl0CMV932x_wbwCOO_UQ",
            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJHaWxiZXJ0TGF3cmVuY2VAZ21haWwuY29tIiwiaWF0IjoxNzE2NzcwOTQ5fQ.btqY07eQACfBLnz0sbG_Y_z22wPNuridHQ0JSNpn1zY"
        };

        const response = {
            data: {
                error: false,
                message: "Logout successful"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await logoutUser(data.accessToken, data.refreshToken);

        expect(result).toEqual(response.data);
    });

    test('User cannot logout from the web application without tokens', async () => {
        const data = {
            accessToken: null,
            refreshToken: null
        };

        const response = {
            data: {
                error: true,
                message: "Access token and refresh token are required"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await logoutUser(data.accessToken, data.refreshToken);

        expect(result).toEqual(response.data);
    });

    test('User cannot logout from the web application with missing accessToken', async () => {
        const data = {
            accessToken: null,
            refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJHaWxiZXJ0TGF3cmVuY2VAZ21haWwuY29tIiwiaWF0IjoxNzE2NzcwOTQ5fQ.btqY07eQACfBLnz0sbG_Y_z22wPNuridHQ0JSNpn1zY"
        };

        const response = {
            data: {
                error: true,
                message: "Access token and refresh token are required"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await logoutUser(data.accessToken, data.refreshToken);

        expect(result).toEqual(response.data);
    });

    test('User cannot logout from the web application with missing refreshToken', async () => {
        const data = {
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJHaWxiZXJ0TGF3cmVuY2VAZ21haWwuY29tIiwiaWF0IjoxNzE2NzcwOTQ5LCJleHAiOjE3MTczNzU3NDl9.RcLM_BbBRGSGW6w64C9iWZvcl0CMV932x_wbwCOO_UQ",
            refreshToken: null
        };

        const response = {
            data: {
                error: true,
                message: "Access token and refresh token are required"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await logoutUser(data.accessToken, data.refreshToken);

        expect(result).toEqual(response.data);
    });
});
