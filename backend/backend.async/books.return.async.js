const axios = require('axios');

async function denyReturnBooksRequest (returnBookRequestId, librarianId) {
    const data = {
        librarian_id_fk: librarianId
    }

    const response = await axios.put(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/return-books-request/denied-return-book-request/${returnBookRequestId}`, data);

    return response.data;
}

async function approveReturnBooksRequest (returnBookRequestId, librarianId) {
    const data = {
        librarian_id_fk: librarianId
    }

    const response = await axios.put(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/return-books-request/approved-return-book-request/${returnBookRequestId}`, data);

    return response.data;
}

async function viewAllReturnBooksRequests () {
    const response = await axios.get(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/return-books-request/View-Book-Request`);

    return response.data;
}

module.exports = {
    viewAllReturnBooksRequests,
    approveReturnBooksRequest,
    denyReturnBooksRequest
}