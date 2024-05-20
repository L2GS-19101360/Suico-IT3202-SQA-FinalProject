const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books.controller');

router.post('/', bookController.create);
router.get('/', bookController.getAllBooks);
router.get('/genre/:input', bookController.getByGenre);
router.delete('/:id', bookController.deleteBook);
router.put('/:id', bookController.update);

module.exports = router;