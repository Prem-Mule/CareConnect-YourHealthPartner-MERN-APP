const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors.js");
const { ErrorHandler } = require("../middlewares/errorMiddleware.js");
const { Appointments, Appointment } = require("../models/appointmentSchema.js");
const { User } = require("../models/userSchema.js");

const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointmentDate,
    department,
    doctorFirstName,
    doctorLastName,
    hasVisited,
    address,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointmentDate ||
    !department ||
    !doctorFirstName ||
    !doctorLastName ||
    !address
  ) {
    return next(new ErrorHandler("Please fill out the full form"), 400);
  }
  console.log(doctorFirstName, doctorLastName, department);
  // Fetch doctor data
  const doctorRole = "Doctor";
  const isConflict = await User.find({
    firstName: doctorFirstName,
    role: doctorRole,
    doctorDept: department,
    lastName: doctorLastName,
  });
  console.log("isconflict", isConflict);
  if (isConflict.length == 0) {
    return next(new ErrorHandler("Doctor not found"), 400);
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors conflict, Please contact through email or phone"
      ),
      400
    );
  }
  console.log("req.user is", req.user);
  const patientId = req.user._id;
  const doctorId = isConflict[0]._id;
  const Appointments = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointmentDate,
    department,
    doctor: {
      firstName: doctorFirstName,
      lastName: doctorLastName,
    },
    hasVisited,
    address,
    patientId,
    doctorId,
  });
  res.status(200).json({
    success: true,
    message: "Appointment booked Successfully",
    Appointment,
  });
});

const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});

const updateAppointmentStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 400));
  }

  appointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: `Status updated successfully as ${req.body.status}`,
    updated_Appointment: appointment,
  });
});

const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment not found", 400));
  }
  appointment = await Appointment.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Appointment cancelled successfully",
    DeletedAppointment: appointment,
  });
});
module.exports = {
  postAppointment,
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment,
};
