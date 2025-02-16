const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");

const generateTokens = (user, message, statuscode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role == "Admin" ? "AdminToken" : "PatientToken";
  res
    .status(statuscode)
    .cookie(cookieName, token, {
      // expires: new Date(
      //   Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      // ), // Convert days to milliseconds
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ), // Cookie expiry set to X days
      // Cookie expiry set to X days
      httpOnly: true,
      sameSite: "None", // Ensures the cookie is sent with cross-site requests
      secure: true, // Ensures the cookie is only sent over HTTPS
    })
    .json({
      success: true,
      message,
      token,
      user,
    });
};

module.exports = { generateTokens };
