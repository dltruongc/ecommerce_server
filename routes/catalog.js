const router = require('express').Router();
const { getAllCatalog, create, findOne } = require('../controllers/catalog');
const { ParseIdFromParams } = require('../middlewares/parse-int.middleware');
const { JoinSlugNames } = require('../middlewares/catalog.middleware');
const {
  ParsePriceFromBody,
  ParseVolumeFromBody,
} = require('../middlewares/product.middleware');
router.route('/').get(getAllCatalog).post(JoinSlugNames, create);
router.route('/:id').get(ParseIdFromParams, findOne);
module.exports = router;
