'use strict';

const dbConnection = require('../../config/db.config');

const BorrowBook = function (borrowBook) {
    this.user_id_fk = borrowBook.user_id_fk;
    this.book_id_fk = borrowBook.book_id_fk;
    this.librarian_id_fk = null;
    this.borrowed_status = "Pending";
    this.borrowed_created = new Date();
    this.borrowed_updated = null;
};

BorrowBook.viewBorrowBooksRequests = function (result) {
    dbConnection.query("SELECT books.image, books.name, books.author, users.image, CONCAT(users.firstname, ' ', users.lastname) AS user_full_name, users.email, borrow_books_request.borrowed_status FROM borrow_books_request JOIN books ON borrow_books_request.book_id_fk = books.id JOIN users ON borrow_books_request.user_id_fk = users.id", function (err, res) {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

BorrowBook.getBorrowRequestByUserId = function (userId, result) {
    dbConnection.query("SELECT * FROM borrow_books_request WHERE user_id_fk = ?", [userId], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Borrow Requests: ", res);
            result(null, res);
        }
    });
};

BorrowBook.createRequest = function (newRequest, result) {
    dbConnection.query("INSERT INTO borrow_books_request SET ?", newRequest, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Inserted ID: ", res.insertId);
            result(null, res.insertId);
        }
    });
};

BorrowBook.getAllBorrowRequests = function (result) {
    dbConnection.query("SELECT * FROM borrow_books_request", function (err, res) {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

module.exports = BorrowBook;
