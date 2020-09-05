const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get(
  '/isTokenValid',
  authController.protect,
  authController.isTokenValid
);

router.post('/add', authController.protect, authController.addUser);

router.get('/', userController.getAllUsers);
router.get('/nodepartment', userController.getAllUserWithNoDepartment);

module.exports = router;
