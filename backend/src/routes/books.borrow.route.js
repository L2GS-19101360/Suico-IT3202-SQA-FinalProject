const express = require('express');
const router = express.Router();
const bookBorrowController = require('../controllers/books.borrow.controller');

router.post('/', bookBorrowController.createRequest);
router.get('/', bookBorrowController.getAllBorrowRequests);
router.get('/userId/:id', bookBorrowController.getBorrowRequestByUserId);

module.exports = router;
