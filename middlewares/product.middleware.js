const { StatusCodes } = require('http-status-codes');
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports.ParseVolumeFromBody = function (req, res, next) {
  req.body.volume = req.body.volume.trim().replace(' ', '') * 1;
  if (!isNaN(req.body.volume)) {
    return next();
  }
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: 'Cannot convert volume to a number' });
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports.ParsePriceFromBody = function (req, res, next) {
  req.body.price = req.body.price.trim().replace(' ', '') * 1;
  if (!isNaN(req.body.price)) {
    return next();
  }
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: 'Cannot convert price to a number' });
};
