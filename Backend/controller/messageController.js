const { Message } = require("../models/messageSchema.js");
require("express");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors.js");
const { ErrorHandler } = require("../middlewares/errorMiddleware.js");

const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    // return res.status(200).json({
    //   success: "false",
    //   message: "Please fill full form",
    // });
    return next(new ErrorHandler("Please fill Full form", 400));
  }

  await Message.create({ firstName, lastName, email, phone, message })
    .then(() => {
      res.json({
        success: "true",
        message: "Message send successfully",
      });
    })
    .catch((err) => {
      return next(new ErrorHandler(err, 400));
      // res.json({ success: "false", message: ` ${err}` });
    });
});

const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({ success: true, Messages: messages });
});
module.exports = { sendMessage, getAllMessages };
