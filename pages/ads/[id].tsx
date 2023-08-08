import { NextPageContext } from "next";
import Container from "../../components/Container";
import Content from "../../components/oneAd/content";
import InfoSide from "../../components/oneAd/infoSide";
import { useAd, useProfile } from "../../utils/useApi";

export function getServerSideProps(ctx: NextPageContext) {
  return { props: { id: ctx.query.id } };
}
export default function Ad({ id }: { id: string }) {
  let { ad, isLoading, error } = useAd(id);
  let { profile } = useProfile();
  return (
    <Container className="flex ad justify-between items-start max-md:flex-col-reverse gap-4 px-0">
      {ad && (
        <>
          <Content ad={ad} />
          <InfoSide ad={ad} profile={profile} />
        </>
      )}
    </Container>
  );
}
