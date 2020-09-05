const express = require('express');
const notificationController = require('../controllers/notificationController');
const authController = require('../controllers/authController');

const router = express.Router();
router.use(authController.protect);
router.route('/').get(notificationController.getAll);
router.put('/markAllRead', notificationController.makrAllRead);

module.exports = router;
