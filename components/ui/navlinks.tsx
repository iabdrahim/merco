import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaUserCircle, FaSortDown } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { useProfile } from "../../utils/useApi";
import ALL from "../../ALL.config";

export default function Navlinks() {
  let { profile, isLoading, error } = useProfile();
  return (
    <div className="w-full h-full flex justify-end gap-6 items-center max-md:w-fit">
      <Link href="/ads">Browse ads</Link>
      <Link
        href="/post"
        className="max-md:hidden hoverShadow px-4 rounded-3xl py-2"
      >
        <IoAdd /> sell
      </Link>
      <Link
        href="/saved"
        className="saved max-md:hidden hoverShadow rounded-full"
      >
        <AiOutlineHeart />
      </Link>
      {profile ? (
        <>
          <div className="account hoverShadow rounded-full">
            <FaUserCircle size={24} />
            {profile?.name}
          </div>
          <a href={ALL.ApiEndPoint + "/logout"}>logout</a>
        </>
      ) : (
        <a href={ALL.ApiEndPoint + "/login"}>login</a>
      )}
    </div>
  );
}
