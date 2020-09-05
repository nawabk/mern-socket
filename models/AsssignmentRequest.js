const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Message is mandatory']
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  reciever: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  department: {
    type: String,
    ref: 'Department'
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING'
  }
});

const AssignmentRequest = mongoose.model('AssignmentRequest', assignmentSchema);

module.exports = AssignmentRequest;
