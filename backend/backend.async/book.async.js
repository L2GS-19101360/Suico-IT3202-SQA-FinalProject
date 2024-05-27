const axios = require('axios');

async function deleteBook (bookId) {
    const response = await axios.delete(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books/${bookId}`);

    return response.data;
}

async function updateBook(bookId, newBookImageFileName, newBookImageURL, newBookName, newBookAuthor, newBookGenre, newBookContentFileName, newBookContentURL) {
    const data = {
        image_filename: newBookImageFileName,
        image: newBookImageURL,
        name: newBookName,
        author: newBookAuthor,
        genre: newBookGenre,
        content_filename: newBookContentFileName,
        content: newBookContentURL
    };

    const response = await axios.put(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books/${bookId}`, data);

    return response.data;
}

async function viewBookByGenre (bookGenre) {
    const response = await axios.get(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books/genre/${bookGenre}`);

    return response.data;
}

async function viewBookByAuthor (bookAuthor) {
    const response = await axios.get(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books/author/${bookAuthor}`);

    return response.data;
}

async function viewBookByTitle (bookTitle) {
    const response = await axios.get(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books/title/${bookTitle}`);

    return response.data;
}

async function viewAllBooks () {
    const response = await axios.get(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books`);

    return response.data;
}

async function createNewBook(bookImageFileName, bookImageURL, bookName, bookAuthor, bookGenre, bookContentFileName, bookContentURL) {
    const data = {
        image_filename: bookImageFileName,
        image: bookImageURL,
        name: bookName,
        author: bookAuthor,
        genre: bookGenre,
        content_filename: bookContentFileName,
        content: bookContentURL
    };

    const response = await axios.post(`https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books`, data);

    return response.data;
}

module.exports = {
    createNewBook,
    viewAllBooks,
    viewBookByTitle,
    viewBookByAuthor,
    viewBookByGenre,
    updateBook,
    deleteBook
}
