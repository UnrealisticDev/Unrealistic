import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Carousel from "../components/carousel";

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
  font-family: "basic-sans", sans-serif;
  color: #eaaa03 !important;
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

export default ({ data }) => {

  return (
    <Layout>
      <SEO
        title="Unrealistic: Game Development Tutorials, Insider Insights, and Industry Analysis"
        titleOverride
        description="Unrealistic is the ultimate resource for cracking the gaming industry. It has tutorials on Unreal Engine 4 and Unity, insider insights, and coverage of industry news."
      />
      {/* Intro */}
      <section className="hero is-fullheight-with-navbar is-light">
        <div className="hero-body">
          <div class="container">
            <div class="columns is-vcentered is-variable is-8">
              <div class="column is-4">
                <PageTitle className="title is-size-1">Unrealistic</PageTitle>
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
              <div className="column is-8">
                <Carousel items={data.allPosts} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Industry */}
      {/* Insider */}
      {/* <section className="hero is-dark is-fullheight-with-navbar">
        <div className="hero-body">
          <div class="container">Insider</div>
        </div>
      </section>
      <section className="hero is-light is-fullheight-with-navbar">
        <div className="hero-body">
          <div class="container">Newsletter</div>
        </div>
      </section> */}
      {/* <section className="hero is-fullheight-with-navbar">
        <div className="container">
          <section className="section">
            <div className="level">
              <div className="container">
                <div className="content has-text-centered"></div>
              </div>
            </div>
          </section>
          <div className="tile is-ancestor">
            <div className="tile is-vertical">
              <div className="tile">
                <div className="tile is-parent is-9">
                  <div className="tile is-child">
                    <Widget
                      title={freshPost.title}
                      flair="Fresh Off the Press"
                      subtitle={freshPost.body.childMarkdownRemark.excerpt}
                      image={getImageFromPost(freshPost)}
                      to={router.getPostSlug(freshPost.slug)}
                      fullheight
                    />
                  </div>
                </div>
                <div className="tile is-parent is-vertical">
                  <div className="tile is-child">
                    <Widget
                      title={stylePost.title}
                      subtitle="A comprehensive set of style conventions for UE4 projects."
                      flair="Style"
                      to={router.getPostSlug(stylePost.slug)}
                      image={getImageFromPost(stylePost)}
                      fullheight
                    />
                  </div>
                  <div className="tile is-child">
                    <TipOfTheWeek className={"content has-text-centered"}>
                      <hr />
                      <div className="title" id="totw-title">
                        Tip of the Week
                      </div>
                      <p>{totw.text.text}</p>
                      <p id="totw-author">{totw.author}</p>
                      {totw.source && (
                        <a href={totw.source} style={{ margin: "15px" }}>
                          <FontAwesomeIcon
                            icon={faExternalLinkAlt}
                            id="totw-source"
                          />
                        </a>
                      )}
                    </TipOfTheWeek>
                  </div>
                </div>
              </div>
              <div className="tile">
                <div className="tile is-parent is-vertical is-4">
                  <div className="tile is-child">
                    <Widget
                      to={router.getPostSlug(devlogPost.slug)}
                      title="Project Ascendant"
                      subtitle="An upcoming stealth crawler."
                      flair="Devlog"
                      image={getImageFromPost(devlogPost)}
                    />
                  </div>
                  <div className="tile is-child">
                    <Widget
                      to={router.getPostSlug(getRandomPost().slug)}
                      title="Random"
                      subtitle="Learn something new."
                      image="https://cdn.vox-cdn.com/thumbor/2PaCKdhf1dUhQkcGE9P-pMwKcJQ=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/8587203/overwatch_loot_box.jpg"
                    />
                  </div>
                </div>
                <div className="tile is-parent">
                  <div className="tile is-child">
                    <Widget
                      to={router.getPostSlug(beginnerPost.slug)}
                      subtitle="Build a tower defense game from top to bottom in just 21 days."
                      title="Beginner's Guide"
                      flair="Tutorials"
                      image={getImageFromPost(beginnerPost)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </Layout>
  );
};

export const query = graphql`
  query {
    totw: allContentfulTipOfTheWeek(
      limit: 1
      sort: { fields: createdAt, order: DESC }
    ) {
      edges {
        node {
          text {
            text
          }
          author
        }
      }
    }
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
          }
          body {
            childMarkdownRemark {
              excerpt
            }
          }
        }
      }
    }
    newestPosts: allContentfulPost(
      filter: {
        topicTags: {
          nin: [
            "insider"
            "devlog"
            "series"
            "unrealistic-style-guide"
            "docs"
          ]
        }
      }
      sort: { fields: createdAt, order: DESC }
      limit: 1
    ) {
      nodes {
        slug
        title
        image {
          fluid {
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
    insiderPosts: allContentfulPost(
      filter: { topicTags: { in: "insider" } }
      sort: { fields: createdAt, order: DESC }
      limit: 1
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
    unrealisticStyleGuide: contentfulPost(
      slug: { eq: "unrealistic-style-guide" }
    ) {
      title
      slug
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
    projectAscendantDevlog: contentfulPost(
      slug: { eq: "devlog-project-ascendant" }
    ) {
      slug
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
    beginnersGuide: contentfulPost {
      title
      slug
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`;
