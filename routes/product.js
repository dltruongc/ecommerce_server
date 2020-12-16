const router = require('express').Router();
const {
  getAllProduct,
  create,
  findOne,
  getDetailsById,
} = require('../controllers/product');
const { ParseIdFromParams } = require('../middlewares/parse-int.middleware');
const { ParseCatalogIdFromBody } = require('../middlewares/catalog.middleware');
const {
  ParsePriceFromBody,
  ParseVolumeFromBody,
} = require('../middlewares/product.middleware');

router
  .route('/')
  .get(getAllProduct)
  .post(
    ParseCatalogIdFromBody,
    ParsePriceFromBody,
    ParseVolumeFromBody,
    create
  );
router.route('/:id').get(ParseIdFromParams, findOne);
router.route('/:id/details').get(ParseIdFromParams, getDetailsById);
module.exports = router;
