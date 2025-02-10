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
// #swagger.info = 'This file contains the validation rules for the Products API.'
// #swagger.info = 'These rules are used to validate the request body before processing the request.'
// #swagger.info = 'The createProduct rules are used to validate the request body when creating a new product.'
// #swagger.info = 'The updateProduct rules are used to validate the request body when updating an existing product.'
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
// #swagger.info = 'The validateProducts object contains the validation rules for the Products API.'
// #swagger.info = 'The createProduct array contains the rules for creating a new product.'
// #swagger.info = 'The updateProduct array contains the rules for updating an existing product.'
// #swagger.info = 'The rules are exported so they can be used in the products controller.'
// #swagger.info = 'The rules are defined in a separate file to keep the controller code clean and organized.'
// #swagger.info = 'This separation of concerns makes the code easier to maintain and test.'
// #swagger.info = 'The rules are reusable and can be used in other parts of the application as needed.'