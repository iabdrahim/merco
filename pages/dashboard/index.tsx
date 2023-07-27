import { getServerSession } from "next-auth";
import { useEffect, useState } from "react";
import Container from "../../components/Container";
import PostsTable from "../../components/dashboard/postTable";
import { Statistic } from "../../components/dashboard/statistic";
import { authOptions } from "../api/auth/[...nextauth]";
import useSWR from "swr";
import ALL from "../../ALL.config";
const fetcher = async (url: string | Request) => {
  const res = await fetch(url);
  return res.json();
};

export const getServerSideProps = async (ctx: any) => {
  let session = await getServerSession(ctx.req, ctx.res, authOptions);
  let user = session?.user?.email == ALL.email;
  if (user) {
    return { props: {} };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/auth",
      },
      props: {},
    };
  }
};
function Index() {
  let {
    data: articles,
    error,
    isLoading,
  } = useSWR("/api/articles?all=true", fetcher);
  useEffect(() => {
    console.log(articles);
  }, [articles]);

  return (
    <Container className="dashboard w-full p-5 h-full" fullWidth={true}>
      <header className="w-full mt-24 flex justify-start items-start  flex-col">
        <h1 className="text-3xl font-semibold mb-6">
          مرحبا عبد الرحيم, كيف حالك ؟
        </h1>
        <hr className="h-[2px] w-full bg-opacity-50 border-none border-transparent bg-gray-300 dark:bg-gray-700 " />
      </header>
      <Statistic articles={articles?.data} />
      {articles?.data && <PostsTable articles={articles} />}
    </Container>
  );
}

export default Index;
