import Link from "next/link";
import React, { useContext, useState } from "react";
import { filterQueryContext } from "../../context/filter";
import { useSearch } from "../../utils/useApi";
import Ad from "../ad";
import Cards from "../cards";

export default function Featured() {
  const [New, setNew] = useState(true);
  let { ads, isLoading, error } = useSearch(
    `?sort=${New ? "-createdAt" : "createdAt"}&limit=12`
  );
  let { setFilterQuery } = useContext(filterQueryContext);
  return (
    <section className="w-full">
      <h3 className="subHeading">Featured Spinny Cars </h3>
      <div className="tabs w-full">
        <span className={New ? "active" : ""} onClick={() => setNew(true)}>
          Newest
        </span>
        <span className={!New ? "active" : ""} onClick={() => setNew(false)}>
          Best for you
        </span>
      </div>
      <Cards data={ads} isLoading={isLoading} className="max-w-7xl mx-auto" />
      <Link
        className="w-full h-full block"
        href="/ads"
        onClick={() =>
          setFilterQuery({
            q: "",
            city: "",
            catagorie: "",
            tags: [],
            priceRange: "0-0",
            sort: New ? "Newest" : "Oldest",
            limit: 10,
          })
        }
      >
        <button className="bigBtn outlined purple">Browse More</button>
      </Link>
    </section>
  );
}
