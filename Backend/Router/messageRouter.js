const express = require("express");
const messageRouter = express.Router();
const {
  sendMessage,
  getAllMessages,
} = require("../controller/messageController.js");
const { isAdminAuthenticated } = require("../middlewares/auth.js");
messageRouter.post("/sendmsg", sendMessage);
messageRouter.get("/getallmessages", isAdminAuthenticated, getAllMessages);
module.exports = { messageRouter };
