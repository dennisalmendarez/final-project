const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();

const storesController = require('../controllers/stores');
const { isAuthenticated } = require('../middleware/authenticate');
const validateStore = require('../middleware/validateStore');

// Middleware to handle validation errors
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.get('/', storesController.getAll);
router.get('/:id', storesController.getSingle);
router.post('/', validateStore.createStore, isAuthenticated, validateRequest, storesController.createStore);
router.put('/:id', validateStore.updateStore, isAuthenticated, validateRequest, storesController.updateStore);
router.delete('/:id', isAuthenticated, storesController.deleteStore);

module.exports = router;