/* eslint-disable no-unused-vars */
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const Departments = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <div className="departments ">
        <h2 className="font-['poppinsM'] text-[2.5vw] px-[2.3vw]">
          Departments
        </h2>
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          showDots={true}
          infinite={true}
          className="h-[30vw]"
        >
          {departmentsArray.map((depart, index) => {
            return (
              <div
                className="depts relative border-[2px]  flex items-center justify-center cursor-"
                key={index}
              >
                <h3 className="absolute bg-white px-[1.8vw] py-[0.5vw] text-[1.5vw] rounded-[2vw] font-['poppins'] bottom-[20%]">
                  {depart.name}
                </h3>
                <img
                  src={depart.imageUrl}
                  alt={depart.name}
                  className="w-[30vw] h-[20vw] object-cover rounded-3xl"
                />
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Departments;
