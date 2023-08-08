import moment from "moment";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  PiPhoneCallDuotone,
  PiDotsThreeOutlineVerticalBold,
  PiPaperPlaneTiltDuotone,
} from "react-icons/pi";
import { IChat, IUser } from "../utils/interfaces";
import { useChat, updater, deleter } from "../utils/useApi";
import { IoClose } from "react-icons/io5";
import Icon from "./icon";
import { useRouter } from "next/router";

export default function Chat({
  selectedChat,
  profile,
  chats,
}: {
  selectedChat: number;
  profile: IUser | null;
  chats: IChat[];
}) {
  let { chat, isLoading: isLoad, mutate } = useChat(chats[selectedChat]?._id);
  const [msg, setMsg] = useState("");
  const [isOption, setOption] = useState(false);

  let handleSend = (e: any) => {
    if (!chat) return;
    e.preventDefault();
    setMsg("");
    mutate({
      ...chat,
      messages: [
        ...chat.messages,
        {
          _id: Date.now(),
          content: msg,
          createdAt: Date.now(),
          userId: profile?._id,
        },
      ],
    });
    updater("/api/chats/" + chat?._id, {
      messages: [
        ...chat?.messages,
        {
          content: msg,
          userId: profile?._id,
        },
      ],
    });
  };
  let r = useRouter();
  useEffect(() => {
    r.push("/chats", undefined, { shallow: true });
    let el =
      document.querySelectorAll(".msgs > div")[
        document.querySelectorAll(".msgs > div").length - 1
      ];
    if (el) el.scrollIntoView();
  }, [chat]);
  let [phonePop, setphonePop] = useState(false);
  return (
    <div className="w-full h-full">
      <header className="flex justify-between w-full mt-4 items-center mb-2">
        <div className="user w-full flex gap-4 items-center">
          <img
            src={
              chat?.buyer?._id == profile?._id
                ? chat?.seller?.avatar
                : chat?.buyer?.avatar
            }
            alt="user avatar"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-lg">
            {chat?.buyer?._id == profile?._id
              ? chat?.seller?.name
              : chat?.buyer?.name}
          </span>
        </div>
        <div className="account min-w-fit rounded-full relative ">
          <button
            className="w-9 h-9 overflow-hidden"
            onClick={() => setOption(!isOption)}
          >
            <PiDotsThreeOutlineVerticalBold
              size={24}
              className="cursor-pointer"
            />
          </button>
          {isOption && (
            <div className="absolute z-10 right-0 top-12 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800 flex justify-start items-center flex-col">
              <button className="flex w-full items-center justify-start p-3 text-sm capitalize transition-colors transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 min-md:hidden relative">
                {phonePop && (
                  <div className="phoneCard">
                    <div
                      className="bg"
                      onClick={() => setphonePop(false)}
                    ></div>
                    <div className="card">
                      <div
                        className="absolute right-4 top-4 hoverShadow rounded-full cursor-pointer boxshadow-2"
                        onClick={() => setphonePop(false)}
                      >
                        <IoClose size={24} className="pointer-events-none" />
                      </div>
                      <div className="icon w-full flex justify-center items-center">
                        <Icon />
                      </div>
                      <h4>Attention !</h4>
                      <p>
                        You should never send money in advance to the seller by
                        bank transfer or through a money transfer agency when
                        purchasing goods available on the site.
                      </p>
                      <h5 className="flex gap-2 items-center justify-center mt-4">
                        Call Nasre Safaa:
                        <a href="tel:+212636205314">+212 636205314</a>
                      </h5>
                    </div>
                  </div>
                )}
                <PiPhoneCallDuotone size={20} />
                <span className="mx-1">call</span>
              </button>
              <button
                className="flex w-full items-center justify-start p-3 text-sm capitalize transition-colors transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 min-md:hidden"
                onClick={() => (
                  deleter("/api/chats/", chat?._id),
                  r.push("/chats", undefined, { shallow: true })
                )}
              >
                <RiDeleteBin6Line size={20} />
                <span className="mx-1">Delete Message</span>
              </button>
            </div>
          )}
        </div>
      </header>
      <main>
        <div className="msgs">
          {chat?.messages?.map((msg) => (
            <div
              key={msg._id}
              className={msg.userId == profile?._id ? "hisMsg" : ""}
            >
              <div className="msg">
                {msg.content}
                <span>{moment(msg.createdAt).format("DD MMMM, HH:MM")}</span>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend}>
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button type="submit">
            <PiPaperPlaneTiltDuotone size={21} />
          </button>
        </form>
      </main>
    </div>
  );
}
