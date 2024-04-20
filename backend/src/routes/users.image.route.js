const express = require('express');
const UserImageController = require('../controllers/users.image.controller');
const router = express.Router();

router.get('/', UserImageController.getAllUsers);
router.post('/', UserImageController.storeFile);

module.exports = router;
