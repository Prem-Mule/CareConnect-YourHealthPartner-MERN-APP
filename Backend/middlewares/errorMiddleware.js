class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
let message = "Internal Server error";
const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || message;
  err.statusCode = err.statusCode || 500;
  if (err.code === 11000) {
    message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    message = `Json web token is invalid, Try again`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    message = `Json web token is expired, Try again`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "CastError") {
    message = `Invalid  ${err.path}: ${err.value} `;
    err = new ErrorHandler(message, 400);
  }

  var errorResponse = err.errors
    ? Object.values(err.errors)
        .map((er) => er.message)
        .join(" /n")
    : err.message;

  console.log(errorResponse);
  if (errorResponse.startsWith("ValidationError:")) {
    // Remove "ValidationError:" prefix
    errorResponse = errorResponse.replace("ValidationError:", "").trim();
  }
  return res.status(err.statusCode).json({
    success: false,
    message: errorResponse,
  });
};
module.exports = { ErrorHandler, errorMiddleware };
