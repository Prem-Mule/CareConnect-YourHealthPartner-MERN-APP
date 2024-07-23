/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { usercontext } from "../helper/AppWrapper";
import { Navigate } from "react-router-dom";
import { FaClinicMedical } from "react-icons/fa";
const appUrl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const { isAuthenticated, admin } = useContext(usercontext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          // "http://localhost:4000/api/v1/appointment/getallappointments",
          `${appUrl}/api/v1/appointment/getallappointments`,
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, [isAuthenticated]);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  const handleUpdateStatus = async (appointmentId, appointmentStatus) => {
    try {
      console.log("Appointemetn id", appointmentId);
      console.log("Appointemetn id", appointmentStatus);
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/updatestatus/${appointmentId}`,
        { appointmentStatus },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: appointmentStatus }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox flex flex-col sm:flex-row items-center p-4 bg-white shadow-md rounded-md mb-4">
            <img
              src="/doc.png"
              alt="docImg"
              className="w-24 h-24 rounded-full"
            />
            <div className="content ml-4">
              <div>
                <p>Hello ,</p>
                <h5 className="text-xl font-semibold">
                  {admin && `${admin.firstName} ${admin.lastName}`}
                </h5>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                Assumenda repellendus necessitatibus itaque.
              </p>
            </div>
          </div>
          <div className="secondBox bg-blue-500 text-white p-4 rounded-md shadow-md mb-4">
            <p>Total Appointments</p>
            <h3 className="text-2xl">1500</h3>
          </div>
          <div className="thirdBox bg-green-500 text-white p-4 rounded-md shadow-md mb-4">
            <p>Registered Doctors</p>
            <h3 className="text-2xl">10</h3>
          </div>
        </div>
        <div className="banner">
          <h5 className="text-xl font-semibold mb-4">Appointments</h5>
          <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray-300">
                  Patient
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300">Date</th>
                <th className="px-4 py-2 border-b-2 border-gray-300">Doctor</th>
                <th className="px-4 py-2 border-b-2 border-gray-300">
                  Department
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-300">Status</th>
                <th className="px-4 py-2 border-b-2 border-gray-300">
                  Visited
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="px-4 py-2 border-b">{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td className="px-4 py-2 border-b">
                      {new Date(appointment.appointmentDate).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border-b">{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td className="px-4 py-2 border-b">
                      {appointment.department}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <select
                        className={`${
                          appointment.status === "Pending"
                            ? "text-yellow-500"
                            : appointment.status === "Accepted"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                        value={appointment.status}
                        onChange={(e) =>
                          handleUpdateStatus(appointment._id, e.target.value)
                        }
                      >
                        <option value="Pending" className="text-yellow-500">
                          Pending
                        </option>
                        <option value="Accepted" className="text-green-500">
                          Accepted
                        </option>
                        <option value="Rejected" className="text-red-500">
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td className="px-4 py-2 border-b">
                      {appointment.hasVisited ? (
                        <GoCheckCircleFill className="text-green-500" />
                      ) : (
                        <AiFillCloseCircle className="text-red-500" />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-2 text-center">
                    No Appointments Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
