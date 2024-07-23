/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Bounce, ToastContainer } from "react-toastify";
import axios from "axios";
import Login from "./pages/Login.jsx";
import AddnewDoctor from "./pages/AddnewDoctor.jsx";
import AddnewAdmin from "./pages/AddnewAdmin.jsx";
import Messages from "./pages/Messages.jsx";
import Doctors from "./pages/Doctors.jsx";
import "react-toastify/dist/ReactToastify.css"; // Ensure you have this import for toast styles
import Sidebar from "./components/Sidebar.jsx";
import "./App.css";
import { usercontext } from "./helper/Appwrapper.jsx";
const appUrl = import.meta.env.VITE_API_URL;

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(usercontext);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await axios.get(
          // "http://localhost:4000/register/v1/admin/me",
          `${appUrl}/register/v1/admin/me`,
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setAdmin(resp.data.user);
        console.log("User is ", resp.data.user);
      } catch (err) {
        setIsAuthenticated(false);
        setAdmin({});
        console.log("Error fetching user: ", err);
      }
    };
    fetchUser();
  }, [setIsAuthenticated, setAdmin]);

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor/addnew" element={<AddnewDoctor />} />
          <Route path="/admin/addnew" element={<AddnewAdmin />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </Router>
    </>
  );
};

export default App;
