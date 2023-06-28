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
                  <meta
                  property="og:url"
                  content={`${host}/_next/image?url=${encodeURIComponent(
                    post.featuredImage?.node.sourceUrl
                  )}&w=3840&q=100`}
                />
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
