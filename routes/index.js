const router = require('express').Router();

router.use('/', require('./root'));
router.use('/product', require('./product'));
router.use('/catalog', require('./catalog'));

module.exports = router;
