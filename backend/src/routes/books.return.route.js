'use strict';

const express = require('express');
const router = express.Router();
const bookReturnController = require('../controllers/books.return.controller');

router.post('/', bookReturnController.createRequest);
router.get('/View-Book-Request', bookReturnController.viewReturnBooksRequests);
router.put('/approved-return-book-request/:id', bookReturnController.approvedReturnBooksRequest);
router.put('/denied-return-book-request/:id', bookReturnController.deniedReturnBooksRequest);
router.put('/denied-borrow-to-return-book-request/:id', bookReturnController.deniedBorrowtoReturnBookRequest);

module.exports = router;
