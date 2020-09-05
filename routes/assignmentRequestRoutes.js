const express = require('express');
const authController = require('../controllers/authController');
const assigmentRequestController = require('../controllers/assignmentRequestController');

const router = express.Router();
router.use(authController.protect);
router.get('/requests', assigmentRequestController.getAllRequests);
router.post('/:id/sendRequest', assigmentRequestController.sendRequest);
router.put('/:id/changeStatus', assigmentRequestController.changeRequestStatus);

module.exports = router;
