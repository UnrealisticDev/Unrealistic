import React from "react";
import { graphql } from "gatsby";

import Layout from "../shared/components/layout";
import SEO from "../shared/components/seo";
import Carousel from "../shared/components/carousel";

import MobilePostCard from "./index/mobilepostcard";

export default ({ data }) => {
  const { posts } = data;

  return (
    <>
      <SEO
        title="Unrealistic: Game Development Tutorials, Insider Insights, and Industry Analysis"
        titleOverride
        description="Unrealistic is the ultimate resource for cracking the gaming industry. It has tutorials on Unreal Engine 4 and Unity, insider insights, and coverage of industry news."
      />
      <Layout>
        {/* Intro - Desktop */}
        <section className="hero is-fullheight-with-navbar is-light is-hidden-mobile">
          <div
            className="hero-body is-marginless is-paddingless"
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
          >
            <Carousel items={posts} />
          </div>
        </section>
        {/* Intro - Mobile */}
        <section className="section is-hidden-desktop is-hidden-tablet">
          <div className="container">
            {posts.edges.map(({ node }, i) => (
              <>
                <MobilePostCard post={node} />
                {i < posts.edges.length - 1 && (
                  <hr style={{ background: "rgb(.1, .1, .1, .1)" }} />
                )}
              </>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
};

export const query = graphql`
  query {
    posts: allContentfulPost(
      filter: { fields: { series: { id: { eq: null } } } }
      sort: { fields: createdAt, order: DESC }
      limit: 3
    ) {
      edges {
        node {
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
    }
  }
`;
