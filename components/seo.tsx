import Head from "next/head";
import { useRouter } from "next/router";
import ALL from "../ALL.config";

const SEO = ({ meta }: { meta: any }) => {
  const ogImage = `${ALL.link}/api/default?logo=${
    ALL.link
  }/favicon.png&siteName=${encodeURIComponent(
    ALL.title?.trim()
  )}&description=${encodeURIComponent(
    ALL.description?.trim()
  )}&title=${encodeURIComponent(
    meta.title?.trim()
  )}&summary=${encodeURIComponent(
    meta.description?.trim()
  )}&theme=light&border=solid`;

  const router = useRouter();
  const url = ALL.path.length ? `${ALL.link}/${ALL.path}` : ALL.link;
  return (
    <Head>
      <title>{meta.title}</title>
      <meta content={ALL.darkBackground} name="theme-color" />
      <link rel="icon" href={ALL.pagesIcon}></link>
      <meta name="robots" content="follow, index" />
      <meta charSet="UTF-8" />
      {ALL.seo.googleSiteVerification && (
        <meta
          name="google-site-verification"
          content={ALL.seo.googleSiteVerification}
        />
      )}
      {ALL.seo.keywords && (
        <meta name="keywords" content={ALL.seo.keywords.join(", ")} />
      )}
      <meta name="description" content={meta.description} />
      <meta property="og:locale" content={ALL.lang} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta
        property="og:url"
        content={meta.slug ? `${url}/${meta.slug}` : `${url}${router.asPath}`}
      />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={meta.type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:image" content={ogImage} />
      {meta.type === "aricle" && (
        <>
          <meta property="article:published_time" content={meta.date} />
          <meta property="article:author" content={ALL.author} />
        </>
      )}
      <script
        async
        src={
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
          ALL.ads.clientID
        }
        crossOrigin="anonymous"
      ></script>
    </Head>
  );
};
export default SEO;
