const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books.controller');

router.post('/', bookController.create);

module.exports = router;