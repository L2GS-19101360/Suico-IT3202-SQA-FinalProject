'use strict';
const Book = require('../models/books.model');

exports.getAllBooks = function(req, res) {
    Book.getAllBooks(function(err, book) {
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

exports.create = function(req, res) {
    const new_book = new Book(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({
            error: true,
            message: "Please Provide All Required Fields"
        });
    } else {
        Book.create(new_book, function(err, book) {
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