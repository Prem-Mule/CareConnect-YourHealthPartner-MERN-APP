const mongoose = require("mongoose");
const validator = require("validator");
const messageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must contain at least 3 characters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "last name must contain atleast 3 characters"],
  },
  email: {
    required: true,
    type: String,
    validate: [validator.isEmail, "Please provide a valide email"],
  },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Ensure phone number is exactly 10 characters long
      },
      message: "Phone number must contain exactly 10 digits",
    },
  },
  message: {
    type: String,
    required: true,
  },
});
const Message = mongoose.model("Message", messageSchema);
module.exports = { Message };
