const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

router.post('/register-user', userController.create);
router.post('/login-user', userController.login);
router.post('/logout-user', userController.logout);
router.put('/update-user/:id', userController.update);
router.get('/', userController.getAllUsers);
router.get('/role/:input', userController.getByRole)
router.get('/active-status/:input', userController.getByStatus)
router.put('/deactivateUser/:id', userController.deactivateUser);
router.put('/activateUser/:id', userController.activateUser);
router.get('/find-user/:input', userController.findUserByInput);

module.exports = router;
