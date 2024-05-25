'use strict';

const ReturnBook = require('../models/books.return.model');

exports.deniedBorrowtoReturnBookRequest = function(req, res) {
    const deniedBorrowtoReturnBooksRequestId = req.params.id;

    ReturnBook.deniedBorrowtoReturnBookRequest(deniedBorrowtoReturnBooksRequestId, function (err, result) {
        if (err) {
            return res.status(500).send({
                error: true,
                message: "Error denying borrow to return book request", // Updated message
                details: err
            });
        } else {
            return res.json({
                error: false,
                status: 200,
                message: "Borrow to return book request denied!",
                data: result
            });
        }
    });
}

exports.approvedReturnBooksRequest = function (req, res) {
    const returnBooksRequestId = req.params.id;
    const returnBook = new ReturnBook(req.body);

    ReturnBook.approvedReturnBooksRequest(returnBook, returnBooksRequestId, function (err, result) {
        if (err) {
            return res.status(500).send({
                error: true,
                message: "Error approving returned request",
                details: err
            });
        } else {
            return res.json({
                error: false,
                status: 200,
                message: "Book Request Returned!",
                data: result
            });
        }
    });
}

exports.deniedReturnBooksRequest = function (req, res) {
    const returnBooksRequestId = req.params.id;

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: "Please Provide All Required Fields"
        });
    } else {
        const returnBook = new ReturnBook(req.body);
        ReturnBook.deniedReturnBooksRequest(returnBook, returnBooksRequestId, function (err, result) {
            if (err) {
                res.status(500).send({
                    error: true,
                    message: "Error denying return request",
                    details: err
                });
            } else {
                res.json({
                    error: false,
                    status: 200,
                    message: "Book Return Request Denied!",
                    data: result
                });
            }
        });
    }
}

exports.viewReturnBooksRequests = function (req, res) {
    ReturnBook.viewReturnBooksRequests(function (err, returnBooksRequests) {
        if (err) {
            res.send(err);
        }
        console.log(returnBooksRequests);
        res.send({
            status: 200,
            data: returnBooksRequests
        });
    });
}

exports.createRequest = function (req, res) {
    const new_return_request = new ReturnBook(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            error: true,
            message: "Please Provide All Required Fields"
        });
    }

    ReturnBook.createRequest(new_return_request, function (err, returnBook) {
        if (err) {
            return res.status(500).send({
                error: true,
                message: "Error creating return request",
                details: err
            });
        } else {
            return res.json({
                error: false,
                status: 200,
                message: "Book Return Request Created!",
                data: returnBook
            });
        }
    });
};
