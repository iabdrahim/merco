import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaImage } from "react-icons/fa";
import { HiOutlinePhone } from "react-icons/hi";
import {
  IoClose,
  IoLogoFacebook,
  IoLogoTwitter,
  IoMail,
  IoSave,
} from "react-icons/io5";
import { PiPencil } from "react-icons/pi";
import ALL from "../ALL.config";
import { IUser } from "../utils/interfaces";
import { updater } from "../utils/useApi";
import Icon from "./icon";

export default function UserAside({
  user,
  isEditeProfile,
}: {
  user: IUser;
  isEditeProfile?: boolean;
}) {
  const [phonePop, setphonePop] = useState(false);
  const [dataEdite, setDataEdite] = useState<{
    name: boolean;
    avatar: boolean;
    phoneNumber: boolean;
    location: boolean;
  }>({
    name: false,
    phoneNumber: false,
    avatar: false,
    location: false,
  });
  const [nvalue, setNValue] = useState(user.name || "");
  const [lvalue, setLValue] = useState(user.location || "");
  const [pvalue, setPValue] = useState(user.phoneNumber || "");
  let r = useRouter();
  //upload a image to cloud
  let handleUpload = async (e: any) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ilmamcdn");
    let config: RequestInit = {
      method: "POST",
      body: data,
    };
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgvxswr30/image/upload",
      config
    );
    const file: { secure_url: string } = await res.json();
    e.target.value = "";
    updater("/api/users/profile", { avatar: file.secure_url });
    setDataEdite({ ...dataEdite, avatar: false });
  };
  return (
    <aside className="filters top-8">
      <div className="user px-6 flex flex-col gap-6 w-full">
        <div className="w-32 avatarChanger mx-auto rounded-full h-32 overflow-hidden relative">
          <img
            src={user?.avatar}
            alt={user.name + " avatar"}
            className="absolute left-0 rounded-full top-0 w-full h-full"
          />
          {isEditeProfile && (
            <div className="change flex justify-center items-center  w-full h-full">
              <FaImage size={20} />
              <input
                type="file"
                name=""
                onInput={handleUpload}
                className="absolute opacity-0 z-10 left-0 top-0 w-full h-full"
                id=""
              />
            </div>
          )}
        </div>
        <div className="flex gap-4 items-center editable">
          {dataEdite.name ? (
            <input
              type="text"
              value={nvalue}
              onChange={(e) => setNValue(e.target.value)}
            />
          ) : (
            <h1>{user.name}</h1>
          )}
          {isEditeProfile &&
            (dataEdite.name ? (
              <div className="flex gap-2">
                <IoSave
                  size={20}
                  onClick={() => (
                    updater("/api/users/profile", { name: nvalue }),
                    setDataEdite({ ...dataEdite, name: false })
                  )}
                />
                <IoClose
                  size={20}
                  onClick={() => setDataEdite({ ...dataEdite, name: false })}
                />
              </div>
            ) : (
              <PiPencil
                size={20}
                onClick={() => setDataEdite({ ...dataEdite, name: true })}
              />
            ))}
        </div>
        <hr />
        <div className="flex gap-4 editable items-center">
          {!dataEdite.location && <h4>location:</h4>}
          {dataEdite.location ? (
            <input
              type="text"
              value={lvalue}
              onChange={(e) => setLValue(e.target.value)}
            />
          ) : (
            <span>{user.location}</span>
          )}
          {isEditeProfile &&
            (dataEdite.location ? (
              <div className="flex gap-2 items-center">
                <IoSave
                  size={20}
                  onClick={() => (
                    updater("/api/users/profile", { location: lvalue }),
                    setDataEdite({ ...dataEdite, location: false })
                  )}
                />
                <IoClose
                  size={20}
                  onClick={() =>
                    setDataEdite({ ...dataEdite, location: false })
                  }
                />
              </div>
            ) : (
              <PiPencil
                size={20}
                onClick={() => setDataEdite({ ...dataEdite, location: true })}
              />
            ))}
        </div>
        <div className="flex gap-4 editable items-center">
          {!dataEdite.phoneNumber && <h4>phoneNumber:</h4>}
          {dataEdite.phoneNumber ? (
            <input
              type="text"
              value={pvalue}
              onChange={(e) => setPValue(e.target.value)}
            />
          ) : (
            <span>{user.phoneNumber}</span>
          )}
          {isEditeProfile &&
            (dataEdite.phoneNumber ? (
              <div className="flex gap-2 items-center">
                <IoSave
                  size={20}
                  onClick={() => (
                    updater("/api/users/profile", { phoneNumber: pvalue }),
                    setDataEdite({ ...dataEdite, phoneNumber: false })
                  )}
                />
                <IoClose
                  size={20}
                  onClick={() =>
                    setDataEdite({ ...dataEdite, phoneNumber: false })
                  }
                />
              </div>
            ) : (
              <PiPencil
                size={20}
                onClick={() =>
                  setDataEdite({ ...dataEdite, phoneNumber: true })
                }
              />
            ))}
        </div>
        <div className="flex gap-4">
          <h4>Member since:</h4>
          <span>{moment(user.createdAt).format("MMM YYYY")}</span>
        </div>
        <hr />
        <div className="userActions flex justify-start items-center">
          <button onClick={() => setphonePop(true)}>
            <HiOutlinePhone size={20} />
          </button>
          <button>
            <BiSolidMessageSquareDetail size={20} />
            Contact
          </button>
          {phonePop && (
            <div className="phoneCard fixed">
              <div className="bg" onClick={() => setphonePop(false)}></div>
              <div className="card">
                <div
                  className="absolute right-4 top-4 hoverShadow rounded-full cursor-pointer boxshadow-2"
                  onClick={() => setphonePop(false)}
                >
                  <IoClose size={20} className="pointer-events-none" />
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
                  Call Nasre ${user.name}:
                  <a href={"tel:+212" + user.phoneNumber}>
                    +212 ${user.phoneNumber}
                  </a>
                </h5>
              </div>
            </div>
          )}
        </div>
        <hr />
        <div className="flex flex-wrap gap-4 items-center">
          <h3 className="text-xl">share this profile:</h3>
          <div className="socail flex gap-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${ALL.link}/profile/${user._id}?utm_source=facebook_share&utm_medium=social-sharing`}
            >
              <IoLogoTwitter size={20} />
            </a>
            <a
              href={`http://twitter.com/share?url=${ALL.link}/profile/${user._id}?utm_source=twitter_share&utm_medium=social-sharing&text=Checkout%20this%20cool%20preowned%20ad%20on%20Spinny!`}
            >
              <IoLogoFacebook size={20} />
            </a>
            <a
              href={`mailto:?subject=Awesome Spinny Car&body=Hey I found this cool ad at ${ALL.title} go checkout the link at ${ALL.link}/profile/${user._id}?utm_source=mail_share&utm_medium=social-sharing`}
            >
              <IoMail size={20} />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
