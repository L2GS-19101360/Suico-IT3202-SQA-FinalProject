const express = require('express');
const router = express.Router();
const { BookImageController, upload } = require('../controllers/books.image.controller')

router.post('/', upload.single('file'), BookImageController.storeFile)
router.delete('/:imageName', BookImageController.deleteFile);

module.exports = router