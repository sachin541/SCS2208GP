const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  ordernumber: {
    type: String,
    required: true,
    unique: true
  },
  customerName: {
    type: String,
    required: true
  },
  items: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,  
    ref: 'User',  
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
