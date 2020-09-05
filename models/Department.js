const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please tell us the department name']
  },
  users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ]
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
