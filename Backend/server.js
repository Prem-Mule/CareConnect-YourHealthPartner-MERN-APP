const { app } = require("./app.js");
require("dotenv").config({ path: "./config/config.env" });
const port = process.env.PORT;
require("./database/dbConnection.js"); //connection for database

const cloudinary = require("cloudinary");
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.listen(port, () => {
  console.log("Hello world");
  console.log(process.env.FRONTEND_URL);
});
