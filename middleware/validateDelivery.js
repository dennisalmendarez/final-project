const { body } = require('express-validator');

const validateDelivery = {
    createDelivery: [
        body('orderId').notEmpty().withMessage('Order ID is required'),
        body('customerName').notEmpty().withMessage('Customer name is required'),
        body('address').notEmpty().withMessage('Address is required'),
        body('deliveryDate').isISO8601().withMessage('Invalid delivery date format'),
        body('status').optional().isIn(['Pending', 'In Transit', 'Delivered']).withMessage('Invalid status'),
        body('courier').optional().isString(),
        body('estimatedTime').optional().isString(),
    ],

    updateDelivery: [
        body('orderId').optional().notEmpty(),
        body('customerName').optional().notEmpty(),
        body('address').optional().notEmpty(),
        body('deliveryDate').optional().isISO8601(),
        body('status').optional().isIn(['Pending', 'In Transit', 'Delivered']),
        body('courier').optional().isString(),
        body('estimatedTime').optional().isString(),
    ],
};

module.exports = validateDelivery;