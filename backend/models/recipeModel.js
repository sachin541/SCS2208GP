const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,  
    ref: 'User',  
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);

