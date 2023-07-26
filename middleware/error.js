const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";

  // wrong Mongodb id error
  let message = "";

  if (err.name === "CastError") {
    message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // mongoose duplicate key error
  if (err.code === 11000) {
    message = `Duplicate ${Object.keys(err.keyValue)} Entered `;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt  error
  if (err.name === "jsonWebTokenError") {
    message = `Json web token is invalid , try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT expire error
  if (err.name === "TokenExpiredError") {
    message = `Json web token is Expired , try again`;
    err = new ErrorHandler(message, 400);
  }

  // if (message === "") {
  //   message = "unknown error";
  //   err = new ErrorHandler(message, 400);
  // }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
