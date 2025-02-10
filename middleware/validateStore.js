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
// #swagger.info = 'This file contains the validation rules for the Stores API.'
// #swagger.info = 'These rules are used to validate the request body before processing the request.'
// #swagger.info = 'The createStore rules are used to validate the request body when creating a new store.'
// #swagger.info = 'The updateStore rules are used to validate the request body when updating an existing store.'
// #swagger.info = 'The rules check if the required fields are present and if the values are of the correct type.'
// #swagger.info = 'If a field is missing or has an invalid value, an error message is returned.'
// #swagger.info = 'The rules are defined using the express-validator library.'
// #swagger.info = 'The body function is used to access the request body and define the validation rules.'
// #swagger.info = 'The notEmpty function is used to check if a field is present and not empty.'
// #swagger.info = 'The isString function is used to check if a field is a string.'
// #swagger.info = 'The isFloat function is used to check if a field is a floating-point number.'
// #swagger.info = 'The isInt function is used to check if a field is an integer.'
// #swagger.info = 'The isBoolean function is used to check if a field is a boolean.'
// #swagger.info = 'The isISO8601 function is used to check if a field is a valid ISO 8601 date.'
// #swagger.info = 'The isIn function is used to check if a field is one of the specified values.'
// #swagger.info = 'The withMessage function is used to define the error message for each validation rule.'
// #swagger.info = 'The optional function is used to allow a field to be missing in the request body.'
// #swagger.info = 'The validateStore object contains the validation rules for the Stores API.'
// #swagger.info = 'The createStore array contains the rules for creating a new store.'
// #swagger.info = 'The updateStore array contains the rules for updating an existing store.'
// #swagger.info = 'The rules are exported so they can be used in the stores controller.'
// #swagger.info = 'The rules are defined in a separate file to keep the controller code clean and organized.'
// #swagger.info = 'This separation of concerns makes the code easier to maintain and test.'
// #swagger.info = 'The rules are reusable and can be used in other parts of the application as needed.'