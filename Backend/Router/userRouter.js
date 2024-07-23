const express = require("express");
const {
  userController,
  login,
  addNewAdmin,
  getAllDoctors,
  getUserDetails,
  logoutAdmin,
  logoutPatient,
  addNewDoctor,
} = require("../controller/userController.js");
const {
  isAdminAuthenticated,
  isPatientAuthenticated,
} = require("../middlewares/auth.js");
const userRouter = express.Router();
userRouter.post("/registeruser/", userController);
userRouter.post("/loginuser/", login);
userRouter.post("/addnewuser/", isAdminAuthenticated, addNewAdmin);
userRouter.get("/doctors/", getAllDoctors);
userRouter.get("/admin/me/", isAdminAuthenticated, getUserDetails);
userRouter.get("/patient/me/", isPatientAuthenticated, getUserDetails);
userRouter.get("/admin/logout/", isAdminAuthenticated, logoutAdmin);
userRouter.get("/patient/logout/", isPatientAuthenticated, logoutPatient);
userRouter.post("/doctor/addnewdoctor", isAdminAuthenticated, addNewDoctor);
module.exports = { userRouter };
