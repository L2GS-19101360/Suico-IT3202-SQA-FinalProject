'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

router.post('/register-user', userController.create);
router.post('/login-user', userController.login);

module.exports = router;
