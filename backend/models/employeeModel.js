const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  NIC: {
    type: String,
    required: true,
    unique: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  user_id: {  
    type: Schema.Types.ObjectId,  
    required: true,
    ref: 'User' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
