import { motion } from "framer-motion";
import Link from "next/link";
import React, { useContext, useState } from "react";
import {
  PiCarSimpleDuotone,
  PiComputerTowerDuotone,
  PiHouseLineDuotone,
  PiBagSimpleDuotone,
  PiTShirtDuotone,
  PiGameControllerDuotone,
  PiArmchairDuotone,
  PiDiceFourDuotone,
} from "react-icons/pi";
import { filterQueryContext } from "../../context/filter";
import { useSearch } from "../../utils/useApi";
import Cards from "../cards";

let catagories = [
  "automobiles",
  "electronics",
  "fashion",
  "others",
  "jobs",
  "real estate",
  "entertainment",
  "Home & Lifestyle",
];

export default function Catagories() {
  const [X, setX] = useState<number>(0);
  const [ctg, setctg] = useState("electonics");
  let { ads, isLoading, error } = useSearch("?catagorie=" + ctg + "&limit=12");
  let { setFilterQuery } = useContext(filterQueryContext);
  let onChangeCtg = (e: any) => {
    let btn: HTMLButtonElement = e.target;
    let trak: any = document.querySelector(".traker");
    let min = 120;
    setX(
      min * Number(btn.getAttribute("id")) +
        Number(btn.getAttribute("id")) * 8 +
        6
    );
    trak.style.width = btn.clientWidth + "px";
    document
      .querySelectorAll(".ctgs button.active")
      .forEach((el) => (el.className = ""));
    btn.className = "active";
    setctg(btn.textContent?.trim().toLowerCase() || "");
    // .style.transform = "tra";
  };
  return (
    <section className="w-full max-md:px-2">
      <h3 className="subHeading">Explore By catagories</h3>
      <div className="ctgs w-fit mx-auto relative">
        <div
          className="traker"
          style={{ transform: `translate(${X}px)` }}
        ></div>
        <button id="0" onClick={onChangeCtg} className="active">
          electonics <PiComputerTowerDuotone />
        </button>
        <button id="1" onClick={onChangeCtg}>
          automobiles <PiCarSimpleDuotone />
        </button>
        <button id="2" onClick={onChangeCtg}>
          estate <PiHouseLineDuotone />
        </button>
        <button id="3" onClick={onChangeCtg}>
          jobs <PiBagSimpleDuotone />
        </button>
        <button id="4" onClick={onChangeCtg}>
          fashion <PiTShirtDuotone />
        </button>
        <button id="5" onClick={onChangeCtg}>
          entertainment <PiGameControllerDuotone />
        </button>
        <button id="6" onClick={onChangeCtg}>
          lifestyle <PiArmchairDuotone />
        </button>
        <button id="7" onClick={onChangeCtg}>
          others <PiDiceFourDuotone />
        </button>
      </div>
      <Cards data={ads} isLoading={isLoading} className="max-w-7xl mx-auto" />
      <Link
        href={"/ads"}
        onClick={() =>
          setFilterQuery({
            q: "",
            city: "",
            catagorie: ctg,
            tags: [],
            priceRange: "0-0",
            sort: "",
            limit: 10,
          })
        }
      >
        <button className="bigBtn outlined purple">Browse More</button>
      </Link>
    </section>
  );
}
