const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();

const productsController = require('../controllers/products');
const { isAuthenticated } = require('../middleware/authenticate');
const validateProducts = require('../middleware/validateProducts');

// Middleware to handle validation errors
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getSingleProduct);
router.post('/', validateProducts.createProduct, isAuthenticated, validateRequest, productsController.createProduct);
router.put('/:id', validateProducts.updateProduct, isAuthenticated, validateRequest, productsController.updateProduct);
router.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = router;