const { catchAsyncErrors } = require("./catchAsyncErrors.js");
const { ErrorHandler } = require("./errorMiddleware.js");
const { User } = require("../models/userSchema.js");
const jwt = require("jsonwebtoken");

const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.AdminToken; // Ensure this matches the cookie name used when setting the token

  // Authentication check
  if (!token) {
    return next(new ErrorHandler("Admin not authenticated", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    // Authorization check
    if (req.user.role !== "Admin") {
      return next(
        new ErrorHandler(
          `${req.user.role} is not authorized for resources`,
          403
        )
      );
    }

    next();
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});
const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.PatientToken; // Ensure this matches the cookie name used when setting the token

  // Authentication check
  if (!token) {
    return next(new ErrorHandler("Patient not authenticated", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    // Authorization check
    if (req.user.role !== "Patient") {
      return next(
        new ErrorHandler(
          `${req.user.role} is not authorized for resources`,
          403
        )
      );
    }

    next();
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});
module.exports = { isAdminAuthenticated, isPatientAuthenticated };
