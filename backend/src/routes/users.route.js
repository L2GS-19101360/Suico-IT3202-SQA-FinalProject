'use strict'

const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

router.post('/create-user', userController.create);

module.exports = router;