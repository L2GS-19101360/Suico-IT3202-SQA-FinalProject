const express = require('express');
const router = express.Router();
const bookBorrowController = require('../controllers/books.borrow.controller');

router.post('/', bookBorrowController.createRequest);

module.exports = router;
