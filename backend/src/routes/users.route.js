const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

router.post('/register-user', userController.create);
router.post('/login-user', userController.login);
router.post('/logout-user', userController.logout);
router.put('/update-user/:id', userController.update)

module.exports = router;
