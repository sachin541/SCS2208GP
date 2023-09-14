const express = require('express');
const {
  getOrders, 
  getOrder, 
  createOrder, 
  deleteOrder, 
  updateOrder
} = require('../controllers/orderController'); 
const requireAuth = require('../middleware/requireAuth');  

const router = express.Router();

// require auth for all order routes
router.use(requireAuth);

// GET all orders
router.get('/', getOrders);

// GET a single order
router.get('/:id', getOrder);

// POST a new order
router.post('/', createOrder);

// DELETE an order
router.delete('/:id', deleteOrder);

// UPDATE an order
router.patch('/:id', updateOrder);

module.exports = router;
