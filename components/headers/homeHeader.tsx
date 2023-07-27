import Link from "next/link";
import React, { useContext, useState } from "react";
import { filterQueryContext } from "../../context/filter";
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

export default function Header() {
  const [Buy, setBuy] = useState(true);
  let { setFilterQuery } = useContext(filterQueryContext);

  return (
    <>
      <div className="ctgs flex justify-start h-10 items-center max-md:px-4 mx-auto gap-4">
        <h4>Catagories</h4>
        {catagories.map((ctg: string, i: number) => (
          <Link href={"/search?catagorie=" + ctg} key={i}>
            {ctg}
          </Link>
        ))}
      </div>
      <div className="carousel">
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
      </div>
    </>
  );
}
