const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();

const productsController = require('../controllers/products');
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
router.post('/', validateProducts.createProduct, validateRequest, productsController.createProduct);
router.put('/:id', validateProducts.updateProduct, validateRequest, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;