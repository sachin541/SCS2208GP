const Employee = require('../models/employeeModel');
const mongoose = require('mongoose');

const getEmployees = async (req, res) => {
  const user_id = req.user._id;
  const employees = await Employee.find({user_id}).sort({createdAt: -1});
  res.status(200).json(employees);
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such employee'});
  }

  const employee = await Employee.findOne({_id: id, user_id});

  if (!employee) {
    return res.status(404).json({error: 'No such employee'});
  }

  res.status(200).json(employee);
};

const createEmployee = async (req, res) => {
  const { name, NIC, birthdate, phone, email, jobTitle, address } = req.body;
  const user_id = req.user._id;

  try {
    const employee = await Employee.create({ 
      name, NIC, birthdate, phone, email, jobTitle, address, user_id 
    });
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such employee'});
  }

  const employee = await Employee.findOneAndDelete({_id: id, user_id});

  if(!employee) {
    return res.status(400).json({error: 'No such employee'});
  }

  res.status(200).json(employee);
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such employee'});
  }

  const employee = await Employee.findOneAndUpdate({_id: id, user_id}, {
    ...req.body
  });

  if (!employee) {
    return res.status(400).json({error: 'No such employee'});
  }

  res.status(200).json(employee);
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee
};
