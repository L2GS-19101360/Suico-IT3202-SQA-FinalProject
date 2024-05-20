'use strict';
const Book = require('../models/books.model');

exports.update = function(req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            error: true,
            message: "Please provide all required fields"
        });
    }

    const book = new Book(req.body);
    Book.update(req.params.id, book, function(err, result) {
        if (err) {
            return res.status(500).send(err); // Send error response with status 500
        }

        res.json({
            error: false,
            status: 200,
            message: "Book updated successfully",
            data: result
        });
    });
}

exports.deleteBook = function (req, res) {
    const bookId = req.params.id;

    Book.deleteBook(bookId, function (err, book) {
        if (err) {
            res.send(err);
        }
        res.json({
            error: false,
            status: 200,
            message: "Book Delete!"
        });
    });
}

exports.getByGenre = function (req, res) {
    const genre = req.params.input;

    Book.getByGenre(genre, function (err, books) {
        if (err) {
            res.status(500).json({ status: 500, error: err });
        } else {
            res.status(200).json({ status: 200, data: books });
        }
    });
}

exports.getAllBooks = function (req, res) {
    Book.getAllBooks(function (err, book) {
        if (err) {
            res.send(err);
        }
        console.log(book);
        res.send({
            status: 200,
            data: book
        });
    });
}

exports.create = function (req, res) {
    const new_book = new Book(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: "Please Provide All Required Fields"
        });
    } else {
        Book.create(new_book, function (err, book) {
            if (err) {
                res.send(err);
            }
            res.json({
                error: false,
                status: 200,
                message: "Book Created!",
                data: book
            });
        });
    }
}