const { body } = require('express-validator');

const validateEmployee = {
    createEmployee: [
        body('name').notEmpty().withMessage('Employee name is required'),
        body('position').notEmpty().withMessage('Position is required'),
        body('salary').optional().isFloat({ min: 0 }).withMessage('Salary must be a positive number'),
        body('hireDate').isISO8601().withMessage('Invalid hire date format'),
        body('storeId').notEmpty().withMessage('Store ID is required'),
        body('status').optional().isIn(['Active', 'Inactive']).withMessage('Invalid status'),
        body('performanceRating').optional().isFloat({ min: 0, max: 5 }).withMessage('Performance rating must be between 0 and 5'),
        body('shiftSchedule').optional().isString(),
    ],

    updateEmployee: [
        body('name').optional().notEmpty(),
        body('position').optional().notEmpty(),
        body('salary').optional().isFloat({ min: 0 }),
        body('hireDate').optional().isISO8601(),
        body('storeId').optional().notEmpty(),
        body('status').optional().isIn(['Active', 'Inactive']),
        body('performanceRating').optional().isFloat({ min: 0, max: 5 }),
        body('shiftSchedule').optional().isString(),
    ],
};

module.exports = validateEmployee;