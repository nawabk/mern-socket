const express = require('express');
const departmentController = require('../controllers/departmentController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.protect);
router
  .route('/')
  .get(departmentController.getAll)
  .post(departmentController.save);

router.get('/:id', departmentController.getOne);

router
  .route('/:id/users')
  .get(departmentController.getAllUsers)
  .put(departmentController.addUserToDepartment);

router.delete(
  '/:id/users/:userId',
  departmentController.removeUserFromDepartment
);

module.exports = router;
