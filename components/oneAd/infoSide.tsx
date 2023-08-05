import { useState } from "react";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { HiOutlinePhone } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { IAd } from "../../utils/interfaces";
import Icon from "../icon";
import moment from "moment";
export default function InfoSide({ ad }: { ad: IAd }) {
  const [phonePop, setphonePop] = useState(false);

  return (
    <section className="infoSide sticky max-md:static justify-start items-start flex-col gap-4">
      <h1 dir="auto">{ad.title}</h1>
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
        <div className="user">
          <div className="avatar">
            <img
              src="https://content.avito.ma/classifieds/images/10102722141?t=images"
              alt=""
            />
          </div>
          <h4>Developer I am </h4>
        </div>
        <div className="userActions flex justify-start items-center">
          <button onClick={() => setphonePop(true)}>
            <HiOutlinePhone size={20} />
          </button>
          <button>
            <BiSolidMessageSquareDetail size={20} />
            Contact
          </button>
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
                  Call Nasre Safaa:
                  <a href="tel:+212636205314">+212 636205314</a>
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
