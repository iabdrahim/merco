const ALL = {
  title: "store",
  author: "Abderrahim",
  link: "https://merco.vercel.app",
  email: "abderrahimaneddam1@gmail.com",
  description: "this is a store",
  lang: "ar-EG", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES']
  timezone: "egypt/kahera", // See https://en.wikipedia.org/wiki/List_of_tz_database_time_zones for all options.
  appearance: "auto", // ['light', 'dark', 'auto'],
  font: "sans-serif", // ['sans-serif', 'serif']
  lightBackground: "#F6F8FA", // use hex value, don't forget '#' e.g #fffefc
  darkBackground: "#212936", // use hex value, don't forget '#'
  path: "", // leave this empty unless you want to deploy Notionic in a folder
  since: 2023, // If leave this empty, current year will be used.
  postsPerPage: 15,
  sortByDate: true,
  showLoadingSpinner: false,
  primaryColor: "#0f766e",
  primaryColorD: "#2dd4bf",
  sendFromEmail: {
    mail: "abderrhimaneddam@gmail.com",
    password: "zzpzldwqwblnvcko",
  },
  pagesIcon: "/logo.svg",
  defaultAdCover: "/cover.jpg",
  socialLink: {
    twitter: "https://twitter.com/iabdrahimz",
    github: "https://github.com/iabdrahim",
    instagram: "https://instagram.com/iabderrahim",
  },
  ApiEndPoint: `https://avito-clone.onrender.com`, //your api endpoint
  seo: {
    keywords: [
      "hamesh",
      "مدونة عربية",
      "Abderrahim aneddam",
      "hamesh ALL",
      "مدونة هامش",
    ],
    googleSiteVerification: "5EySfeUGoEZeYFK_SsE2qJD_ZcX4S9e_YmkrEtpZKZs", // Remove the value or replace it with your own google site verification code
  },
  analytics: {
    provider: "", // Currently we support Google Analytics, Ackee, Umami and Cloudflare Insights, please fill with 'ga' or 'ackee' or 'umami' or 'cf', leave it empty to disable it.
    ackeeConfig: {
      tracker: "", // e.g 'https://ackee.example.com/tracker.js'
      dataAckeeServer: "", // e.g https://ackee.example.com , don't end with a slash
      domainId: "", // e.g '0e2257a8-54d4-4847-91a1-0311ea48cc7b'
    },
    cfConfig: {
      scriptUrl: "https://static.cloudflareinsights.com/beacon.min.js", // Default
      token: "", // Like '{"token": "xxxxxxxxxxxxxxxxxx"}'
    },
    gaConfig: {
      measurementId: "G-0N1ZB5BW1W", // e.g: G-XXXXXXXXXX
    },
    umamiConfig: {
      scriptUrl: "", // The url of your Umami script
      websiteId: "", // The website id of your Umami instance
    },
  },
  ads: {
    clientID: "ca-pub-5674373923983019",
  },
  comment: {
    // support provider: utterances, supacomments
    provider: "", // leave it empty if you don't need any comment plugin
    supaCommentsConfig: {
      supabaseUrl: "", // The url of your Supabase instance
      supabaseAnonKey: "", // The anonymous key of your Supabase instance
    },
    utterancesConfig: {
      repo: "",
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
};

export default ALL;
