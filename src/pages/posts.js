import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";

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

const Subtitle = styled.p`
  margin-bottom: 1rem;
  width: 30vw;

  font-family: 'Open Sans', san-serif;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 2rem;
  }
`;

const ArticleBody = styled.div`
  padding: 2rem;

  &:hover {
    background: lightgrey;
    border-radius: 5px;
  }

  @media screen and (max-width: 768px) {
    padding: 0rem;
    &:hover {
      background: transparent;
    }
  }
`;

const ArticleImage = styled(Img)`
  margin-bottom: 1rem;
  object-fit: cover;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  @media screen and (max-width: 768px) {
    border-radius: 5px;
  }
`;

const ArticleTitle = styled.h2`
  margin-bottom: 1rem;
  font-family: "basic-sans", sans-serif;
  color: #363636;

  margin-bottom: 0.5rem;
  @media screen and (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ArticleExcerpt = styled.p`
  color: #363636;
  font-family: "Open Sans", san-serif;
`;

function Article({ source }) {
  const Wrapper = styled.div`
    margin-bottom: 3rem;
    @media screen and (max-width: 768px) {
      margin-bottom: 0.5rem;
    }
  `;

  return (
    <Wrapper className="column is-4">
      <Link to={source.slug + "/"}>
        <ArticleBody>
          <ArticleImage
            fluid={
              source.image
                ? source.image.fluid
                : "https://versions.bulma.io/0.5.3/images/placeholders/1280x960.png"
            }
            alt="Post Feature"
          />

          <ArticleTitle>{source.title}</ArticleTitle>
          <ArticleExcerpt>
            {source.excerpt || source.body.childMarkdownRemark.excerpt}
          </ArticleExcerpt>
        </ArticleBody>
      </Link>
    </Wrapper>
  );
}

export default ({ data }) => {
  return (
    <Layout>
      <style>
        @import
        url("https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Open+Sans&display=swap");
      </style>
      <SEO
        title="Game Dev Library"
        description="Find game development insight here, with articles about Unreal Engine 4 and Unity Engine, tips and tricks from insiders, and analysis of industry trends."
        canonical="/posts"
      />
      <div className="section">
        <div className="container">
          <Title className="title is-size-1">Game Dev Library</Title>
          <Subtitle>
            Find anything and everything about game development here, from
            how-to's for popular technologies like Unreal Engine 4 and Unity
            Engine, to tips and tricks from gaming insiders, to analysis of the
            latest developments in the gaming industry.
          </Subtitle>
          <div className="columns is-multiline is-desktop is-variable is-6">
            {data.posts.nodes.map((article, i) => {
              return (
                <>
                  <Article source={article} />{" "}
                  {i < data.posts.nodes.length - 1 && (
                    <hr
                      className="is-hidden-desktop is-hidden-tablet"
                      style={{
                        background: "rgb(.1, .1, .1, .1)",
                        marginBottom: ".5rem"
                      }}
                    />
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    posts: allContentfulPost(sort: { fields: createdAt, order: DESC }) {
      nodes {
        slug
        title
        excerpt
        image {
          fluid(maxWidth: 500) {
            ...GatsbyContentfulFluid
          }
        }
        body {
          childMarkdownRemark {
            excerpt
          }
        }
      }
    }
  }
`;
