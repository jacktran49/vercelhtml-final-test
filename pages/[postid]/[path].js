import Head from "next/head";

import { useRouter } from "next/router";
import { parse } from "node-html-parser";

const domain = process.env.NEXT_PUBLIC_DOMAIN_URL;

function PostDetail({ data, host }) {
  const router = useRouter();
  const {
    query: { path, postid },
  } = router;

  const isRedirect =
    typeof window !== "undefined" &&
      (window.location.search ||
        (typeof document !== "undefined" &&
          document.referrer.indexOf("facebook.com") !== -1)) &&
      path &&
      postid
      ? true
      : false;

  if (isRedirect) {
    window.location.href = `${domain}${postid}/${path}`;
  }

  return (
    <div>
      <Head>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        {data.title && <title>{data.title}</title>}
        {data.title && <meta name="og:title" content={data.title} />}
        {data.image && <meta name="og:image" content={data.image} />}
        {data.title && data.image && <meta name="og:image:alt" content={data.title} />}
        {data.destination && <meta name="og:destination" content={data.destination} />}
        {host && <meta name="og:url" content={`https://${host}/posts/${postid}/${path}`} />}
        {host && <meta property="og:site_name" content={host.split('.')[0]} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
          {data.title}
        </h1>
        <p>You are being redirected to the post, please wait 1-2 seconds...</p>
      </main>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps(context) {
  const { path, postid } = context.params;
  const referringURL = context.req.headers?.referer || null;
  const fbclid = context.query.fbclid;

  if ((referringURL && referringURL.indexOf("facebook.com") !== -1) || fbclid) {
    return {
      redirect: {
        permanent: false,
        destination: `${domain}${postid}/${encodeURI(path)}`,
      },
    };
  }

  // Fetch data from external API
  const data = await fetch(`${domain}${postid}/${path}`)
    .then(function (response) {
      // When the page is loaded convert it to text
      return response.text();
    })
    .then(async function (html) {
      // Initialize the DOM parser

      // // Parse the text
      const doc = parse(html);

      const articleData = {
        image:
          doc
            .querySelector('meta[property~="og:image"]')
            .getAttribute("content") || "",
        title:
          doc
            .querySelector('meta[property~="og:title"]')
            .getAttribute("content") || "",
        destination:
          doc
            .querySelector('meta[property~="og:description"]')
            .getAttribute("content") || "",
      };

      return JSON.parse(JSON.stringify(articleData));
    })
    .catch(function (err) {
      return JSON.parse(JSON.stringify(err));
    });

  // Pass data to the page via props
  return { props: { data, host: context.req.headers.host } };
}

export default PostDetail;
