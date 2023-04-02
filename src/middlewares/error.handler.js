const debug = require('debug')('my-store:middleware-error');

function logErrors(err, req, res, next) {
  debug('logError');
  //   console.log(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  debug('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = { logErrors, errorHandler };
