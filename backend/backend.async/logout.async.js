const axios = require('axios');

async function logoutAccount (getAccessToken, getRefreshToken) {
    data = {
        accessToken: getAccessToken,
        refreshToken: getRefreshToken
    }

    const response = await axios.post(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/logout-user`, data);

    return response.data;
}

module.exports = logoutAccount