'use strict'
const dbConnection = require('../../config/db.config');

const Book = function (book) {
    this.image_filename = book.image_filename;
    this.image = book.image;
    this.name = book.name;
    this.author = book.author;
    this.genre = book.genre;
    this.content_filename = book.content_filename;
    this.content = book.content;
    this.created = new Date();
    this.updated = null;
}

Book.deleteBook = function (id, result) {
    dbConnection.query("DELETE FROM books WHERE id=?", [id], function (err, res) {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

Book.getByGenre = function (genre, result) {
    dbConnection.query("SELECT * FROM books WHERE genre=?", genre, function (err, res) {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

Book.getAllBooks = function (result) {
    dbConnection.query("SELECT * FROM books", function (err, res) {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

Book.create = function (newBook, result) {
    dbConnection.query("INSERT INTO books set ?", newBook, function (err, res) {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
}

module.exports = Book