const express = require('express');
const router = express.Router();
const { BookContentController, upload } = require('../controllers/books.content.controller')

router.post('/', upload.single('file'), BookContentController.storePdf)
router.delete('/:pdfName', BookContentController.deletePdf);

module.exports = router;