import { getAllPostIds, getPostData } from "../lib/portfolio";
import Layout from "../components/layout";
import Head from "next/head";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title} - Esunowba Portfolio Page</title>
      </Head>

      <article>
        {/* <h1 className={utilStyles.headingXl}>{postData.title}</h1> */}
        <div className={utilStyles.lightText}>
          Last Modified :&nbsp;
          <Date dateString={postData.date} />
        </div>
        <div className={utilStyles.title}>{postData.title}</div>

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
