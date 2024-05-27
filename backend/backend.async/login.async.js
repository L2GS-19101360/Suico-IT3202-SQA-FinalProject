const axios = require('axios');

async function loginAccount (enterEmail, enterPassword) {
    data = {
        email: enterEmail,
        password: enterPassword
    }

    const response = await axios.post(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/login-user`, data);

    return response.data;
}

module.exports = loginAccount