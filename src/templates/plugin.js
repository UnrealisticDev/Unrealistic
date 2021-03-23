import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import router from "../shared/scripts/router";
import Layout from "../shared/components/layout";
import SEO from "../shared/components/seo";
import { Heading } from "../shared/components/typography";

const StyledImg = styled(Img)`
  @media screen and (max-width: 768px) {
    border-radius: 5px;
  }
`;

const MarketplaceButton = styled.a`
  color: hsl(204, 86%, 53%) !important;
`;

const DocLink = styled(Link)`
  &:hover {
    background-color: lightgrey !important;
  }
`;

export default ({ data }) => {
  const { plugin, docs } = data;
  const {
    slug,
    name,
    longName,
    featureImage,
    description,
    marketplaceUrl
  } = plugin;

  return (
    <Layout>
      <SEO
        title={longName.concat(" for Unreal Engine 4")}
        description={description.description}
        canonical={router.getProductSlug(slug)}
      />
      <section className="section">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-8">
              <div className="tile is-parent">
                <div className="tile is-child">
                  <StyledImg fluid={featureImage.fluid} alt="Plugin Feature" />
                </div>
              </div>
              <div className="tile is-parent">
                <div className="tile is-child content">
                  <Heading>{longName}</Heading>
                  <p>{description.description}</p>
                  <MarketplaceButton
                    className={"button is-dark"}
                    href={marketplaceUrl}
                  >
                    Get it on the Marketplace
                  </MarketplaceButton>
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
                          <DocLink href={router.getPostSlug(slug)}>
                            {title.replace(name.concat(": "), "")}
                          </DocLink>
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
      slug
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
    docs: contentfulSeries(title: { eq: $name }) {
      posts {
        title
        slug
      }
    }
  }
`;
