import React from "react";
import { IAd } from "../utils/interfaces";
import Ad from "./oneAd/ad";
import PostLoader from "./loaders";

export default function Cards({
  data,
  isLoading,
  className,
  hisposts,
}: {
  data: IAd[] | null;
  isLoading?: boolean;
  className?: string;
  hisposts?: boolean;
}) {
  return (
    <main className={`ads w-full ${className || ""}`}>
      {data &&
        data?.map((ad: IAd) => (
          <Ad key={ad._id} data={ad} hisposts={hisposts} />
        ))}

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
