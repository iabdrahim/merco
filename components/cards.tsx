import React from "react";
import { IAd } from "../utils/interfaces";
import Ad from "./oneAd/ad";
import PostLoader from "./loaders";
import { useProfile } from "../utils/useApi";

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
  let { profile } = useProfile();
  return (
    <main className={`ads w-full ${className || ""}`}>
      {data &&
        data?.map((ad: IAd) => (
          <Ad key={ad._id} data={ad} hisposts={hisposts} profile={profile} />
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
