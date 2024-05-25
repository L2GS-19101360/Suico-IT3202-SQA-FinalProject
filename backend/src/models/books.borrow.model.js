'use strict';

const dbConnection = require('../../config/db.config');

const BorrowBook = function (borrowBook) {
    this.user_id_fk = borrowBook.user_id_fk;
    this.book_id_fk = borrowBook.book_id_fk;
    this.librarian_id_fk = borrowBook.librarian_id_fk;
    this.borrowed_status = "Pending";
    this.borrowed_created = new Date();
    this.borrowed_updated = null;
};

BorrowBook.borrowedBorrowBooksRequest = function (borrowBooksRequestId, result) {
    dbConnection.query(
        "UPDATE borrow_books_request SET borrowed_status = ?, borrowed_updated = ? WHERE id = ?",
        ["Borrowed", new Date(), borrowBooksRequestId],
        function (err, res) {
            if (err) {
                console.error("Error updating database:", err);
                result(null, err);
            } else {
                console.log("Database update result:", res);
                result(null, res);
            }
        }
    );
};

BorrowBook.approvedBorrowBooksRequest = function (borrowBook, borrowBooksRequestId, result) {
    dbConnection.query(
        "UPDATE borrow_books_request SET librarian_id_fk = ?, borrowed_status = ?, borrowed_updated = ? WHERE id = ?",
        [borrowBook.librarian_id_fk, "Approved", new Date(), borrowBooksRequestId],
        function (err, res) {
            if (err) {
                console.error("Error updating database:", err);
                result(null, err);
            } else {
                console.log("Database update result:", res);
                result(null, res);
            }
        }
    );
};

BorrowBook.deniedBorrowBooksRequest = function (borrowBook, borrowBooksRequestId, result) {
    dbConnection.query(
        "UPDATE borrow_books_request SET librarian_id_fk = ?, borrowed_status = ?, borrowed_updated = ? WHERE id = ?",
        [borrowBook.librarian_id_fk, "Denied", new Date(), borrowBooksRequestId],
        function (err, res) {
            if (err) {
                console.error("Error updating database:", err);
                result(null, err);
            } else {
                console.log("Database update result:", res);
                result(null, res);
            }
        }
    );
};

BorrowBook.viewBorrowBooksRequests = function (result) {
    dbConnection.query("SELECT borrow_books_request.id, books.image as bookImage, books.name, books.author, books.genre, users.image as userImage, users.firstname, users.lastname, users.email, borrow_books_request.borrowed_status FROM borrow_books_request JOIN books ON borrow_books_request.book_id_fk = books.id JOIN users ON borrow_books_request.user_id_fk = users.id", function (err, res) {
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
    dbConnection.query("SELECT borrow_books_request.id, borrow_books_request.book_id_fk, books.image, books.name, books.author, books.genre, books.content, borrow_books_request.user_id_fk, borrow_books_request.borrowed_status FROM borrow_books_request JOIN books ON borrow_books_request.book_id_fk = books.id JOIN users ON borrow_books_request.user_id_fk = users.id WHERE borrow_books_request.user_id_fk = ?", [userId], function (err, res) {
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
