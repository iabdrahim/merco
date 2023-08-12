import React from "react";
import Cards from "../components/cards";
import Container from "../components/Container";
import { useProfile, useSearch } from "../utils/useApi";

export const getServerSideProps = withPageAuthRequired();

export default function Saved() {
  let { profile } = useProfile();
  let { ads } = useSearch("?ids=" + profile?.saved.join(","));
  return (
    <Container className="saved">
      <h1>Saved</h1>
      {profile && profile?.saved ? (
        <Cards data={ads} />
      ) : (
        <h4 className="text-gray-500 text-lg">Nothing found</h4>
      )}
    </Container>
  );
}
