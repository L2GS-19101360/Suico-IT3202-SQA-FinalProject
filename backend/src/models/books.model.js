'use strict'
const dbConnection = require('../../config/db.config');

const Book = function(book) {
    this.image = book.image;
    this.name = book.name;
    this.author = book.author;
    this.genre = book.genre;
    this.content = book.content;
    this.created = new Date();
    this.updated = null;
}

Book.getAllBooks = function(result) {
    dbConnection.query("SELECT * FROM books", function(err, res) {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

Book.create = function(newBook, result) {
    dbConnection.query("INSERT INTO books set ?", newBook, function(err, res) {
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