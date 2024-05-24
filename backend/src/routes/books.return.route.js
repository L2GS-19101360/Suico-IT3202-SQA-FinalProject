'use strict';

const express = require('express');
const router = express.Router();
const bookReturnController = require('../controllers/books.return.controller');

router.post('/', bookReturnController.createRequest);

module.exports = router;
