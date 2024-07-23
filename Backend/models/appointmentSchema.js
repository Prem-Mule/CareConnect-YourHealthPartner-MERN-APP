const mongoose = require("mongoose");
const validator = require("validator");

const appointmentSchema = new mongoose.Schema({
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
  appointmentDate: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  doctor: {
    firstName: { type: String, required: true },
    lastName: {
      type: String,
      required: true,
    },
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: "String",
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});
const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = { Appointment };
