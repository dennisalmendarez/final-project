const { route } = require('./swagger');

const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/employees', require('./employees'));

router.use('/Stores', require('./stores'));

router.use('/products', require('./products'));

router.use('/deliveries', require('./delivery'));

module.exports = router;