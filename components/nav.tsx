import React from "react";
import CitiesPop from "./ui/citiesPop";
import Navlinks from "./ui/navlinks";
import Searchform from "./ui/searchform";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <>
      <nav className="flex stikey left-0 top-0 justify-between h-20 items-center max-md:px-2 mx-auto gap-4 max-md:gap-2">
        <Link href="/">
          <div className="logo flex gap-2">
            <Image
              src={"/logo.svg"}
              width={26}
              height={26}
              alt={"website logo"}
            />
            <span className="">Merco</span>
          </div>
        </Link>
        <CitiesPop />
        <Searchform />
        <Navlinks />
      </nav>
    </>
  );
}
