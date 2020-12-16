const connection = require('../db.connector');
const { StatusCodes } = require('http-status-codes');
const { CatalogMessage } = require('./message');

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports.getAllCatalog = function (req, res, next) {
  connection.query('SELECT * FROM PRODUCTCATALOG', function (error, data) {
    if (error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: CatalogMessage.filterError, error });
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
    'SELECT * FROM PRODUCTCATALOG WHERE CATALOGID = ?',
    [req.params.id],
    function (error, data) {
      if (error)
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: CatalogMessage.filterError, error });
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
  const { name, slug } = req.body;
  const fields = 'CATALOG_NAME, CATALOG_SLUG';
  connection.query(
    `INSERT INTO PRODUCTCATALOG (${fields}) VALUES (?)`,
    [[name, slug]],
    function (error, data) {
      if (error) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: CatalogMessage.createError, error });
      }
      if (data.length == 0) return res.status(StatusCodes.NOT_FOUND).json();
      return res.json({ id: data.insertId });
    }
  );
};
