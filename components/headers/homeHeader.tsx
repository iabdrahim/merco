import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { filterQueryContext } from "../../context/filter";
import Cards from "../cards";
import { useAds } from "../../utils/useApi";
import Container from "../Container";
import { IAd } from "../../utils/interfaces";
let catagories = [
  "automobiles",
  "electronics",
  "fashion",
  "others",
  "jobs",
  "estate",
  "entertainment",
  "lifestyle",
];

export default function Header() {
  let { setFilterQuery } = useContext(filterQueryContext);
  const [limit, setlimit] = useState(24);
  const [Ads, setAds] = useState<IAd[] | null>(null);
  let { ads, isLoading, error } = useAds("limit=" + limit);
  useEffect(() => {
    if (ads) {
      setAds(ads);
    }
  }, [ads]);
  return (
    <>
      {/* <div className="carousel">
        <div className="slide">
          <div className="innerShadow"></div>
          <div className="text">
            <h1>SELL AND BUY NEAR YOU</h1>
          </div>
          <img
            src="https://spn-sta.spinny.com/spinny-web/static-images/assets/images/pages/HomePage/components/TopBanner/assets/desktop_finance_v2.jpg?w=1500"
            alt=""
          />
        </div>
      </div>
      <div className="bigCard max-w-7xl m-auto">
        <div className="tabs flex items-center justify-center">
          <div
            className={`tab w-full h-full${Buy ? " active" : ""}`}
            onClick={() => setBuy(true)}
          >
            Buy
          </div>
          <div
            onClick={() => setBuy(false)}
            className={`tab w-full h-full${!Buy ? " active" : ""}`}
          >
            Sell
          </div>
        </div>
        <main>
          <Link
            href="/ads"
            onClick={() =>
              setFilterQuery({
                q: "",
                city: "",
                catagorie: "",
                tags: [],
                priceRange: "0-0",
                sort: "",
                limit: 10,
              })
            }
          >
            <button className="bigBtn">Browse Ads</button>
          </Link>
        </main>
      </div> */}
      <Container>
        <div className="catagories flex justify-start h-10 items-center max-md:px-4 mx-auto gap-4">
          <h4>Catagories</h4>
          {catagories.map((ctg: string, i: number) => (
            <Link
              href={"/search"}
              onClick={() =>
                setFilterQuery((prv: {}) => ({ ...prv, catagorie: ctg }))
              }
              key={i}
            >
              {ctg}
            </Link>
          ))}
        </div>
        <section>
          <h3 className="noline">Frech Recomndation</h3>
          <Cards data={Ads} isLoading={isLoading} />
          <div
            className={`w-full flex justify-center items-center ${
              isLoading ? "opacity-10 pointer-events-none" : ""
            }`}
          >
            <button className="loadMore" onClick={() => setlimit(limit + 12)}>
              Loead More
            </button>
          </div>
        </section>
      </Container>
    </>
  );
}
