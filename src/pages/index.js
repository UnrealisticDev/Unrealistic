import React from "react";
import { graphql } from "gatsby";

import Layout from "../shared/components/layout";
import SEO from "../shared/components/seo";

import Intro from "./index/intro";
import Portfolio from "./index/portfolio";

export default ({ data }) => {
  const { posts, portfolio } = data;
  return (
    <>
      <SEO
        title="Unrealistic: Game Development Tutorials, Insider Insights, and Industry Analysis"
        titleOverride
        description="Unrealistic is the ultimate resource for cracking the gaming industry. It has tutorials on Unreal Engine 4, insider insights, and coverage of industry news."
      />
      <Layout>
        <Intro posts={posts.nodes} />
        <Portfolio portfolio={portfolio.nodes} />
      </Layout>
    </>
  );
};

export const query = graphql`
  query {
    posts: allContentfulPost(
      filter: { fields: { series: { id: { eq: null } } } }
      sort: { fields: createdAt, order: DESC }
      limit: 5
    ) {
      nodes {
        slug
        title
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
    portfolio: allContentfulPost(limit: 9) {
      nodes {
        slug
        title
        image {
          fluid(maxWidth: 900) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`;
