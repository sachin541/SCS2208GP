const Beverage = require('../models/beverageModel');
const mongoose = require('mongoose');

// get all beverages
const getBeverages = async (req, res) => {
  const user_id = req.user._id

  const beverages = await Beverage.find({user_id}).sort({createdAt: -1});
  res.status(200).json(beverages);
};

// get a single beverage
const getBeverage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such beverage'});
  }

  const beverage = await Beverage.findById(id);

  if (!beverage) {
    return res.status(404).json({error: 'No such beverage'});
  }

  res.status(200).json(beverage);
};

// create a new beverage
const createBeverage = async (req, res) => {
    const { name, description, price, sizeMl } = req.body;
  
    try {
      const user_id = req.user._id
      const beverage = await Beverage.create({ name, description, price, sizeMl, user_id });
      res.status(200).json(beverage);
    } catch (error) {
      if (error.code === 11000) {  // This is the MongoDB error code for a duplicate key
        return res.status(400).json({ error: 'Beverage with this name already exists.' });
      }
      res.status(400).json({ error: error.message });
    }
  };

// delete a beverage
const deleteBeverage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such beverage'});
  }

  const beverage = await Beverage.findOneAndDelete({_id: id});

  if(!beverage) {
    return res.status(400).json({error: 'No such beverage'});
  }

  res.status(200).json(beverage);
};

// update a beverage
const updateBeverage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such beverage'});
  }

  const beverage = await Beverage.findOneAndUpdate({_id: id}, {
    ...req.body
  });

  if (!beverage) {
    return res.status(400).json({error: 'No such beverage'});
  }

  res.status(200).json(beverage);
};

module.exports = {
  getBeverages,
  getBeverage,
  createBeverage,
  deleteBeverage,
  updateBeverage
};
