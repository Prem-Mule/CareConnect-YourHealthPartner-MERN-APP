import React from "react";

const Biography = (params) => {
  return (
    <>
      <div className="herocontainer flex w-screen h-screen">
        <div className="leftcontainer w-1/2 p-[4vw] ">
          <img
            src={params.imageUrl}
            alt=""
            className="absolute  ml-[5vw] w-[40vw] mt-[5vw]"
          />
        </div>
        <div className="rightcontainer w-1/2 relative py-[8vw] px-[4vw] ">
          <h2 className="text-[1.6vw] font-['poppinsL']">Biography</h2>
          <h1 className="font-bold text-[2.3vw] font-['poppins']">
            Who We Are
          </h1>
          <p className="text-justify text-[1.2vw] mt-[1vw]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque quo
            magnam numquam repellendus rem accusamus blanditiis odio explicabo
            iste asperiores nisi voluptates aliquid totam tempore, assumenda
            vero nobis facere voluptatum recusandae quisquam. Eos, eligendi
            officia <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing. <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident
            culpa totam quidem sed perspiciatis quibusdam ullam eveniet facere
            eum voluptatibus. Earum rerum adipisci commodi hic amet maxime
            architecto fuga corruption <br /> Lorem ipsum dolor sit amet
            consectetur adipisicing elit. <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing
          </p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </>
  );
};

export default Biography;
