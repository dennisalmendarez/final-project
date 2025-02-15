const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();

const employeesController = require('../controllers/employees');
const { isAuthenticated } = require('../middleware/authenticate');
const validateEmployee = require('../middleware/validateEmployee');

// Middleware to handle validation errors
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', employeesController.getAllEmployees);
router.get('/:id', employeesController.getSingleEmployee);
router.post('/', validateEmployee.createEmployee, isAuthenticated, validateRequest, employeesController.createEmployee);
router.put('/:id', validateEmployee.updateEmployee, isAuthenticated, validateRequest, employeesController.updateEmployee);
router.delete('/:id', isAuthenticated, employeesController.deleteEmployee);

module.exports = router;