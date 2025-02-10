const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();

const deliveryController = require('../controllers/delivery');
const { isAuthenticated } = require('../middleware/authenticate');
const validateDelivery = require('../middleware/validateDelivery');

// Middleware to handle validation errors
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', deliveryController.getAllDeliveries);
router.get('/:id', deliveryController.getSingleDelivery);
router.post('/', validateDelivery.createDelivery, isAuthenticated, validateRequest, deliveryController.createDelivery);
router.put('/:id', validateDelivery.updateDelivery, isAuthenticated, validateRequest, deliveryController.updateDelivery);
router.delete('/:id', isAuthenticated, deliveryController.deleteDelivery);

module.exports = router;