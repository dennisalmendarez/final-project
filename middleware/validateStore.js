const { body } = require('express-validator');

const validateStore = {
    createStore: [
        body('name').notEmpty().withMessage('Store name is required'),
        body('description').optional().isString(),
        body('openingDate').isISO8601().withMessage('Invalid date format'),
        body('daysOfWeekStoreIsClose').optional().isString(),
        body('status').optional().isIn(['Operating', 'Closed']).withMessage('Invalid status'),
        body('NumOfEmployees').optional().isInt({ min: 0 }).withMessage('Number of employees must be a positive integer'),
        body('NumOfManagers').optional().isInt({ min: 0 }).withMessage('Number of managers must be a positive integer'),
        body('popularityInArea').optional().isFloat({ min: 0 }).withMessage('Popularity must be a positive number'),
        body('anualSales').optional().isFloat({ min: 0 }).withMessage('Annual sales must be a positive number'),
        body('averageCustomerPerAge').optional().isFloat({ min: 0 }),
        body('deliveryService').optional().isBoolean().withMessage('Delivery service must be true or false'),
    ],

    updateStore: [
        body('name').optional().notEmpty(),
        body('description').optional().isString(),
        body('openingDate').optional().isISO8601(),
        body('daysOfWeekStoreIsClose').optional().isString(),
        body('status').optional().isIn(['Operating', 'Closed']),
        body('NumOfEmployees').optional().isInt({ min: 0 }),
        body('NumOfManagers').optional().isInt({ min: 0 }),
        body('popularityInArea').optional().isFloat({ min: 0 }),
        body('anualSales').optional().isFloat({ min: 0 }),
        body('averageCustomerPerAge').optional().isFloat({ min: 0 }),
        body('deliveryService').optional().isBoolean(),
    ],
};

module.exports = validateStore;