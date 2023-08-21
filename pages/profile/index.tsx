import { useRouter } from "next/dist/client/router";
import { useState, useEffect } from "react";
import Cards from "../../components/cards";
import Container from "../../components/Container";
import Spinner from "../../components/ui/spinner";
import UserAside from "../../components/useraside";
import { useProfile, useSearch } from "../../utils/useApi";

export default function Profile() {
  const [DropDown, setDropDown] = useState(false);
  let { profile, isLoading: isLoad, error: err } = useProfile();
  const [Sort, setSort] = useState<string>("Newest");
  let { ads, isLoading, error } = useSearch(
    `?userId=${profile?._id}&sort=${Sort}`
  );
  let handleChangeSort = (e: any) => {
    let sortDec: any = {
      Oldest: "createdAt",
      Newest: "-createdAt",
      Popular: "-loved",
      Highestprice: "-price",
      Lowestprice: "price",
    };
    document
      .querySelectorAll(".sortingList > button.active")
      .forEach((el) => el.classList.remove("active"));
    let v = (e.target as HTMLElement).textContent || "";
    v = v.replaceAll(" ", "");
    v = sortDec[v];
    setSort(v);
    e.target.classList.add("active");
  };
  let r = useRouter();
  useEffect(() => {
    if (!profile && !isLoad) {
      r.push("/404");
    }
  }, [profile]);
  if (!profile || isLoad) {
    return (
      <Container className="bg-white fixed left-0 top-0 h-screen">
        <Spinner />
      </Container>
    );
  }
  return (
    <div className="search max-md:flex-col">
      <UserAside user={profile} isEditeProfile={true} />
      <div className="resultes w-full h-full">
        <div className="options px-2 w-full flex justify-between items-center gap-4">
          <div className="">
            <h1>{ads ? ads.length : "  "} Ad found</h1>
          </div>
          <div className="relative dropdown inline-block">
            <button
              onClick={() => setDropDown(!DropDown)}
              className="relative z-10 block drop"
            >
              Sort By {Sort}
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
        <Cards data={ads} isLoading={isLoading} hisposts={true} />
      </div>
    </div>
  );
}
