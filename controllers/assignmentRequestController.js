const AssignmentRequest = require('../models/AsssignmentRequest');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const Notification = require('../models/Notification');

exports.getAllRequests = catchAsync(async (req, res, next) => {
  const requests = await AssignmentRequest.find({
    department: req.user.department,
    status: req.query.status
  })
    .populate({ path: 'sender', select: ['name'] })
    .populate({ path: 'reciever', select: ['name'] });
  res.json(requests);
});

exports.sendRequest = catchAsync(async (req, res, next) => {
  const sender = req.user;
  const reciever = await User.findById(req.params.id);

  if (sender.department.equals(reciever.department)) {
    return res.status(400).json({
      status: 'failed',
      message: 'You cannot send the request to the user in the same department'
    });
  }
  const message = req.body.message;
  const body = {
    sender: sender.id,
    reciever: req.params.id,
    message,
    department: reciever.department
  };
  const assignmentRequest = await AssignmentRequest.create(body);
  const notification = {
    message: `${req.user.name} send you a request`,
    notifyTo: req.params.id
  };
  await Notification.create(notification);
  res.status(201).json({
    assignmentRequest
  });
});

exports.changeRequestStatus = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const requestId = req.params.id;
  const assignmentRequest = await AssignmentRequest.findById(
    requestId
  ).populate({ path: 'sender', select: ['name'] });
  if (!assignmentRequest.reciever.equals(userId)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Only reciever can change the status of the request'
    });
  }
  await AssignmentRequest.updateOne(
    { _id: req.params.id },
    { $set: { status: req.body.status } }
  );
  const notification = {
    message: `You request to ${req.user.name} is ${req.body.status}`,
    notifyTo: assignmentRequest.sender._id
  };
  await Notification.create(notification);
  res.status(201).json({
    status: 'success',
    message: `Request status is changed from ${assignmentRequest.status} to ${req.body.status}`
  });
});
