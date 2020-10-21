import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import router from "../scripts/router";

import Layout from "../components/layout";
import SEO from "../components/seo";

import styles from "./plugin.module.scss";

export default ({ data, pageContext }) => {
  const { plugin, docs } = data;

  return (
    <Layout>
      <SEO title={plugin.longName} />
      <section className="section">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-8">
              <div className="tile is-parent">
                <div className="tile is-child">
                  <Img fluid={plugin.featureImage.fluid} alt="Plugin Feature" />
                </div>
              </div>
              <div className="tile is-parent">
                <div className="tile is-child content">
                  <h1>{plugin.longName}</h1>
                  <p>{plugin.description.description}</p>
                  <a
                    className={"button " + styles.MarketplaceButton}
                    href={plugin.marketplaceUrl}
                  >
                    Get it on the Marketplace
                  </a>
                </div>
              </div>
            </div>
            <div className="tile is-4 is-parent">
              <div className="tile is-child">
                <aside className="menu">
                  <p className="menu-label">Documentation</p>
                  <ul className="menu-list">
                    {docs.posts.map(({ slug, title }) => {
                      return (
                        <li>
                          <Link href={router.getPostSlug(slug)}>
                            {title.replace(plugin.name.concat(": "), "")}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const pluginQuery = graphql`
  query($name: String!) {
    plugin: contentfulPlugin(name: { eq: $name }) {
      name
      longName
      description {
        description
      }
      featureImage {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      marketplaceUrl
    }
    docs: contentfulSeries(title: {eq: $name}) {
      posts {
        title
        slug
      }
    }
  }
`;
