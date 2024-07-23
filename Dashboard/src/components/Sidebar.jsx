import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { usercontext } from "../helper/Appwrapper";
import "../App.css";
const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(usercontext);

  const handleLogout = async () => {
    try {
      let res = await axios.get(
        "http://localhost:4000/register/v1/admin/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setIsAuthenticated(false);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message || "somethinng went wrong");
    }
  };

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShow(!show);
  };
  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };

  return (
    //     <>
    //       <nav
    //         className={`${
    //           isAuthenticated ? "hidden" : "flex"
    //         } flex-col bg-gray-800 text-white fixed top-0 left-0 h-full w-[4vw] transition-transform transform ${
    //           show ? "translate-x-0" : "-translate-x-full"
    //         } md:translate-x-0`}
    //       >
    //         <div className="flex flex-col items-center md:items-start p-4 space-y-6 mt-10">
    //           <TiHome
    //             className="text-2xl md:text-3xl cursor-pointer hover:text-blue-400"
    //             onClick={gotoHomePage}
    //           />
    //           <FaUserDoctor
    //             className="text-2xl md:text-3xl cursor-pointer hover:text-blue-400"
    //             onClick={gotoDoctorsPage}
    //           />
    //           <MdAddModerator
    //             className="text-2xl md:text-3xl cursor-pointer hover:text-blue-400"
    //             onClick={gotoAddNewAdmin}
    //           />
    //           <IoPersonAddSharp
    //             className="text-2xl md:text-3xl cursor-pointer hover:text-blue-400"
    //             onClick={gotoAddNewDoctor}
    //           />
    //           <AiFillMessage
    //             className="text-2xl md:text-3xl cursor-pointer hover:text-blue-400"
    //             onClick={gotoMessagesPage}
    //           />
    //           <RiLogoutBoxFill
    //             className="text-2xl md:text-3xl cursor-pointer hover:text-red-400"
    //             onClick={handleLogout}
    //           />
    //         </div>
    //       </nav>
    //       <div
    //         className={`${
    //           isAuthenticated ? "hidden" : "flex"
    //         } absolute top-4 left-4 md:hidden`}
    //       >
    //         <GiHamburgerMenu
    //           className="text-3xl cursor-pointer text-gray-800 hover:text-gray-600"
    //           onClick={() => setShow(!show)}
    //         />
    //       </div>
    //     </>
    //   );
    // };

    // export default Sidebar;
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={gotoHomePage} />
          <FaUserDoctor onClick={gotoDoctorsPage} />
          <MdAddModerator onClick={gotoAddNewAdmin} />
          <IoPersonAddSharp onClick={gotoAddNewDoctor} />
          <AiFillMessage onClick={gotoMessagesPage} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
