import React, { useEffect, useState } from "react";
import { FaSortDown } from "react-icons/fa";

export default function CitiesPop() {
  const [city, setcity] = useState("Rabat");

  useEffect(() => {
    let fetchCity = async () => {
      let req = await fetch(
        "https://api.bigdatacloud.net/data/reverse-geocode-client"
      );
      let data = await req.json();
      console.log(data);
      if (data?.city) {
        setcity(data.city);
      }
    };
    fetchCity();
  }, []);

  return (
    <div className="cities max-md:hidden">
      <button>
        {city}
        <FaSortDown className="-translate-y-1" />
      </button>
    </div>
  );
}
