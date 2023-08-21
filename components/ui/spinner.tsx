import React from "react";

export default function Spinner() {
  return (
    <div
      title="loding..."
      className="w-full h-full flex justify-center items-center "
    >
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="5"
        ></circle>
      </svg>
    </div>
  );
}
