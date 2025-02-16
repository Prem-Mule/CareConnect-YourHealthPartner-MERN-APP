/* eslint-disable no-unused-vars */
// export default App;
import React, { useContext, useEffect } from "react";
import { usercontext } from "./helper/Context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/Navbar";
import axios from "axios";
import Footer from "./components/Footer";
const appUrl = import.meta.env.VITE_API_URL;

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(usercontext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await axios.get(
          // "http://localhost:4000/register/v1/patient/me",
          `${appUrl}/register/v1/patient/me`,
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(resp.data.user);
        console.log("User is ", resp.data.user);
      } catch (err) {
        setIsAuthenticated(false);
        setUser({});
        console.log("Error fetching user: ", err);
      }
    };
    fetchUser();
  }, [setIsAuthenticated, setUser]);

  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
