'use strict';

const dbConnection = require('../../config/db.config');

const BorrowBook = function(borrowBook) {
    this.user_id_fk = borrowBook.user_id_fk;
    this.book_id_fk = borrowBook.book_id_fk;
    this.librarian_id_fk = null;
    this.borrowed_status = "Pending";
    this.borrowed_created = new Date();
    this.borrowed_updated = null;
};

BorrowBook.createRequest = function(newRequest, result) {
    dbConnection.query("INSERT INTO borrow_books_request SET ?", newRequest, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Inserted ID: ", res.insertId);
            result(null, res.insertId);
        }
    });
};

module.exports = BorrowBook;
