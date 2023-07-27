import moment from "moment";
import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { IAd } from "../utils/interfaces";

export default function Ad({ data }: { data: IAd }) {
  return (
    <div className="card">
      <Link href={"/ads/" + data._id}>
        <div className="image">
          <img
            src="https://content.avito.ma/classifieds/images/10102722141?t=images"
            alt=""
          />
        </div>
      </Link>
      <div className="info flex justify-between items-start">
        <Link href={"/ads/" + data._id} className="left">
          <h5>{data.title}</h5>
          <strong>
            {data.price} DH <span>{moment(data.createdAt).fromNow()}</span>
          </strong>
        </Link>
        <div className="right pr-4 pt-2">
          <button className="hoverShadow rounded-full">
            <AiOutlineHeart size={24} />
          </button>
        </div>
      </div>
      {/* <div className="w-full border-t border-gray-200 gap-2 flex items-center text-gray-400 pl-2">
        <TiLocationOutline />
        Dar bidda drb rlaf
      </div> */}
    </div>
  );
}
