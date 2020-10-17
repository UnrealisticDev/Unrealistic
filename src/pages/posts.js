import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";

import "../styles/global.scss";
import styles from "./articles.module.scss";

function Article({ source }) {
  return (
    <div className="column is-4">
      <Link to={source.slug + '/'}>
        <div className={"box is-paddingless " + styles.Box}>
          <Img
            fluid={
              source.image
                ? source.image.fluid
                : "https://versions.bulma.io/0.5.3/images/placeholders/1280x960.png"
            }
            alt="Post Feature"
            className={styles.Image}
          />
          <div className={styles.TitleContainer}>
            <div
              className={
                "has-text-grey-lighter has-background-dark " + styles.Title
              }
            >
              {source.title}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Articles" />
      <div className="section">
        <div className="container">
          <div className="title is-size-1">Posts</div>
          <div className="subtitle">
            Find all the posts you're looking for, and some you're not.
          </div>
          <div className="columns is-multiline is-desktop">
            {data.allContentfulPost.nodes.map(article => {
              return <Article source={article} />;
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allContentfulPost(
      filter: { tags: { nin: ["docs"] } }
      sort: { fields: createdAt, order: DESC }
    ) {
      nodes {
        slug
        title
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`;
