const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books.controller');

router.post('/', bookController.create);
router.get('/', bookController.getAllBooks);

module.exports = router;