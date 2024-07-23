const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL, { dbName: "Hospital_Management_system" })
    .then(() => {
      console.log("Database connection successful");
    })
    .catch((err) => {
      console.error(`Error occurred while connecting to database: ${err}`);
    });
};
dbConnect();
module.exports = { dbConnect };
