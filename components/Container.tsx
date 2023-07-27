// import SEO from "@/components/Common/SEO";
import React from "react";
import ALL from "../ALL.config";
import SEO from "./seo";

function Container({
  children,
  fullWidth,
  customMeta,
  className,
}: {
  children: any;
  fullWidth?: boolean;
  customMeta?: {};
  className?: string;
}) {
  const meta = {
    title: ALL.title,
    type: "website",
    ...customMeta,
  };
  return (
    <>
      <SEO meta={meta} />
      <main
        className={`m-auto w-full transition-all h-full minHiegth ${
          !fullWidth ? "max-w-7xl mx-auto px-4 max-md:px-2" : "px-4 md:px-24"
        } ${!className ? "" : className}`}
      >
        {children}
      </main>
    </>
  );
}
export default Container;
