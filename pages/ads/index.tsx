import React, { useState, useContext } from "react";
import Cards from "../../components/cards";
import Aside from "../../components/ui/aside";
import { filterQueryContext } from "../../context/filter";
import { useSearch } from "../../utils/useApi";

export default function Ads() {
  const [DropDown, setDropDown] = useState(false);

  let stringQuery = (obj: any): string => {
    let str = "";
    let sortDec: any = {
      Oldest: "createdAt",
      Newest: "-createdAt",
      Popular: "-loved",
      Highestprice: "price",
      Lowestprice: "-price",
    };
    let obs = Object.entries(obj);
    for (let i: number = 0; i < obs.length; i++) {
      let k = obs[i][0];
      let v = obs[i][1] as string;
      if (v) {
        if (k == "sort") {
          v = v.replaceAll(" ", "");
          v = sortDec[v];
        }
        str += `${k}=${Array.isArray(v) ? v.join(",") : v}|`;
      }
    }
    let arr = str.split("|");
    arr = arr.filter((el) => el != "");

    return "?" + arr.join("&");
  };
  let { filterQuery, setFilterQuery } = useContext(filterQueryContext);
  let { ads, isLoading, error } = useSearch(stringQuery(filterQuery));
  let handleChangeSort = (e: any) => {
    document
      .querySelectorAll(".sortingList > button.active")
      .forEach((el) => el.classList.remove("active"));
    setFilterQuery((prv: {}) => ({
      ...prv,
      sort: (e.target as HTMLElement).textContent,
    }));
    e.target.classList.add("active");
  };

  return (
    <div className="search max-md:flex-col">
      <Aside />
      <div className="resultes w-full h-full">
        <div className="options px-2 w-full flex justify-between items-start max-md:flex-col gap-4">
          <h1>{ads ? ads.length : "  "} Ad found</h1>
          <div className="relative dropdown inline-block">
            <button
              onClick={() => setDropDown(!DropDown)}
              className="relative z-10 block drop"
            >
              Sort By {filterQuery.sort || "newest"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                stroke="#2e054e"
                width="16"
                height="14"
                viewBox="0 0 14 8"
                className={`hoverShadow rounded-full ${
                  DropDown ? "rotate-180" : "rotate-0"
                }`}
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
            </button>

            <div
              className={`absolute right-0 max-md:-right-12 z-20 w-48 py-2 origin-top-right max-md:origin-top-left bg-white rounded-md shadow-xl dark:bg-gray-800 sortingList ${
                DropDown ? "block" : "hidden"
              }`}
            >
              <button
                className="block px-4 py-3 text-sm capitalize transition-colors duration-300 transform "
                onClick={handleChangeSort}
              >
                Populare
              </button>
              <button
                className="block px-4 py-3 text-sm capitalize transition-colors duration-300 transform active"
                onClick={handleChangeSort}
              >
                Newest
              </button>

              <button
                className="block px-4 py-3 text-sm capitalize transition-colors duration-300 transform"
                onClick={handleChangeSort}
              >
                Oldest
              </button>

              <button
                className="block px-4 py-3 text-sm capitalize transition-colors duration-300 transform "
                onClick={handleChangeSort}
              >
                Highest price
              </button>

              <button
                className="block px-4 py-3 text-sm capitalize transition-colors duration-300 transform "
                onClick={handleChangeSort}
              >
                Lowest price
              </button>
            </div>
          </div>
        </div>
        <Cards data={ads} isLoading={isLoading} />
      </div>
    </div>
  );
}
