const { StatusCodes } = require('http-status-codes');
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports.ParseCatalogIdFromBody = function (req, res, next) {
  req.body.catalogId = req.body.catalogId.trim().replace(' ', '') * 1;
  if (!isNaN(req.body.catalogId)) {
    return next();
  }
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: 'Cannot convert id to a number' });
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports.ParseCatalogIdFromParams = function (req, res, next) {
  req.params.catalogId = req.params.catalogId.trim().replace(' ', '') * 1;
  if (!isNaN(req.params.catalogId)) {
    return next();
  }
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: 'Cannot convert id to a number' });
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports.JoinSlugNames = function (req, res, next) {
  if (req.body.slug && req.body.slug.length > 0 && typeof x !== 'string') {
    req.body.slug = req.body.slug.join(', ');
    return next();
  }
  return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid slug' });
};
