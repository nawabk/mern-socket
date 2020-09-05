const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Notification is required']
  },
  status: {
    type: String,
    enum: ['READ', 'UNREAD'],
    default: 'UNREAD'
  },
  notifyTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
