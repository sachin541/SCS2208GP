const express = require('express');
const {
  getEmployees, 
  getEmployee, 
  createEmployee, 
  deleteEmployee, 
  updateEmployee
} = require('../controllers/employeeController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all employee routes
router.use(requireAuth);

// GET all employees
router.get('/', getEmployees);

// GET a single employee
router.get('/:id', getEmployee);

// POST a new employee
router.post('/', createEmployee);

// DELETE an employee
router.delete('/:id', deleteEmployee);

// UPDATE an employee
router.patch('/:id', updateEmployee);

module.exports = router;

