import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStream } from "@fortawesome/free-solid-svg-icons";

import Layout from "../components/shared/layout";
import Seo from "../components/shared/seo";
import { Heading, Text } from "../components/shared/typography";

const Subtitle = styled(Text)`
  margin-bottom: 1rem;
  width: 30vw;

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

const ArticleTitle = styled(Heading)`
  margin-bottom: 0.5rem;
  @media screen and (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ArticleExcerpt = styled(Text)`
  color: #363636;
`;

const Wrapper = styled.div`
  margin-bottom: 3rem;
  @media screen and (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

const SeriesIcon = styled(FontAwesomeIcon)`
  margin-left: .5em;
  color: hsl(0, 0%, 71%);
`

function Series({ source }) {
  const { title, posts } = source;
  const firstPost = posts[0];

  return (
    <Wrapper className="column is-4">
      <Link to={firstPost.slug + "/"}>
        <ArticleBody>
          <ArticleImage
            fluid={
              firstPost.image
                ? firstPost.image.fluid
                : "https://versions.bulma.io/0.5.3/images/placeholders/1280x960.png"
            }
            alt="Post Feature"
          />
          <div>
            <ArticleTitle as="h2" style={{ display: "inline-block" }}>
              {title}
            </ArticleTitle>
            <SeriesIcon icon={faStream} />
          </div>
          <ArticleExcerpt>
            {firstPost.excerpt || firstPost.body.childMarkdownRemark.excerpt}
          </ArticleExcerpt>
        </ArticleBody>
      </Link>
    </Wrapper>
  );
}

function Article({ source }) {
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
          <ArticleTitle as="h2">{source.title}</ArticleTitle>
          <ArticleExcerpt>
            {source.excerpt || source.body.childMarkdownRemark.excerpt}
          </ArticleExcerpt>
        </ArticleBody>
      </Link>
    </Wrapper>
  );
}

const Page = ({ data }) => {
  const { series, standalonePosts } = data;

  return (
    <Layout>
      <Seo
        title="Game Dev Library"
        description="Find game development insight here, with articles about Unreal Engine 4 and Unity Engine, tips and tricks from insiders, and analysis of industry trends."
        canonical="/posts"
      />
      <div className="section">
        <div className="container">
          <Heading className="title is-size-1">Game Dev Library</Heading>
          <Subtitle>
            Find anything and everything about game development here, from
            how-to's for popular technologies like Unreal Engine 4 and Unity
            Engine, to tips and tricks from insiders, to analysis of the latest
            developments in the gaming industry.
          </Subtitle>
          <div className="columns is-multiline is-desktop is-variable is-6">
            {series.nodes.map((series, i) => {
              return (
                <>
                  <Series source={series} />{" "}
                  <hr
                    className="is-hidden-desktop is-hidden-tablet"
                    style={{
                      background: "rgb(.1, .1, .1, .1)",
                      marginBottom: ".5rem"
                    }}
                  />
                </>
              );
            })}
            {standalonePosts.nodes.map((article, i) => {
              return (
                <>
                  <Article source={article} />{" "}
                  {i < standalonePosts.nodes.length - 1 && (
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
          <div className="columns is-multiline is-desktop is-variable is-6"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;

export const query = graphql`
  query {
    series: allContentfulSeries {
      nodes {
        id
        title
        posts {
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
    standalonePosts: allContentfulPost(
      filter: { fields: { series: { id: { eq: null } } } }
      sort: { fields: createdAt, order: DESC }
    ) {
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
