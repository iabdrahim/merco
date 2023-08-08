import moment from "moment";
import Link from "next/link";
import React, { MouseEventHandler } from "react";
import { AiOutlineHeart, AiTwotoneDelete, AiFillHeart } from "react-icons/ai";
import { IAd, IUser } from "../../utils/interfaces";
import { deleter, updater } from "../../utils/useApi";

export default function Ad({
  data,
  hisposts,
  profile,
}: {
  data: IAd;
  hisposts?: boolean;
  profile: IUser | null;
}) {
  let handleDelete = () => {
    deleter("/api/ads", data._id);
  };
  let handleLike = (e: any) => {
    if (!profile?.saved) return;
    if (profile?.saved?.filter((a) => a == data._id).length == 0) {
      e.target.classList.add("like");
      e.target.classList.remove("liked");

      updater("/api/users/profile", {
        saved: [...profile?.saved, data._id],
      });
    } else {
      e.target.classList.add("liked");
      e.target.classList.remove("like");
      updater("/api/users/profile", {
        saved: profile?.saved.filter((el) => el != data._id),
      });
    }
  };
  return (
    <div className="card relative">
      {hisposts && (
        <div
          className="absolute right-2 p-1 bg-white rounded-full top-2"
          onClick={handleDelete}
        >
          <AiTwotoneDelete size={20} />
        </div>
      )}
      <Link href={"/ads/" + data._id}>
        <div className="image">
          <img
            src="https://content.avito.ma/classifieds/images/10102722141?t=images"
            alt=""
          />
        </div>
      </Link>
      <div className="info flex justify-between items-start relative">
        <Link href={"/ads/" + data._id} className="left w-full">
          <strong className="">{data.price} DH</strong>
          <div className="flex gap-1 flex-col w-full">
            <h5>{data.title}</h5>
            <div className="flex justify-between items-center w-full">
              <span>{data?.city}</span>
              <span>{moment(data.createdAt).fromNow()}</span>
            </div>
          </div>
        </Link>
        <div className="top-3 right-3 absolute">
          <button
            className={`hoverShadow rounded-full ${
              profile?.saved?.some((a) => a == data._id) ? "liked" : "like"
            }`}
            onClick={handleLike}
          >
            {profile?.saved?.some((a) => a == data._id) ? (
              <AiFillHeart size={24} />
            ) : (
              <AiOutlineHeart size={24} />
            )}
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
