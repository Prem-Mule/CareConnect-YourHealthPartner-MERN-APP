const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");

const generateTokens = (user, message, statuscode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role == "Admin" ? "AdminToken" : "PatientToken";
  res
    .status(statuscode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ), // Convert days to milliseconds
    })
    .json({
      success: true,
      message,
      token,
      user,
    });
};

module.exports = { generateTokens };
