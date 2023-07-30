import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaUserCircle, FaSortDown } from "react-icons/fa";

export default function Navlinks() {
  return (
    <div className="w-full h-full flex justify-end gap-6 items-center max-md:w-fit">
      <Link href="/ads">Browse ads</Link>
      <Link href="/sell" className="max-md:hidden">
        sell
      </Link>
      <Link
        href="/saved"
        className="saved max-md:hidden hoverShadow rounded-full"
      >
        <AiOutlineHeart />
      </Link>
      <div className="account hoverShadow rounded-full">
        <FaUserCircle size={24} />
      </div>
    </div>
  );
}
