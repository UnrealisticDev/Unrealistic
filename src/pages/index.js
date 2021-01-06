import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import Helmet from "react-helmet";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Carousel from "../components/carousel";
import { getPostSlug } from "../scripts/router";

const PageTitle = styled.h1`
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
  ${"" /* font-family: "basic-sans", sans-serif; */}
  font-family: 'Bungee', cursive;

  & #title-remainder {
    color: hsl(204, 86%, 53%);
    font-family: "Bungee", cursive !important;
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.h2`
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

const MobilePostCard = ({ post }) => {
  const Wrapper = styled.div`
    margin-bottom: 2rem;
  `;

  const StyledLink = styled(Link)``;

  const StyledImg = styled(Img)`
    border-radius: 5px;
  `;

  const Title = styled.h2`
    margin-top: 0.5rem;
    margin-bottom: 0.5rem !important;
    font-family: "basic-sans", san-serif;
  `;

  const Excerpt = styled.p`
    font-family: 'Open Sans', sans-serif;
  `

  const { slug, title, image, excerpt, body } = post;
  return (
    <Wrapper>
      <StyledLink to={getPostSlug(slug)}>
        <StyledImg fluid={image ? image.fluid : null} />
      </StyledLink>
      <Title className="title is-size-5">{title}</Title>
      <Excerpt>{excerpt || body.childMarkdownRemark.excerpt}</Excerpt>
    </Wrapper>
  );
};

export default ({ data }) => {
  return (
    <>
      <Helmet>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Bungee&family=Roboto&display=swap');
        </style>
        <style>
          @import
          url("https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Open+Sans&display=swap");
        </style>
      </Helmet>
      <Layout>
        <SEO
          title="Unrealistic: Game Development Tutorials, Insider Insights, and Industry Analysis"
          titleOverride
          description="Unrealistic is the ultimate resource for cracking the gaming industry. It has tutorials on Unreal Engine 4 and Unity, insider insights, and coverage of industry news."
        />
        {/* Intro - Desktop */}
        <section
          className="hero is-fullheight-with-navbar is-light is-hidden-mobile"
          style={{ maxHeight: "calc(100vh - 3.25rem)", overflow: "hidden" }}
        >
          <div
            className="hero-body is-marginless is-paddingless"
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
          >
            <Carousel items={data.allPosts} />
          </div>
        </section>
        {/* Intro - Mobile */}
        <section className="section is-hidden-desktop is-hidden-tablet">
          <div className="container">
            {data.allPosts.edges.map(({ node }, i) => (
              <>
              <MobilePostCard post={node}/>
              {i < data.allPosts.edges.length - 1 && <hr style={{background: 'rgb(.1, .1, .1, .1)'}}/>}
              </>
            ))}
          </div>
        </section>
        {/* Intro - Deprecated */}
        {/* <section className="hero is-fullheight-with-navbar is-light">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-vcentered is-variable is-8">
                <div className="column is-4">
                  <PageTitle className="title is-size-1">
                    <span id="title-lead">Un</span>
                    <span id="title-remainder">realistic</span>
                  </PageTitle>
                  <PageSubtitle className="subtitle">
                    Game Development Tutorials, Insider Insights, and Industry
                    Analysis
                  </PageSubtitle>
                  <p>
                    Unrealistic is the ultimate resource for cracking the gaming
                    industry. It has tutorials on Unreal Engine 4 and Unity,
                    insider insights, and coverage of industry news.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </Layout>
    </>
  );
};

export const query = graphql`
  query {
    allPosts: allContentfulPost(
      filter: { seriesRef: { id: { eq: null } } }
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
