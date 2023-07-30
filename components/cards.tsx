import React from "react";
import { IAd } from "../utils/interfaces";
import Ad from "./oneAd/ad";
import PostLoader from "./loaders";

export default function Cards({
  data,
  isLoading,
  className,
}: {
  data: IAd[] | null;
  isLoading?: boolean;
  className?: string;
}) {
  return (
    <main className={`ads w-full ${className || ""}`}>
      {data && data?.map((ad: IAd) => <Ad key={ad._id} data={ad} />)}

      {isLoading && (
        <>
          <PostLoader />
          <PostLoader />
          <PostLoader />
          <PostLoader />
          <PostLoader />
          <PostLoader />
          <PostLoader />
          <PostLoader />
        </>
      )}
    </main>
  );
}
