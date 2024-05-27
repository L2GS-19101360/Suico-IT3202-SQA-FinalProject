const axios = require('axios');

async function updateUserAccount(accountId, newImageFile, newImageFileName, newFirstName, newLastName, newEmail, newPassword) {
    const data = {
        image: newImageFile,
        image_filename: newImageFileName,
        firstname: newFirstName,
        lastname: newLastName,
        email: newEmail,
        password: newPassword
    }

    const response = await axios.put(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/${accountId}`, data);

    return response.data;
}

async function updateLibrarianAccount(accountId, newImageFile, newImageFileName, newFirstName, newLastName, newEmail, newPassword) {
    const data = {
        image: newImageFile,
        image_filename: newImageFileName,
        firstname: newFirstName,
        lastname: newLastName,
        email: newEmail,
        password: newPassword
    }

    const response = await axios.put(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/${accountId}`, data);

    return response.data;
}

async function updateAdminAccount(accountId, newImageFile, newImageFileName, newFirstName, newLastName, newEmail, newPassword) {
    const data = {
        image: newImageFile,
        image_filename: newImageFileName,
        firstname: newFirstName,
        lastname: newLastName,
        email: newEmail,
        password: newPassword
    }

    const response = await axios.put(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/${accountId}`, data);

    return response.data;
}

async function activateUser(userId) {
    const response = await axios.put(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/activateUser/${userId}`);

    return response.data;
}

async function deactivateUser(userId) {
    const response = await axios.put(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/deactivateUser/${userId}`);

    return response.data;
}

async function viewAllUsers() {
    const response = await axios.get(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users`);

    return response.data;
}

async function viewAllUsersByRole(role) {
    const response = await axios.get(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/role/${role}`);

    return response.data;
}

async function viewAllUsersByStatus(status) {
    const response = await axios.get(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/active-status/${status}`);

    return response.data;
}

async function viewAccountByFirstName(firstname) {
    const response = await axios.get(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/find-user/${firstname}`);

    return response.data;
}

async function viewAccountByLastName(lastname) {
    const response = await axios.get(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/find-user/${lastname}`);

    return response.data;
}

async function viewAccountByEmail(email) {
    const response = await axios.get(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/find-user/${email}`);

    return response.data;
}

module.exports = {
    viewAllUsers,
    viewAllUsersByRole,
    viewAllUsersByStatus,
    viewAccountByFirstName,
    viewAccountByLastName,
    viewAccountByEmail,
    activateUser,
    deactivateUser,
    updateUserAccount,
    updateLibrarianAccount,
    updateAdminAccount
}