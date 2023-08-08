import Link from "next/link";
import React from "react";
import { PiArrowArcLeft } from "react-icons/pi";
import { IChat, IUser } from "../utils/interfaces";

export default function ChatsList({
  chats,
  profile,
  setSelected,
}: {
  chats: IChat[];
  profile: IUser | null;
  setSelected: (v: number) => void;
}) {
  return (
    <aside className="">
      <h1>
        <Link href="/">
          <PiArrowArcLeft
            size={25}
            className="mr-4 hoverShadow inline-block rounded-full cursor-pointer"
          />
          Chats
        </Link>
      </h1>
      <div className="flex flex-col chats gap-4 w-full">
        {chats?.length &&
          chats?.map((chat, i) => (
            <div
              className="chat"
              key={chat?._id}
              onClick={() => setSelected(i)}
            >
              <img
                src={
                  chat?.buyer?._id == profile?._id
                    ? chat?.seller?.avatar
                    : chat?.buyer?.avatar
                }
                alt={"user avatar"}
              />
              <span>
                {chat?.buyer?._id == profile?._id
                  ? chat?.seller?.name
                  : chat?.buyer?.name}
              </span>
            </div>
          ))}
      </div>
    </aside>
  );
}
