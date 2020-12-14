import React from "react";
import { graphql, Link } from "gatsby";
import Helmet from "react-helmet";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";

const TitleWrapper = styled.div`
  @media screen and (min-width: 769px) {
    position: sticky;
    top: 10vh;
  }
`;

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
  color: #363636;
`;

const Category = styled.div``;

const CategoryTitle = styled.h2`
  display: inline-block;
  font-family: "Lato", sans-serif;
  color: #363636;
  font-size: calc(10px + 1.4vw);
  border-bottom: 2px solid #eaaa03;
`;

const Entry = styled(Link)`
  justify-content: flex-start;
  margin-top: 1rem;
  color: black;
  &:hover {
    h3 {
      color: rgb(50, 115, 220) !important;
    }
  }
`;

const EntryTitle = styled.h3`
  margin-top: 1rem;
  margin-bottom: 1rem;

  font-family: "Lato", sans-serif;
`;

const EntryDescription = styled.p`
  margin-left: 3rem;
  margin-bottom: 1rem;

  font-family: "Open Sans", sans-serif;
`;

export default ({ data }) => (
  <Layout>
    <SEO
      title="Glossary"
      description="Find definitions and examples for UPROPERTY, UFUNCTION, USTRUCT, and UCLASS specifiers."
    />
    <Helmet>
      <style>
        @import
        url("https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Open+Sans&display=swap");
      </style>
    </Helmet>
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-3">
            <TitleWrapper>
              <Title className="title is-size-1">Glossary</Title>
              <p>
                Find definitions and examples for Unreal Engine 4 and other game
                development terminology.
              </p>
            </TitleWrapper>
          </div>
          <div className="column is-6">
            {data.categories.nodes.map(({ name, references }) => {
              return (
                <Category>
                  <CategoryTitle>{name}</CategoryTitle>
                  <ul>
                    {references.map(({ name, slug, description }) => (
                      <Entry to={slug}>
                        <EntryTitle>{name}</EntryTitle>
                        <EntryDescription>{description}</EntryDescription>
                      </Entry>
                    ))}
                  </ul>
                </Category>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export const query = graphql`
  query {
    categories: allContentfulList(filter: { tags: { in: "glossary" } }) {
      nodes {
        name
        references {
          name
          slug
          description
        }
      }
    }
  }
`;
