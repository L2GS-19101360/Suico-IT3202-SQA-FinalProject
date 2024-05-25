'use strict';

const ReturnBook = require('../models/books.return.model');

exports.viewReturnBooksRequests = function(req, res) {
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
                message: "Error creating borrow request",
                details: err
            });
        } else {
            return res.json({
                error: false,
                status: 200,
                message: "Book Borrow Request Created!",
                data: returnBook
            });
        }
    });
};
