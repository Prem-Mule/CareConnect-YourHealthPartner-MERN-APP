const appointmentRouter = require("express").Router();
const {
  isAdminAuthenticated,
  isPatientAuthenticated,
} = require("../middlewares/auth.js");
const {
  postAppointment,
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} = require("../controller/appointmentController.js");

appointmentRouter.post("/post", isPatientAuthenticated, postAppointment);
appointmentRouter.get(
  "/getallappointments",
  isAdminAuthenticated,
  getAllAppointments
);
appointmentRouter.put(
  "/updatestatus/:id",
  isAdminAuthenticated,
  updateAppointmentStatus
);
appointmentRouter.delete(
  "/delete/:id",
  isAdminAuthenticated,
  deleteAppointment
);
module.exports = { appointmentRouter };
