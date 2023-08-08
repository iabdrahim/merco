import Layout from "../components/layout";
import "../styles/globals.scss";
// import "react-toastify/dist/ReactToastify.css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import FilterQueryContext from "../context/filter";
// import "moment/locale/ar";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import NextProgress from "next-progress";
import ALL from "../ALL.config";
import * as gtag from "../lib/gtag";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  // useEffect(() => {
  //   document.body.className = "bg-day dark:bg-night";
  //   document.querySelector(":root")?.setAttribute("lang", "ar");
  // },[]);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (ALL.isProd) gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <UserProvider>
        <FilterQueryContext>
          <Layout>
            <NextProgress
              color={"#000"}
              options={{ showSpinner: ALL.showLoadingSpinner }}
            />
            <Component {...pageProps} />
          </Layout>
        </FilterQueryContext>
      </UserProvider>
    </>
  );
}
