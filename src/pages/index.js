import React from "react";
import { graphql } from "gatsby";
import * as random from "random";

import router from "../scripts/router";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Widget from "../components/widget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logoAndName from "../images/logo-name.png";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

export default ({ data }) => {
  function getRandomPost() {
    var idx = random.int(0, data.allPosts.edges.length - 1);
    return data.allPosts.edges[idx].node;
  }

  function getImageFromPost(post) {
    var defaultImg = "https://bulma.io/images/placeholders/1280x960.png;";
    return post && post.image ? post.image : defaultImg;
  }

  var totw = data.totw.edges[0].node;
  var freshPost = data.newestPosts.nodes[0];
  var stylePost = data.unrealisticStyleGuide;
  var devlogPost = data.projectAscendantDevlog;
  var beginnerPost = data.beginnersGuide;

  return (
    <Layout>
      <SEO title="Unrealistic" />
      <section className="section">
        <div className="container">
          <section className="section">
            <div className="level">
              <div className="container">
                <div className="content has-text-centered">
                  <figure
                    className="image"
                    style={{
                      maxWidth: "512px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginBottom: ".5vmin"
                    }}
                  >
                    <img src={logoAndName} alt="logo" />
                  </figure>
                  <p id="tagline" style={{ fontStyle: "italic" }}>
                    A place to learn about Unreal Engine 4,
                    <br className="is-hidden-mobile" /> gamedev, and other
                    things
                  </p>
                </div>
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
                    <div className={"content tip-of-the-week has-text-centered"}>
                      <hr />
                      <div className='title' id="totw-title">
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
                    </div>
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
      </section>
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
    allPosts: allContentfulPost {
      edges {
        node {
          slug
        }
      }
    }
    newestPosts: allContentfulPost(
      filter: {
        tags: {
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
      filter: { tags: { in: "insider" } }
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
    beginnersGuide: contentfulPost(
      series: { eq: "Beginner's Guide" }
      seriesNum: { eq: 0 }
    ) {
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
