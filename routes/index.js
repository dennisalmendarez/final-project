const passport = require('passport');
const { route } = require('./swagger');

const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/employees', require('./employees'));

router.use('/Stores', require('./stores'));

router.use('/products', require('./products'));

router.use('/deliveries', require('./delivery'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if(err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;