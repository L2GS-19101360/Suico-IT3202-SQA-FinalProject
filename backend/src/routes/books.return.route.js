'use strict';

const express = require('express');
const router = express.Router();
const bookReturnController = require('../controllers/books.return.controller');

router.post('/', bookReturnController.createRequest);
router.get('/View-Book-Request', bookReturnController.viewReturnBooksRequests);

module.exports = router;
