'use strict';

const BorrowBook = require('../models/books.borrow.model');

exports.borrowedBorrowBooksRequest = function (req, res) {
    const borrowBooksRequestId = req.params.id;
    console.log("Request ID:", borrowBooksRequestId);
    console.log("Request Body:", req.body);

    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            error: true,
            message: "Please Provide All Required Fields"
        });
    }

    const borrowBook = new BorrowBook(req.body);
    BorrowBook.borrowedBorrowBooksRequest(borrowBook, borrowBooksRequestId, function (err, result) {
        if (err) {
            return res.status(500).send({
                error: true,
                message: "Error approving borrowed request",
                details: err
            });
        } else {
            return res.json({
                error: false,
                status: 200,
                message: "Book Request Borrowed!",
                data: result
            });
        }
    });
};

exports.approvedBorrowBooksRequest = function (req, res) {
    const borrowBookRequestId = req.params.id;
    console.log("Request ID:", borrowBookRequestId);
    console.log("Request Body:", req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: "Please Provide All Required Fields"
        });
    } else {
        const borrowBook = new BorrowBook(req.body);
        BorrowBook.approvedBorrowBooksRequest(borrowBook, borrowBookRequestId, function (err, result) {
            if (err) {
                res.status(500).send({
                    error: true,
                    message: "Error approving borrow request",
                    details: err
                });
            } else {
                res.json({
                    error: false,
                    status: 200,
                    message: "Book Borrow Request Approved!",
                    data: result
                });
            }
        });
    }
};

exports.deniedBorrowBooksRequest = function (req, res) {
    const borrowBookRequestId = req.params.id;
    console.log("Request ID:", borrowBookRequestId);
    console.log("Request Body:", req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: "Please Provide All Required Fields"
        });
    } else {
        const borrowBook = new BorrowBook(req.body);
        BorrowBook.deniedBorrowBooksRequest(borrowBook, borrowBookRequestId, function (err, result) {
            if (err) {
                res.status(500).send({
                    error: true,
                    message: "Error denying borrow request",
                    details: err
                });
            } else {
                res.json({
                    error: false,
                    status: 200,
                    message: "Book Borrow Request Denied!",
                    data: result
                });
            }
        });
    }
};

exports.viewBorrowBooksRequests = function (req, res) {
    BorrowBook.viewBorrowBooksRequests(function (err, borrowBooksRequests) {
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

exports.getBorrowRequestByUserId = function (req, res) {
    const userId = req.params.id;

    BorrowBook.getBorrowRequestByUserId(userId, function (err, borrowRequest) {
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
