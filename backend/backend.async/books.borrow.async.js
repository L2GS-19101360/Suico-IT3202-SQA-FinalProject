const axios = require('axios');

async function denyBorrowBooksRequest (borrowBookRequestId, librarianId) {
    const data = {
        librarian_id_fk: librarianId
    }

    const response = await axios.put(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/borrow-books-request/denied-borrow-book-request/${borrowBookRequestId}`, data);

    return response.data;
}

async function approveBorrowBooksRequest (borrowBookRequestId, librarianId) {
    const data = {
        librarian_id_fk: librarianId
    }

    const response = await axios.put(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/borrow-books-request/approved-borrow-book-request/${borrowBookRequestId}`, data);

    return response.data;
}

async function viewAllBorrowBooksRequests () {
    const response = await axios.get(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/borrow-books-request/View-Book-Request`);

    return response.data;
}

module.exports = {
    viewAllBorrowBooksRequests,
    approveBorrowBooksRequest,
    denyBorrowBooksRequest
}