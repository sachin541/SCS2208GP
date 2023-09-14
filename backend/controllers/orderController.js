const Order = require('../models/orderModel')
const mongoose = require('mongoose')

// get all orders
const getOrders = async (req, res) => {
  const user_id = req.user._id

  const orders = await Order.find({user_id}).sort({createdAt: -1})

  res.status(200).json(orders)
}

// get a single order
const getOrder = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such order'})
  }

  const order = await Order.findById(id)

  if (!order) {
    return res.status(404).json({error: 'No such order'})
  }
  
  res.status(200).json(order)
}

// create new order
const createOrder = async (req, res) => {
  const { ordernumber, customerName, items, price } = req.body

  let emptyFields = []

  if(!ordernumber) {
    emptyFields.push('ordernumber')
  }
  if(!customerName) {
    emptyFields.push('customerName')
  }
  if(!items) {
    emptyFields.push('items')
  }
  if(!price) {
    emptyFields.push('price')
  }

  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const order = await Order.create({ ordernumber, customerName, items, price, user_id })
    res.status(200).json(order)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete an order
const deleteOrder = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such order'})
  }

  const order = await Order.findOneAndDelete({_id: id})

  if (!order) {
    return res.status(400).json({error: 'No such order'})
  }

  res.status(200).json(order)
}

// update an order
const updateOrder = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such order'})
  }

  const order = await Order.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!order) {
    return res.status(400).json({error: 'No such order'})
  }

  res.status(200).json(order)
}

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder
}
