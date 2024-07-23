import React, { useState } from "react";
import axios, { Axios } from "axios";
import { toast } from "react-toastify";
const MessageForm = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Form submitted:", formValues);
    try {
      await axios
        .post("http://localhost:4000/api/sendmsg", formValues, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((resp) => {
          console.log("data response", resp.data);
          setFormValues({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
          });
          toast.success(resp.data.message);
        })
        .catch((err) => {
          console.log("error", err);
          toast.error(err);
        });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-4xl"
      >
        
        <h2 className="text-[2vw] font-['poppins'] text-center mb-[3vw] text-zinc-800">Send us a Message</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-600">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="mb-2 font-semibold">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="mb-2 font-semibold">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-2 font-semibold">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="md:col-span-2 flex flex-col">
            <label htmlFor="message" className="mb-2 font-semibold">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formValues.message}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
