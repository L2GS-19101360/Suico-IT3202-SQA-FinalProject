const axios = require('axios');

async function registerUserAccount(newFirstName, newLastName, newEmail, newPassword) {
    const data = {
        image: "#%&{}>",
        image_filename: "#%&{}>",
        firstname: newFirstName,
        lastname: newLastName,
        email: newEmail,
        password: newPassword,
        role: "user"
    };

    const response = await axios.post(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/register-user`, data);

    return response.data;
}

async function registerLibrarianAccount(newFirstName, newLastName, newEmail, newPassword) {
    const data = {
        image: "#%&{}>",
        image_filename: "#%&{}>",
        firstname: newFirstName,
        lastname: newLastName,
        email: newEmail,
        password: newPassword,
        role: "librarian"
    };

    const response = await axios.post(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/register-user`, data);

    return response.data;
}

module.exports = {
    registerUserAccount,
    registerLibrarianAccount
}