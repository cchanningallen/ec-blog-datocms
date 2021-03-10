import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Container from "../components/container";
import Layout from "../components/layout";
import Header from "../components/header";
import { request } from "../lib/datocms";
import { metaTagsFragment } from "../lib/fragments";

export async function getStaticProps({ preview }) {
  const graphqlRequest = {
    query: `
      {
        site: _site {
          favicon: faviconMetaTags {
            ...metaTagsFragment
          }
        }
        blog {
          seo: _seoMetaTags {
            ...metaTagsFragment
          }
        }
      }

      ${metaTagsFragment}
    `,
    preview,
  };

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
            environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
    },
  };
}

export default function AboutUs({ subscription, preview }) {
  const {
    data: { site, blog },
  } = useQuerySubscription(subscription);

  const metaTags = blog.seo.concat(site.favicon);

  return (
    <Layout preview={preview}>
      <Head>{renderMetaTags(metaTags)}</Head>
      <Container>
        <Header />
      </Container>
    </Layout>
  );
}
