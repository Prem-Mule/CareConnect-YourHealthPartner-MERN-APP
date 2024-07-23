// import axios from "axios";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import { toast } from "react-toastify";

// const AppointmentForm = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [nic, setNic] = useState("");
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");
//   const [appointmentDate, setAppointmentDate] = useState("");
//   const [doctorDept, setDoctorDept] = useState("");
//   const [doctorFirstName, setDoctorFirstName] = useState("");
//   const [doctorLastName, setDoctorLastName] = useState("");
//   const [address, setAddress] = useState("");
//   const [hasVisited, setHasVisited] = useState(false);

//   const departmentsArray = [
//     "Pediatrics",
//     "Orthopedics",
//     "Cardiology",
//     "Neurology",
//     "Oncology",
//     "Radiology",
//     "Physical Therapy",
//     "Dermatology",
//     "ENTC",
//   ];

//   const [doctors, setDoctors] = useState([]);
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       const { data } = await axios.get(
//         "http://localhost:4000/register/v1/doctors",
//         { withCredentials: true }
//       );
//       setDoctors(data.doctors);
//       console.log(data.doctors);
//     };
//     fetchDoctors();
//   }, []);
//   const handleAppointment = async (e) => {
//     e.preventDefault();
//     try {
//       const hasVisitedBool = Boolean(hasVisited);
//       const { data } = await axios.post(
//         "http://localhost:4000/api/v1/appointment/post",
//         {
//           firstName,
//           lastName,
//           email,
//           phone,
//           nic,
//           dob,
//           gender,
//           appointmentDate: appointmentDate,
//           department: doctorDept,
//           doctorFirstName: doctorFirstName,
//           doctorLastName: doctorLastName,
//           hasVisited: hasVisitedBool,
//           address,
//         },
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       toast.success(data.message);
//       setFirstName(""),
//         setLastName(""),
//         setEmail(""),
//         setPhone(""),
//         setNic(""),
//         setDob(""),
//         setGender(""),
//         setAppointmentDate(""),
//         setDoctorDept(""),
//         setDoctorFirstName(""),
//         setDoctorLastName(""),
//         setHasVisited(""),
//         setAddress("");
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <>
//       <div className="container form-component appointment-form">
//         <h2>Appointment</h2>
//         <form onSubmit={handleAppointment}>
//           <div>
//             <input
//               type="text"
//               placeholder="First Name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Last Name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Mobile Number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>
//           <div>
//             <input
//               type="number"
//               placeholder="NIC"
//               value={nic}
//               onChange={(e) => setNic(e.target.value)}
//             />
//             <input
//               type="date"
//               placeholder="Date of Birth"
//               value={dob}
//               onChange={(e) => setDob(e.target.value)}
//             />
//           </div>
//           <div>
//             <select value={gender} onChange={(e) => setGender(e.target.value)}>
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select>
//             <input
//               type="date"
//               placeholder="Appointment Date"
//               value={appointmentDate}
//               onChange={(e) => setAppointmentDate(e.target.value)}
//             />
//           </div>
//           <div>
//             <select
//               value={doctorDept}
//               onChange={(e) => {
//                 setDoctorDept(e.target.value);
//                 setDoctorFirstName("");
//                 setDoctorLastName("");
//               }}
//             >
//               {departmentsArray.map((depart, index) => {
//                 return (
//                   <option value={depart} key={index}>
//                     {depart}
//                   </option>
//                 );
//               })}
//             </select>
//             <select
//               value={`${doctorFirstName} ${doctorLastName}`}
//               onChange={(e) => {
//                 const [firstName, lastName] = e.target.value.split(" ");
//                 setDoctorFirstName(firstName);
//                 setDoctorLastName(lastName);
//               }}
//               disabled={!doctorDept}
//             >
//               <option value="">Select Doctor</option>
//               {doctors
//                 .filter((doctor) => doctor.doctorDept === doctorDept)
//                 .map((doctor, index) => (
//                   <option
//                     value={`${doctor.firstName} ${doctor.lastName}`}
//                     key={index}
//                   >
//                     {doctor.firstName} {doctor.lastName}
//                   </option>
//                 ))}
//             </select>
//           </div>
//           <textarea
//             rows="10"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             placeholder="Address"
//           />
//           <div
//             style={{
//               gap: "10px",
//               justifyContent: "flex-end",
//               flexDirection: "row",
//             }}
//           >
//             <p style={{ marginBottom: 0 }}>Have you visited before?</p>
//             <input
//               type="checkbox"
//               checked={hasVisited}
//               onChange={(e) => setHasVisited(e.target.checked)}
//               style={{ flex: "none", width: "25px" }}
//             />
//           </div>
//           <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AppointmentForm;
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [doctorDept, setDoctorDept] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENTC",
  ];

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/register/v1/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
      console.log(data.doctors);
    };
    fetchDoctors();
  }, []);
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointmentDate,
          department: doctorDept,
          doctorFirstName,
          doctorLastName,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setNic(""),
        setDob(""),
        setGender(""),
        setAppointmentDate(""),
        setDoctorDept(""),
        setDoctorFirstName(""),
        setDoctorLastName(""),
        setHasVisited(""),
        setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Appointment
      </h2>
      <form onSubmit={handleAppointment} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="NIC"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            className="input-field"
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="input-field"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="date"
            placeholder="Appointment Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={doctorDept}
            onChange={(e) => {
              setDoctorDept(e.target.value);
              setDoctorFirstName("");
              setDoctorLastName("");
            }}
            className="input-field"
          >
            <option value="">Select Department</option>
            {departmentsArray.map((depart, index) => (
              <option value={depart} key={index}>
                {depart}
              </option>
            ))}
          </select>
          <select
            value={`${doctorFirstName} ${doctorLastName}`}
            onChange={(e) => {
              const [firstName, lastName] = e.target.value.split(" ");
              setDoctorFirstName(firstName);
              setDoctorLastName(lastName);
            }}
            disabled={!doctorDept}
            className="input-field"
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter((doctor) => doctor.doctorDept === doctorDept)
              .map((doctor, index) => (
                <option
                  value={`${doctor.firstName} ${doctor.lastName}`}
                  key={index}
                >
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
          </select>
        </div>
        <textarea
          rows="4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="input-field"
        />
        <div className="flex items-center space-x-4">
          <p className="text-gray-600">Have you visited before?</p>
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
            className="transform scale-125"
          />
        </div>
        <button className="btn-submit">GET APPOINTMENT</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
