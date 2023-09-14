const express = require('express');
const {
  getBeverages, 
  getBeverage, 
  createBeverage, 
  deleteBeverage, 
  updateBeverage
} = require('../controllers/beverageController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all beverage routes
router.use(requireAuth);

// GET all beverages
router.get('/', getBeverages);

// GET a single beverage
router.get('/:id', getBeverage);

// POST a new beverage
router.post('/', createBeverage);

// DELETE a beverage
router.delete('/:id', deleteBeverage);

// UPDATE a beverage
router.patch('/:id', updateBeverage);

module.exports = router;
