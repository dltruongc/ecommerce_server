const router = require('express').Router();

router.get('/', function (req, res, next) {
  return res.json({ message: 'ExpressJS' });
});

module.exports = router;
