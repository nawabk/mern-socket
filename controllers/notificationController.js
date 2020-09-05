const Notification = require('../models/Notification');
const catchAsync = require('../utils/catchAsync');

exports.getAll = catchAsync(async (req, res, next) => {
  const notifications = await Notification.find({ notifyTo: req.user.id });
  res.json(notifications);
});

exports.makrAllRead = catchAsync(async (req, res, next) => {
  await Notification.updateMany(
    { notifyTo: req.user.id },
    { $set: { status: 'READ' } }
  );
  res.json({
    status: 'success',
    message: 'All notification marked as read'
  });
});
