const { body } = require('express-validator');

const validateProducts = {
    createProduct: [
        body('name').notEmpty().withMessage('Product name is required'),
        body('description').optional().isString(),
        body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
        body('category').notEmpty().withMessage('Category is required'),
        body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a positive integer'),
        body('storeId').notEmpty().withMessage('Store ID is required'),
        body('isAvailable').optional().isBoolean().withMessage('Availability must be true or false'),
    ],

    updateProduct: [
        body('name').optional().notEmpty(),
        body('description').optional().isString(),
        body('price').optional().isFloat({ min: 0 }),
        body('category').optional().notEmpty(),
        body('stock').optional().isInt({ min: 0 }),
        body('storeId').optional().notEmpty(),
        body('isAvailable').optional().isBoolean(),
    ],
};

module.exports = validateProducts;