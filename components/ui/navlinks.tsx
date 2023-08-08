import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaUserCircle, FaSortDown } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { useProfile } from "../../utils/useApi";
import ALL from "../../ALL.config";
import { FiLogOut, FiPlus, FiSettings } from "react-icons/fi";
import { PiChatCircleDuotone } from "react-icons/pi";

export default function Navlinks() {
  let { profile, isLoading, error } = useProfile();
  let [isUserDrop, setDrop] = useState(false);
  return (
    <div className="w-full h-full flex justify-end gap-6 items-center max-md:w-fit relative">
      <Link href="/ads" className="max-md:hidden">
        Browse ads
      </Link>
      <Link
        href="/post"
        className="max-md:hidden hoverShadow px-4 rounded-3xl py-2"
      >
        <FiPlus size={20} /> sell
      </Link>
      <Link
        href="/saved"
        className="saved max-md:hidden hoverShadow rounded-full"
      >
        <AiOutlineHeart />
      </Link>
      {profile ? (
        <>
          {/* Dropdown toggle button */}
          <div className="account min-w-fit rounded-full relative ">
            <button
              className="w-9 h-9 overflow-hidden"
              onClick={() => setDrop(!isUserDrop)}
            >
              {profile.avatar ? (
                <img
                  src={profile?.avatar}
                  className="cursor-pointer w-full h-full rounded-full hoverShadow z-10"
                  alt="user avatar"
                />
              ) : (
                <FaUserCircle size={24} className="cursor-pointer" />
              )}
            </button>
            {isUserDrop && (
              <div className="absolute right-0 top-12 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800 flex justify-start items-center flex-col">
                <Link
                  href="/profile"
                  className="flex w-full items-center p-3 -mt-2 text-600 transition-colors duration-300:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 "
                >
                  <img
                    className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
                    src={profile?.avatar}
                    alt="user avatar"
                  />
                  <div className="mx-1">
                    <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {profile?.name}
                    </h2>
                  </div>
                </Link>

                <hr className="border-gray-200 dark:border-gray-700 " />
                <Link
                  href="/post"
                  className="flex w-full items-center justify-start p-3 text-sm capitalize transition-colors transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 min-md:hidden"
                >
                  <FiPlus size={20} />
                  <span className="mx-1">Sell</span>
                </Link>
                <Link
                  href="/saved"
                  className="flex w-full items-center justify-start p-3 text-sm capitalize transition-colors transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 min-md:hidden"
                >
                  <AiOutlineHeart size={20} />

                  <span className="mx-1">saved</span>
                </Link>
                <Link
                  href="/settings"
                  className="flex w-full items-center justify-start p-3 text-sm capitalize transition-colors transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 "
                >
                  <FiSettings size={20} />

                  <span className="mx-1">Settings</span>
                </Link>
                <hr className="border-gray-200 dark:border-gray-700 " />
                <Link
                  href="/chats"
                  className="flex w-full items-center justify-start p-3 text-sm capitalize transition-colors transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 "
                >
                  <PiChatCircleDuotone size={20} />

                  <span className="mx-1">Chats</span>
                </Link>
                <Link
                  href="/api/auth/logout"
                  className="flex w-full items-center justify-start p-3 text-sm capitalize transition-colors transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 "
                >
                  <FiLogOut size={20} />

                  <span className="mx-1">Sign Out</span>
                </Link>
              </div>
            )}
          </div>

          {/* Dropdown menu  */}
        </>
      ) : (
        <div className="account min-w-fit rounded-full relative ">
          <button
            className="w-9 h-9 overflow-hidden"
            onClick={() => setDrop(!isUserDrop)}
          >
            <FaUserCircle size={24} className="cursor-pointer" />
          </button>
          {isUserDrop && (
            <div className="absolute z-10 right-0 top-12 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800 flex justify-start items-center flex-col">
              <Link
                href="/profile"
                className="flex w-full items-center p-3 -mt-2 text-600 transition-colors duration-300:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 "
              >
                <FaUserCircle size={24} className="cursor-pointer" />

                <div className="mx-1">
                  <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    unknown
                  </h2>
                </div>
              </Link>

              <hr className="border-gray-200 dark:border-gray-700 " />
              <Link
                href="/post"
                className="flex w-full items-center justify-start p-3 text-sm capitalize transition-colors transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 min-md:hidden"
              >
                <FiPlus size={20} />

                <span className="mx-1">Sell</span>
              </Link>
              <hr className="border-gray-200 dark:border-gray-700 " />

              <Link
                href="/api/auth/login"
                className="flex w-full items-center justify-start p-3 text-sm capitalize transition-colors transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 "
              >
                <FiLogOut size={20} />

                <span className="mx-1">Login</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
