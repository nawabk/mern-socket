const Department = require('../models/Department');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

exports.getAll = catchAsync(async (req, res, next) => {
  const departments = await Department.find().populate({
    path: 'users',
    select: ['name']
  });
  res.json(departments);
});
exports.save = catchAsync(async (req, res, next) => {
  const department = await Department.create(req.body);
  res.status(201).json(department);
});

exports.getOne = catchAsync(async (req, res, next) => {
  const department = await Department.findById(req.params.id).populate({
    path: 'users',
    select: ['name', 'email']
  });
  res.json(department);
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await Department.find({ _id: req.params.id }).populate({
    path: 'users',
    select: ['-password,-_v']
  });
  res.json({
    users
  });
});

exports.addMultipleUsersToDepartment = catchAsync(async (req, res, next) => {
  const allUsersId = req.body.usersId;
  allUsersId.forEach(async userId => {
    const user = await User.findById(userId);
    await Department.updateOne(
      { _id: req.params.id },
      { $addToSet: { users: user } }
    );
  });
  res.status(201).json({
    status: 'success',
    message: 'Users added to department'
  });
});
exports.addUserToDepartment = catchAsync(async (req, res, next) => {
  const userId = req.body.userId;

  await Department.updateOne(
    { _id: req.params.id },
    { $addToSet: { users: userId } }
  );

  await User.updateOne(
    { _id: userId },
    { $set: { department: req.params.id } }
  );
  const user = await User.findById(userId);
  res.status(201).json(user);
});

exports.removeUserFromDepartment = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const updatedDepartment = await Department.updateOne(
    { _id: req.params.id },
    { $pull: { users: userId } }
  );
  await User.updateOne({ _id: userId }, { $set: { department: null } });
  res.json({
    status: 'success',
    message: 'Remove user from department'
  });
});
