const express = require('express');
const { UserImageController, upload } = require('../controllers/users.image.controller');
const router = express.Router();

// Use multer middleware to handle file uploads
router.get('/', UserImageController.getAllUsers);
router.post('/', upload.single('file'), UserImageController.storeFile);

module.exports = router;
