const express = require('express');
const router = express.Router();
const bookBorrowController = require('../controllers/books.borrow.controller');

router.post('/', bookBorrowController.createRequest);
router.get('/', bookBorrowController.getAllBorrowRequests);
router.get('/userId/:id', bookBorrowController.getBorrowRequestByUserId);
router.get('/View-Book-Request', bookBorrowController.viewBorrowBooksRequests);
router.put('/approved-borrow-book-request/:id', bookBorrowController.approvedBorrowBooksRequest);
router.put('/denied-borrow-book-request/:id', bookBorrowController.deniedBorrowBooksRequest);
router.put('/borrowed-borrow-book-request/:id', bookBorrowController.borrowedBorrowBooksRequest);

module.exports = router;
