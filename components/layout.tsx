import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import { ToastContainer } from "react-toastify";
import Nav from "./nav";
import Footer from "./footer";
export default function Layout({ children }: { children: any }) {
  let r = useRouter();
  let noNavAndFooter = ["/post"];
  return (
    <>
      {!noNavAndFooter.some((el) => el == r.asPath) && <Nav />}
      {children}
      {!noNavAndFooter.some((el) => el == r.asPath) && <Footer />}
    </>
  );
}
