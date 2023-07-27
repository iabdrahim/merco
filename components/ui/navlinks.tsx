import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaUserCircle, FaSortDown } from "react-icons/fa";

export default function Navlinks() {
  return (
    <div className="w-full h-full flex justify-end gap-4 items-center max-md:w-fit">
      <div className="dropDown">
        <h4 className="max-md:hidden">
          Buy an ad
          <FaSortDown className="-translate-y-1" />
        </h4>
        <ul className="list hidden">
          <li>agadir</li>
          <li>ifrane</li>
        </ul>
      </div>
      <a href="/sell" className="max-md:hidden">
        sell
      </a>
      <a href="/saved" className="saved max-md:hidden hoverShadow rounded-full">
        <AiOutlineHeart />
      </a>
      <div className="account hoverShadow rounded-full">
        <FaUserCircle size={24} />
      </div>
    </div>
  );
}
