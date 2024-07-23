const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/config.env" }); // Load environment variables from config.env file
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { errorMiddleware } = require("./middlewares/errorMiddleware.js");
const { messageRouter } = require("./Router/messageRouter.js");
const { userRouter } = require("./Router/userRouter.js");
const { appointmentRouter } = require("./Router/appointmentRouter.js");
// Middleware for handling CORS (Cross-Origin Resource Sharing) for frontend and dashboard URLs
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL], // Allow requests from these origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
// Middleware to parse cookies from the request headers
app.use(cookieParser());

// Middleware to parse JSON payloads in incoming requests
app.use(express.json()); // Note: The parentheses are necessary to invoke the function

// Middleware to parse URL-encoded payloads in incoming requests
app.use(express.urlencoded({ extended: true })); // Allow parsing of rich objects and arrays

// Middleware to handle file uploads
app.use(
  fileUpload({
    useTempFiles: true, // Enable the use of temporary files instead of memory storage
    tempFileDir: "/tmp/", // Directory where temporary files will be stored
  })
);

app.use("/api/", messageRouter);
app.use("/register/v1/", userRouter);
app.use("/api/v1/appointment/", appointmentRouter);
app.use(errorMiddleware);
// Export the app module
module.exports = { app };
