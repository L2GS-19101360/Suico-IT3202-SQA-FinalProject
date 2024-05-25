'use strict';

const dbConnection = require('../../config/db.config');

const ReturnBook = function (returnBook) {
    this.user_id_fk = returnBook.user_id_fk;
    this.book_id_fk = returnBook.book_id_fk;
    this.librarian_id_fk = returnBook.librarian_id_fk;
    this.returned_status = "Pending";
    this.returned_created = new Date();
    this.returned_updated = null;
};

ReturnBook.viewReturnBooksRequests = function (result) {
    dbConnection.query("SELECT return_books_request.id, books.image as bookImage, books.name, books.author, books.genre, users.image as userImage, users.firstname, users.lastname, users.email, return_books_request.returned_status FROM return_books_request JOIN books ON books.id = return_books_request.book_id_fk JOIN users ON users.id = return_books_request.user_id_fk", function (err, res) {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

ReturnBook.createRequest = function (newRequest, result) {
    dbConnection.query("INSERT INTO return_books_request SET ?", newRequest, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Inserted ID: ", res.insertId);
            result(null, res.insertId);
        }
    });
};

module.exports = ReturnBook;
