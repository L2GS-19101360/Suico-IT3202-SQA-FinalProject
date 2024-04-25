const express = require('express');
const router = express.Router();
const { BookImageController, upload } = require('../controllers/books.image.controller')

router.get('/', BookImageController.getAllFiles);

module.exports = router