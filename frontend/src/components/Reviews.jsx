import React from "react";
import { CgProfile } from "react-icons/cg";
import { assets } from "../assets/assets";

const Reviews = () => {
  return (
    <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 ">
      <div className="flex gap-3">
        <CgProfile className="text-base text-black" />
        <div className="text-xs text-black  ">John deo</div>
        <img src={assets.star_icon} className="w-3 5" />
        <img src={assets.star_icon} className="w-3 5" />
        <img src={assets.star_icon} className="w-3 5" />
        <img src={assets.star_icon} className="w-3 5" />
        <img src={assets.star_dull_icon} className="w-3 5" />
      </div>
      <div className="text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates fuga alias aperiam excepturi, dolore in minima aliquam suscipit expedita, voluptatum deleniti provident magni consectetur ipsam ex aut. Quae, quasi amet?
      </div>
    </div>
  );
};

export default Reviews;
