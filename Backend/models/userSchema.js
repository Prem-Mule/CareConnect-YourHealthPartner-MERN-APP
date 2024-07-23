const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must contain at least 3 characters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last name must contain at least 3 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Ensure phone number is exactly 10 digits long
      },
      message: "Phone number must contain exactly 10 digits",
    },
  },
  nic: {
    type: String,
    required: true,
    minLength: [12, "NIC number must contain exactly 12 digits"],
    maxLength: [12, "NIC number must contain exactly 12 digits"],
  },
  dob: {
    type: Date,
    required: [true, "Date of birth is required"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  password: {
    type: String,
    minLength: [7, "Password must contain at least 7 characters"],
    required: true,
    select: false, // Password field won't be selected by default in queries
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDept: {
    type: String,
  },
  doctorAvatar: {
    public_id: String,
    url: String,
  },
});

// Pre-save hook to hash password before saving to database
userSchema.pre("save", async function (next) {
  // Check if the password field has been modified
  if (!this.isModified("password")) {
    return next(); // Skip hashing if password is not modified
  }

  // Hash the password
  this.password = await bcrypt.hash(this.password, 7);
  next();
});

// Method to compare entered password with stored hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate JSON Web Token (JWT) for authentication
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Create User model based on userSchema
const User = mongoose.model("User", userSchema);

module.exports = { User, userSchema };
