const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({}).populate({
    path: 'department',
    select: ['name']
  });
  res.json(users);
});

exports.getAllUserWithNoDepartment = catchAsync(async (req, res, next) => {
  const users = await User.find({
    $or: [{ department: { $exists: false } }, { department: null }]
  });
  res.json(users);
});
