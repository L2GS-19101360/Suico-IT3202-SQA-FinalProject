'use strict';

const BorrowBook = require('../models/books.borrow.model');

exports.getBorrowRequestByUserId = function(req, res) {
    const userId = req.params.id;

    BorrowBook.getBorrowRequestByUserId(userId, function(err, borrowRequest) {
        if (err) {
            res.status(500).send({
                error: true,
                message: "Error fetching borrow requests",
                details: err
            });
        } else {
            res.json({
                error: false,
                status: 200,
                data: borrowRequest
            });
        }
    });
};

exports.getAllBorrowRequests = function (req, res) {
    BorrowBook.getAllBorrowRequests(function (err, borrowBooksRequests) {
        if (err) {
            res.send(err);
        }
        console.log(borrowBooksRequests);
        res.send({
            status: 200,
            data: borrowBooksRequests
        });
    });
}

exports.createRequest = function (req, res) {
    const new_borrow_request = new BorrowBook(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: "Please Provide All Required Fields"
        });
    } else {
        BorrowBook.createRequest(new_borrow_request, function (err, borrowBook) {
            if (err) {
                res.status(500).send({
                    error: true,
                    message: "Error creating borrow request",
                    details: err
                });
            } else {
                res.json({
                    error: false,
                    status: 200,
                    message: "Book Borrow Request Created!",
                    data: borrowBook
                });
            }
        });
    }
};
