import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import router from "../scripts/router";

import Layout from "../components/layout";
import SEO from "../components/seo";

const StyledImg = styled(Img)`
  @media screen and (max-width: 768px) {
    border-radius: 5px;
  }
`

const Title = styled.h1`
  @font-face {
    font-family: "basic-sans";
    src: url("https://use.typekit.net/af/fa9ffd/00000000000000003b9b0438/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3")
        format("woff2"),
      url("https://use.typekit.net/af/fa9ffd/00000000000000003b9b0438/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3")
        format("woff"),
      url("https://use.typekit.net/af/fa9ffd/00000000000000003b9b0438/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3")
        format("opentype");
    font-style: normal;
    font-weight: 900;
    font-display: auto;
  }

  font-family: "basic-sans", sans-serif;
`;

const MarketplaceButton = styled.a`
  color: hsl(204, 86%, 53%) !important;
`;

const DocLink = styled(Link)`
  &:hover {
    background-color: lightgrey !important;
  }
`;

export default ({ data, pageContext }) => {
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
                  <Title>{longName}</Title>
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
