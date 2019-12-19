/* eslint-disable no-console */
const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  console.log(err);
  error.message = err.message;


  console.log(err.stack);

  if(err.name === 'CastError') {
    const message = `Recipe not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  if(err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  if(error.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server error'
  });
};
module.exports = errorHandler;
