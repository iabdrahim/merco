import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import { ToastContainer } from "react-toastify";
import Nav from "./nav";
import Footer from "./footer";
export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
