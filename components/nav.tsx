import React from "react";
import CitiesPop from "./ui/citiesPop";
import Navlinks from "./ui/navlinks";
import Searchform from "./ui/searchform";
import { PiFlowerDuotone } from "react-icons/pi";
import Link from "next/link";

export default function Nav() {
  return (
    <>
      <nav className="flex justify-between h-20 items-center max-md:px-2 mx-auto gap-4 max-md:gap-2">
        <Link href="/">
          <div className="logo flex gap-2">
            <PiFlowerDuotone size={25} />
            Nerse
          </div>
        </Link>
        <CitiesPop />
        <Searchform />
        <Navlinks />
      </nav>
    </>
  );
}
