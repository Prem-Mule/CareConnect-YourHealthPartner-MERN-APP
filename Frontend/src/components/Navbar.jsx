// export default Navbar;
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usercontext } from "../helper/Context";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { FaClinicMedical } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";

const Navbar = () => {
  const [show, setshow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(usercontext);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/register/v1/patient/logout",
        {
          withCredentials: true,
        }
      );

      await navigateTo("/"); // Redirect to login page
      setIsAuthenticated(false);
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const gotoLogin = async () => {
    navigateTo("/login");
  };

  return (
    <div className="relative">
      <div className=" flex justify-between items-center py-[1vw] px-[2vw] bg-white shadow-md">
        <div className="logo">
          <FaClinicMedical fontSize={"2.2vw"} />
        </div>
        <div
          className="hamburger cursor-pointer"
          onClick={() => {
            setshow(!show);
          }}
        >
          <TiThMenu fontSize={"2.2vw"} />
        </div>
      </div>
      <div
        className={`navlinks fixed top-0 right-0  z-10 h-full bg-blue-600 text-white flex flex-col gap-[3vw] p-[2vw] transform ${
          show ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500`}
      >
        <div
          className="links flex flex-col gap-[3vw] text-[1.2vw] items-start"
          onClick={() => {
            setshow(!show);
          }}
        >
          <div className="logo flex ">
            {show ? <TiThMenu fontSize={"2.2vw"} className="text-black" /> : null}{" "}
            {/* <FaClinicMedical fontSize={"2.2vw"} /> */}
          </div>
          <Link
            to={"/"}
            className="text-[1.2vw] font-[poppins]"
            onClick={() => {
              setshow(!show);
            }}
          >
            HOME
          </Link>
          <Link
            to={"/appointment"}
            className="text-[1.2vw] font-[poppins]"
            onClick={() => {
              setshow(!show);
            }}
          >
            APPOINTMENT
          </Link>
          <Link
            to={"/aboutus"}
            className="text-[1.2vw] font-[poppins] "
            onClick={() => {
              setshow(!show);
            }}
          >
            ABOUT US
          </Link>
        </div>
        <div className="loginbtn mt-auto">
          {isAuthenticated ? (
            <button
              className="logoutBtn btn font-[poppins] bg-zinc-800 text-white rounded-2xl py-2 px-4"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          ) : (
            <button
              className="loginBtn btn font-[poppins] bg-zinc-800 text-white rounded-2xl py-2 px-4"
              onClick={gotoLogin}
            >
              LOGIN
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
