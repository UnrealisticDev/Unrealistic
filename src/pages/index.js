import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/shared/layout";
import Seo from "../components/shared/seo";

import Intro from "../components/index/intro";
import Portfolio from "../components/index/portfolio";

const Page = ({ data }) => {
  const { posts, portfolio } = data;
  return (
    <>
      <Seo
        title="Unrealistic: Game Development Tutorials, Insider Insights, and Industry Analysis"
        titleOverride
        description="Unrealistic is the ultimate resource for cracking the gaming industry. It has tutorials on Unreal Engine 4, insider insights, and coverage of industry news."
      />
      <Layout>
        <Intro posts={posts.nodes} />
        <Portfolio portfolio={portfolio} />
      </Layout>
    </>
  );
};

export default Page;

export const query = graphql`
  query {
    posts: allContentfulPost(
      sort: { fields: createdAt, order: DESC }
      limit: 25
    ) {
      nodes {
        slug
        title
        series {
          id
        }
        image {
          fluid(maxWidth: 900) {
            ...GatsbyContentfulFluid
          }
          file {
            url
          }
        }
        excerpt
        body {
          childMarkdownRemark {
            excerpt
          }
        }
      }
    }
    portfolio: allContentfulShowcase {
      nodes {
        title
        feature {
          fluid(maxWidth: 900) {
            ...GatsbyContentfulFluid
          }
        }
        pitch
      }
    }
  }
`;
