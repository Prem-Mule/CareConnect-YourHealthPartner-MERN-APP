/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Hero = (params) => {
  return (
    // <div className="hero container">
    //   <div className="banner">
    //     <h1>{params.title}</h1>
    //     <p>
    //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, incidunt?
    //       Tempore atque culpa debitis enim maxime dolorum beatae eum laudantium
    //       fuga dolorem impedit consequuntur non dignissimos obcaecati nostrum
    //       sed, ducimus, ullam quae provident magni! Commodi, minima. Unde eius
    //       tenetur rem. fuga dolorem impedit consequuntur non dignissimos
    //       obcaecati nostrum sed, ducimus, ullam quae provident magni! Commodi,
    //       minima. Unde eius tenetur rem.
    //     </p>
    //   </div>
    //   <div className="banner">
    //     <img src={params.imageUrl} alt="hero" className="animated-image" />
    //     <span>
    //       <img src="/Vector.png" alt="" />
    //     </span>
    //   </div>
    // </div>
    <>
      <div className="herocontainer flex w-full h-full">
        <div className="leftcontainer w-1/2 h-fit p-[4vw] font-['poppins']">
          <h1 className="text-[3vw]  font-bold mt-[10vw]"> {params.title}</h1>
          <h3 className="text-[1.4vw]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
            numquam corporis dicta perferendis voluptates architecto in autem
            harum maxime, dolores quas, impedit, hic consectetur similique
            aspernatur ex. Eligendi, odio sunt?
          </h3>
        </div>
        <div className="rightcontainer w-1/2  h-fit relative flex items-center justify-center">
          <img
            src={params.imageUrl}
            alt=""
            className="absolute animated-image ml-[5vw] w-[20vw]"
          />
          <span>
            <img src="/Vector.png" alt="" className="" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
