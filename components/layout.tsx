import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Nav from "./nav";
import Footer from "./footer";
import Container from "./Container";
import Spinner from "./ui/spinner";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }: { children: any }) {
  let r = useRouter();
  let noNavAndFooter = ["/post", "/chats"];
  const [loading, setLoading] = useState(false);
  let router = useRouter();
  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events]);
  if (loading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }
  return (
    <>
      {!noNavAndFooter.some((el) => el == r.asPath) && <Nav />}
      {children}
      {!noNavAndFooter.some((el) => el == r.asPath) && <Footer />}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2 }}
      />
    </>
  );
}
