const multer = require('multer'); // Import multer for handling file uploads
const BookImage = require('../models/books.image.model')

const upload = multer();

const BookImageController = {
    getAllFiles: async(req, res) => {

    }
}

module.exports = { BookImageController, upload }