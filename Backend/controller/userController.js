const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors.js");
const { ErrorHandler } = require("../middlewares/errorMiddleware.js");
const { User } = require("../models/userSchema.js");
const { generateTokens } = require("../utils/jwtTokens.js");
const cloudinary = require("cloudinary").v2;
require("../middlewares/errorMiddleware.js");

const userController = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    gender,
    role,
    dob,
    password,
  } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User with email already exists", 400));
  }
  // user = User.create({
  //   firstName,
  //   lastName,
  //   email,
  //   phone,
  //   nic,
  //   gender,
  //   role,
  //   dob,
  //   password,
  // })
  //   .then(() => {
  //     // res.json({
  //     //   success: "true",
  //     //   message: "User registered Successfully",
  //     // });
  //     generateTokens(user, "User registered Successfully", 200, res);
  //   })
  //   .catch((err) => {
  //     return next(new ErrorHandler(err, 400));
  //   });

  try {
    // Create the user
    user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      gender,
      role,
      dob,
      password,
    });

    // Now user should have access to instance methods like generateJsonWebToken
    generateTokens(user, "User registered successfully", 200, res);
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});

const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmpassword, role } = req.body;
  if (!email || !password || !confirmpassword || !role) {
    return next(new ErrorHandler("Fill the full form", 400));
  }
  if (password != confirmpassword) {
    return next(
      new ErrorHandler("password and confirm Password doesnot match", 400)
    );
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (!user) {
    return next(new ErrorHandler("Invalid email or password entered", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password", 400));
  } else if (user.role != role) {
    return next(new ErrorHandler("User with this role not found ", 400));
  }

  // res.status(200).json({
  //   success:true,
  //   message:"User successfully login"
  // })
  generateTokens(user, "User Successfully Login", 200, res);
});

const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, gender, dob, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !gender ||
    !dob ||
    !password
  ) {
    return next(new ErrorHandler("Please fill the full form", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} with this email already Exists!`,
        400
      )
    );
  }
  const role = "Admin";
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    gender,
    role,
    dob,
    password,
    role,
  });
  res
    .status(200)
    .json({ success: true, message: "Admin Registered Successfully" });
});

const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({ success: true, user });
});

const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("AdminToken", "")
    .json({ success: true, message: "Admin Logged out Successfully" });
});

const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("PatientToken", "", {
      httpOnly: true,
      expire: new Date(Date.now),
    })
    .json({ success: true, message: "Patient Logged out Successfully" });
});

const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length == 0) {
    return next(new ErrorHandler("Doctor Avatar Registered", 400));
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    gender,
    dob,
    password,
    doctorDept,
  } = req.body;
  const { doctAvatar } = req.files;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !gender ||
    !dob ||
    !password ||
    !doctorDept
  ) {
    return next(new ErrorHandler("Please fill out the entire form.", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} is already registered with this email`,
        400
      )
    );
  }
  const AllowedFormat = ["image/png", "image/jpeg"];
  if (!AllowedFormat.includes(doctAvatar.mimetype)) {
    return next(new ErrorHandler("file type not supported", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    doctAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary ERROR:",
      cloudinaryResponse.error || "unknown cloudinary error"
    );
  }
  console.log(cloudinaryResponse);
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    gender,
    dob,
    password,
    role: "Doctor",
    doctorDept,
    doctorAvatar: {
      public_id: `${cloudinaryResponse.public_id}`,
      url: `${cloudinaryResponse.secure_url}`,
    },
  });
  res
    .status(200)
    .json({ success: true, message: "Doctor Registered Successfully", doctor });
});
module.exports = {
  userController,
  login,
  addNewAdmin,
  getAllDoctors,
  getUserDetails,
  logoutAdmin,
  logoutPatient,
  addNewDoctor,
};
