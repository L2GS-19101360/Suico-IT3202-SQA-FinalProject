const multer = require('multer'); // Import multer for handling file uploads
const BookImage = require('../models/books.image.model')

const upload = multer();

const BookImageController = {

}

module.exports = { BookImageController, upload }