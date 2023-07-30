import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import {
  PiArmchairDuotone,
  PiBagSimpleDuotone,
  PiCarSimpleDuotone,
  PiComputerTowerDuotone,
  PiDiceFourDuotone,
  PiGameControllerDuotone,
  PiHouseLineDuotone,
  PiTShirtDuotone,
  PiFolderNotchOpenDuotone,
} from "react-icons/pi";
import { filterQueryContext } from "../../context/filter";

export default function Aside() {
  let { filterQuery, setFilterQuery } = useContext(filterQueryContext);

  let onChangeCtg = (e: any) => {
    let btn = e.target;
    document
      .querySelectorAll(".ctgs button.active")
      .forEach((el) => (el.className = ""));
    if (!btn) return;
    btn.className = "active";
    let btnText = (btn.textContent as string)?.toLowerCase().trim();
    if (btnText == "all") {
      btnText = "";
    }
    setFilterQuery((prv: {}) => ({
      ...prv,
      catagorie: btnText,
    }));
  };

  let handleChange = (e: any) => {
    if (e.target.classList.contains("checked")) {
      setFilterQuery((prv: {}) => ({
        ...prv,
        tags: filterQuery.tags.filter(
          (tg: string) => tg != e.target.parentNode.textContent
        ),
      }));
      e.target.classList.remove("checked");
    } else {
      let arr = filterQuery;
      arr.tags.push(e.target.parentNode.textContent);
      setFilterQuery((prv: {}) => ({
        ...prv,
        tags: arr.tags,
      }));
      e.target.classList.add("checked");
    }
  };
  let onCollapse = (e: any) => {
    if ((e.target.parentNode as HTMLElement).classList.contains("collapsed")) {
      (e.target.parentNode as HTMLElement).classList.remove("collapsed");
    } else {
      (e.target.parentNode as HTMLElement).classList.add("collapsed");
    }
  };
  return (
    <aside className="filters">
      <div className="w-full">
        <div className="collaps" onClick={onCollapse}>
          <h3>Ad Category</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="#2e054e"
            className="hoverShadow rounded-full"
            width="16"
            onClick={onCollapse}
            height="14"
            viewBox="0 0 14 8"
          >
            <path
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M386 48L392 54 398 48"
              transform="translate(-385 -47)"
            ></path>
          </svg>
        </div>
        <div className="ctgs w-full mx-auto relative">
          <button onClick={onChangeCtg} className="active">
            all <PiFolderNotchOpenDuotone />
          </button>
          <button onClick={onChangeCtg}>
            electonics <PiComputerTowerDuotone />
          </button>
          <button onClick={onChangeCtg}>
            jobs
            <PiBagSimpleDuotone />
          </button>
          <button onClick={onChangeCtg}>
            automobiles <PiCarSimpleDuotone />
          </button>
          <button onClick={onChangeCtg}>
            estate <PiHouseLineDuotone />
          </button>
          <button onClick={onChangeCtg}>
            fashion <PiTShirtDuotone />
          </button>
          <button onClick={onChangeCtg}>
            entertainment <PiGameControllerDuotone />
          </button>
          <button onClick={onChangeCtg}>
            lifestyle <PiArmchairDuotone />
          </button>
          <button onClick={onChangeCtg}>
            others <PiDiceFourDuotone />
          </button>
        </div>
      </div>
      <div className="price">
        <div className="collaps" onClick={onCollapse}>
          <h3>Price range</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="#2e054e"
            width="16"
            height="14"
            className="hoverShadow rounded-full"
            viewBox="0 0 14 8"
            onClick={onCollapse}
          >
            <path
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M386 48L392 54 398 48"
              transform="translate(-385 -47)"
            ></path>
          </svg>
        </div>
        <div className="ranges flex gap-2 w-full">
          <div className="flex flex-col ">
            <label htmlFor="">min</label>
            <input
              type="number"
              className="w-full h-full"
              value={filterQuery.priceRange.split("-")[0]}
              onChange={(e) =>
                setFilterQuery((prv: typeof filterQuery) => ({
                  ...prv,
                  priceRange:
                    e.target.value + "-" + filterQuery.priceRange.split("-")[1],
                }))
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">max</label>
            <input
              type="number"
              className="w-full h-full"
              value={filterQuery.priceRange.split("-")[1]}
              onChange={(e) =>
                setFilterQuery((prv: typeof filterQuery) => ({
                  ...prv,
                  priceRange:
                    filterQuery.priceRange.split("-")[0] + "-" + e.target.value,
                }))
              }
            />
          </div>
        </div>
      </div>
      <div className="tags">
        <div className="collaps" onClick={onCollapse}>
          <h3>Tags</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={onCollapse}
            stroke="#2e054e"
            width="16"
            height="14"
            className="hoverShadow rounded-full"
            viewBox="0 0 14 8"
          >
            <path
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M386 48L392 54 398 48"
              transform="translate(-385 -47)"
            ></path>
          </svg>
        </div>
        <div className="w-full h-full">
          <ul className="w-full flex justify-start items-center flex-col gap-4 tagsList">
            <li className="w-full flex justify-start items-center gap-4 hoverShadow">
              <span className="checkbox" onClick={handleChange}>
                <FaCheck size={13} />
              </span>
              cool
            </li>
            <li className="w-full flex justify-start items-center gap-4 hoverShadow">
              <span className="checkbox" onClick={handleChange}>
                <FaCheck size={13} />
              </span>
              garbage
            </li>
            <li className="w-full flex justify-start items-center gap-4 hoverShadow">
              <span className="checkbox" onClick={handleChange}>
                <FaCheck size={13} />
              </span>
              heavy
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
