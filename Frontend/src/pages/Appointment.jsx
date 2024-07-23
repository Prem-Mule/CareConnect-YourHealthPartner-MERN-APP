/* eslint-disable no-unused-vars */
import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  console.log("appointment");
  return (
    <>
      <Hero
        title={"Schedule your Appointment | CareConnect Your Health Partner"}
        imageUrl={"/signin.png"}
      />
      <AppointmentForm />
    </>
  );
};

export default Appointment;
