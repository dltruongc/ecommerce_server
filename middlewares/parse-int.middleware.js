const { StatusCodes } = require('http-status-codes');
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports.ParseIdFromParams = function (req, res, next) {
  req.params.id = req.params.id.trim().replace(' ', '') * 1;
  if (!isNaN(req.params.id)) {
    return next();
  }
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: 'Cannot convert id to a number' });
};
