import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import ALL from "../ALL.config";

const PostLoader = (props: any) => {
  return (
    <ContentLoader
      backgroundColor="#4d4d4d"
      backgroundOpacity={0.2}
      foregroundOpacity={0.2}
      viewBox="0 0 400 370"
      {...props}
    >
      {/* Cover image */}
      <rect x="0" y="0" rx="10" ry="10" width="400" height="250" />
      {/* price */}
      <rect x="0" y="270" rx="10" ry="10" width="100" height="25" />
      <rect x="0" y="310" rx="10" ry="10" width="200" height="16" />
      {/* description */}
      <rect x="0" y="350" rx="5" ry="5" width="90" height="10" />
      <rect x="310" y="350" rx="5" ry="5" width="90" height="10" />
    </ContentLoader>
  );
};

const FullPostLoader = ({ ...rest }) => (
  <ContentLoader
    viewBox="0 0 261 431"
    backgroundColor="#4d4d4d"
    backgroundOpacity={0.2}
    foregroundOpacity={0.2}
    rtl
    {...rest}
  >
    {/* Title */}
    <rect x="0" y="0" rx="5" ry="5" width="250" height="10" />
    {/* Sub-info 1 */}
    <rect x="0" y="20" rx="2" ry="2" width="90" height="3" />
    {/* ser */}
    <rect x="0" y="27" rx="4" ry="4" width="200" height="19" />
    {/* image */}
    {/* <rect x="0" y="47" rx="2" ry="2" width="350" height="65" /> */}
    {/* Body */}
    <rect x="0" y="50" rx="4" ry="4" width="260" height="450" />
  </ContentLoader>
);

PostLoader.metadata = {
  name: ALL.author, // My name
  github: ALL.socialLink.github, // Github username
  description: "A simple loader for a post", // Little tagline
  filename: "loaders", // filename of your loader
};

FullPostLoader.metadata = {
  name: ALL.author, // My name
  github: ALL.socialLink.github, // Github username
  description: "A simple loader for a full post", // Little tagline
  filename: "loaders", // filename of your loader
};

export default PostLoader;
export { FullPostLoader };
