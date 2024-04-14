'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const authenticateToken = require('../../auth/auth.middleware')

router.post('/register-user', userController.create);
router.post('/login-user', userController.login);
router.post('/logout-user', authenticateToken, userController.logout);

module.exports = router;
