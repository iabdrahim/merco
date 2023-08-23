import { useState } from "react";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { HiOutlinePhone } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { IAd, IUser } from "../../utils/interfaces";
import Icon from "../icon";
import moment from "moment";
import { poster, updater } from "../../utils/useApi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
export default function InfoSide({
  ad,
  profile,
}: {
  ad: IAd;
  profile: IUser | null;
}) {
  const [phonePop, setphonePop] = useState(false);
  const [msgPop, setMsgPop] = useState(false);
  const [msg, setMsg] = useState("");
  let handleLike = (e: any) => {
    if (profile?.saved?.filter((a) => a == ad._id).length == 0) {
      e.target.classList.add("like");
      e.target.classList.remove("liked");

      updater("/api/users/profile", {
        saved: [...profile?.saved, ad._id],
      });
    } else {
      e.target.classList.add("liked");
      e.target.classList.remove("like");
      updater("/api/users/profile", {
        saved: profile?.saved.filter((el) => el != ad._id),
      });
    }
  };
  return (
    <section className="infoSide sticky max-md:static justify-start items-start flex-col gap-4">
      <h1 dir="auto">{ad.title}</h1>
      <div className="top-4 right-4 absolute">
        <button
          className={`hoverShadow rounded-full ${
            profile?.saved.some((a) => a == ad._id) ? "liked" : "like"
          }`}
          onClick={handleLike}
        >
          {profile?.saved.some((a) => a == ad._id) ? (
            <AiFillHeart size={26} />
          ) : (
            <AiOutlineHeart size={26} />
          )}
        </button>
      </div>
      <div className="flex gap-4 items-center">
        <h4>city:</h4>
        <p>{ad.city}</p>
      </div>
      <div className="flex gap-4 items-center">
        <h4>time:</h4>
        <p>{moment(ad.createdAt).fromNow()}</p>
      </div>
      <h3>
        {ad.price}
        <span>DH</span>
      </h3>
      <div className="flex justify-between w-full items-center flex-wrap gap-2">
        <Link href={"/profile/" + ad?.author._id}>
          <div className="user">
            <div className="avatar">
              <img src={ad?.author?.avatar || "/user.png"} alt={ad.title} />
            </div>
            <h4>{ad?.author?.name || "unknown"}</h4>
          </div>
        </Link>
        <div className="userActions flex justify-start items-center">
          <button onClick={() => setphonePop(true)}>
            <HiOutlinePhone size={20} />
          </button>
          <button onClick={() => setMsgPop(true)}>
            <BiSolidMessageSquareDetail size={20} />
            Contact
          </button>
          {msgPop && (
            <div className="contactCard">
              <div className="bg" onClick={() => setMsgPop(false)}></div>
              <div className="card">
                <div
                  className="absolute right-4 top-4 hoverShadow rounded-full cursor-pointer boxshadow-2"
                  onClick={() => setMsgPop(false)}
                >
                  <IoClose size={24} className="pointer-events-none" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <h3>Contact {ad?.author?.name}:</h3>
                  <textarea
                    name=""
                    id=""
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="mt-2 block w-full placeholder-gray-400/70 rounded-lg border-2 border-gray-300 bg-white px-4 py-2.5 text-gray-700 focus:border-black focus:outline-none"
                  ></textarea>
                </div>
                <button
                  className="post"
                  onClick={() => (
                    poster("/api/chats", {
                      seller: ad.author?._id,
                      messages: [
                        {
                          content: msg,
                          createdAt: Date.now(),
                          userId: profile?._id,
                        },
                      ],
                    }),
                    setMsgPop(false)
                  )}
                >
                  Send Message !
                </button>
              </div>
            </div>
          )}
          {phonePop && (
            <div className="phoneCard">
              <div className="bg" onClick={() => setphonePop(false)}></div>
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
                  You should never send money in advance to the seller by bank
                  transfer or through a money transfer agency when purchasing
                  goods available on the site.
                </p>
                <h5 className="flex gap-2 items-center justify-center mt-4">
                  Call {ad?.author?.name}:
                  <a href={"tel:" + ad?.author?.phoneNumber}>
                    {ad?.author?.phoneNumber}
                  </a>
                </h5>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <div className="share flex gap-4 items-center">
          <h4>share with a friend</h4>
        </div> */}
    </section>
  );
}
