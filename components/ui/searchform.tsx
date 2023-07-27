import { useRouter } from "next/router";
import React, { useState, useContext } from "react";
import { FiSearch } from "react-icons/fi";
import { filterQueryContext } from "../../context/filter";

export default function Searchform() {
  let [isFocused, setFocus] = useState(false);
  let { filterQuery, setFilterQuery } = useContext(filterQueryContext);

  let r = useRouter();
  return (
    <div className="w-full h-full px-4 max-md:px-0">
      <form
        className={`search${isFocused ? " focused" : ""}`}
        onSubmit={(e) => (e.preventDefault(), r.push("/ads"))}
      >
        <input
          onChange={(e) =>
            setFilterQuery((prv: {}) => ({ ...prv, q: e.target.value }))
          }
          value={filterQuery.q}
          type="text"
          placeholder="Search for an Ad..."
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
        />
        <button type="submit">
          <FiSearch size={24} />
        </button>
      </form>
      <div className="list"></div>
    </div>
  );
}
