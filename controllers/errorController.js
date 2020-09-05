const AppError = require('../utils/appError');

const handleCastErroDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};
const hanldeDuplicateFieldsDB = err => {
  let value = err.message.match(/(["'](\\?.)*?\1)/);
  value = value ? value[0] : 'No Value';
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data.${errors.join('. ')}`;
  return new AppError(message, 400);
};
const handleJwtError = () =>
  new AppError('Invalid token,Please login again', 401);
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  console.log(err);
  let copyErr = { ...err };
  copyErr.message = err.message;
  if (copyErr.name === 'CastError') copyErr = handleCastErroDB(copyErr);
  if (copyErr.code === 11000) copyErr = hanldeDuplicateFieldsDB(copyErr);
  if (copyErr.name === 'ValidationError')
    copyErr = handleValidationErrorDB(copyErr);
  if (copyErr.name === 'JsonWebTokenError') copyErr = handleJwtError();
  res.status(copyErr.statusCode).json({
    status: err.status,
    message: err.message
  });
};
