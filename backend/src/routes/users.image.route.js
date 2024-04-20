const express = require('express');
const UserImageController = require('../controllers/users.image.controller');
const router = express.Router();

router.get('/', UserImageController.getAllUsers);

module.exports = router;
