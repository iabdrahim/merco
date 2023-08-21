import Link from "next/link";
import React from "react";
import Container from "../components/Container";

export default function Page() {
  return (
    <Container fullWidth={true}>
      <div className="h-screen justify-start items-center flex flex-col">
        <center className="mt-14">
          <div className="tracking-widest mt-4">
            <span className="text-night dark:text-day text-6xl block">
              <span>4 0 4</span>
            </span>
            <span className="text-night dark:text-day text-xl mt-3">
              page not found
            </span>
          </div>
        </center>
        <Link href="/">
          <center className="mt-6 text-night font-medium text-xl bg-gray-200 p-3 rounded-md max-w-xs">
            back home
          </center>
        </Link>
      </div>
    </Container>
  );
}
