const connection = require('../db.connector');
const { StatusCodes } = require('http-status-codes');
const { ProductMessage } = require('./message');

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports.getAllProduct = function (req, res, next) {
  connection.query('SELECT * FROM PRODUCT', function (error, data) {
    if (error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: ProductMessage.filterError, error });

    return res.json(data);
  });
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports.findOne = function (req, res, next) {
  connection.query(
    'SELECT * FROM PRODUCT WHERE PRODUCTID = ?',
    [req.params.id],
    function (error, data) {
      if (error)
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: ProductMessage.filterError, error });
      if (data.length == 0) return res.status(StatusCodes.NOT_FOUND).json();
      return res.json(data[0]);
    }
  );
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports.create = function (req, res, next) {
  const { catalogId, name, volume, price } = req.body;
  const fields =
    'CATALOGID, PRODUCT_NAME, PRODUCT_VOLUME, PRODUCT_PRICE, CREATED_AT, UPDATED_AT';
  const date = new Date();
  connection.query(
    `INSERT INTO PRODUCT (${fields}) VALUES (?)`,
    [[catalogId, name, volume, price, date, date]],
    function (error, data) {
      if (error?.errno === 1452) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: ProductMessage.foreignNotfound, error });
      }
      if (error) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: ProductMessage.createError, error });
      }
      return res.json({ id: data.insertId });
    }
  );
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports.getDetailsById = function (req, res, next) {
  connection.query(
    'SELECT * FROM PRODUCT JOIN PRODUCTCATALOG ctg ON ctg.CATALOGID = PRODUCT.CATALOGID WHERE PRODUCTID = ?',
    [req.params.id],
    function (error, data) {
      if (error)
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: ProductMessage.filterError, error });
      if (data.length == 0) return res.status(StatusCodes.NOT_FOUND).json();
      return res.json(data[0]);
    }
  );
};
