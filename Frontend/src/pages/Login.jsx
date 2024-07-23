// /* eslint-disable no-unused-vars */
// import React, { useContext, useState } from "react";
// import { usercontext } from "../helper/Context";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Login = () => {
//   const { isAuthenticated, setisAuthenticated } = useContext(usercontext);
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [confirmPassword, setconfirmPassword] = useState("");
//   const navigateTo = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (isAuthenticated) {
//       return <Navigate to={"/"} />;
//     }
//     const formValues = {
//       email: email,
//       password: password,
//       confirmpassword: confirmPassword,
//       role: "Patient",
//     };
//     const resp = await axios
//       .post("http://localhost:4000/register/v1/loginuser", formValues, {
//         withCredentials: true,
//         headers: { "Content-Type": "application/json" },
//       })
//       .then((response) => {
//         console.log("response", response.data);
//         setemail("");
//         setpassword("");
//         setconfirmPassword("");
//         toast.success(response.data.message);
//       })
//       .catch((error) => {
//         console.log("error", error);
//         toast.error(error.message);
//       });
//   };

//   return (
//     <>
//       <div className="max-w-[90vw] w-[40vw] my-[5vh] mx-auto p-[5vh] bg-gray-100 rounded-lg shadow-md text-center">
//         <h2 className="text-[2vw] mb-[1vw] text-cyan-600 font-['poppins']">
//           Sign In
//         </h2>
//         <p className="text-[1.5vw] mb-[1vw]">Please Login to Continue</p>
//         <p className="text-[1vw] mb-[1vw]">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
//           animi eligendi ut ipsam.
//         </p>
//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => {
//               setemail(e.target.value);
//             }}
//             placeholder="Email"
//             className="w-[80%] p-[0.7vw] my-[1vw] text-[1.2vw] border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => {
//               setpassword(e.target.value);
//             }}
//             placeholder="Password"
//             className="w-[80%] p-[0.7vw] my-[1vw] text-[1.2vw] border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
//           />
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => {
//               setconfirmPassword(e.target.value);
//             }}
//             placeholder="Confirm Password"
//             className="w-[80%] p-[0.7vw] my-[1vw] text-[1.2vw] border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
//           />
//           <div className="mt-[2vw]">
//             <p className="text-[1.2vw] mb-[0.5vw]">Not Registered?</p>
//             <Link
//               to={"/register"}
//               className="text-blue-500 text-[1.5vw] hover:underline font-['poppinsM']"
//             >
//               Register Now
//             </Link>
//           </div>
//           <div className="flex justify-center mt-6">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-[2vw] py-[1vw] text-[1.2vw]  rounded hover:bg-blue-600"
//             >
//               Send
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Login;
import React, { useContext, useState } from "react";
import { usercontext } from "../helper/Context";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(usercontext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      return <Navigate to={"/"} />;
    }
    const formValues = {
      email,
      password,
      confirmpassword: confirmPassword,
      role: "Patient",
    };
    try {
      const response = await axios.post("http://localhost:4000/register/v1/loginuser", formValues, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      console.log("response", response.data);
      setemail("");
      setpassword("");
      setconfirmPassword("");
      setIsAuthenticated(true);
      setUser(response.data.user);
      toast.success(response.data.message);
      navigateTo("/");
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-[90vw] w-[40vw] my-[5vh] mx-auto p-[5vh] bg-gray-100 rounded-lg shadow-md text-center">
      <h2 className="text-[2vw] mb-[1vw] text-cyan-600 font-['poppins']">Sign In</h2>
      <p className="text-[1.5vw] mb-[1vw]">Please Login to Continue</p>
      <p className="text-[1vw] mb-[1vw]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus animi eligendi ut ipsam.
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Email"
          className="w-[80%] p-[0.7vw] my-[1vw] text-[1.2vw] border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
          className="w-[80%] p-[0.7vw] my-[1vw] text-[1.2vw] border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-[80%] p-[0.7vw] my-[1vw] text-[1.2vw] border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button type="submit" className="btn w-[80%] mt-[1vw] p-[0.7vw] text-[1.2vw] bg-cyan-600 text-white rounded">
          Sign In
        </button>
        <Link
          to={"/register"}
          className="block mt-[1vw] text-[1vw] text-cyan-600 underline hover:text-cyan-800 transition duration-300"
        >
          Don't have an account? Register here
        </Link>
      </form>
    </div>
  );
};

export default Login;
