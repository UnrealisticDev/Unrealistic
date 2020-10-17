import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import rehypeReact from "rehype-react";
import HyvorTalk from "hyvor-talk-react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Sidebar from "../components/sidebar";
import TOC from "../components/toc";
import ProjectFiles from "../components/projectfiles";
import ScrollUpButton from "react-scroll-up-button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleUp,
  faCopy
} from "@fortawesome/free-solid-svg-icons";

import "../styles/code.scss";
import styles from "./post.module.scss";

/* Todo: Enable lazy loaded images in markdown. */

/* Header id formatter. */
const format = string => {
  const regex = /,|\./gi;
  const spacesregex = /\s/gi;
  var processed = String(string).toLowerCase();
  processed = processed.replace(regex, "");
  processed = processed.replace(spacesregex, "-");
  return processed;
};

var codeblockId = 0;

/* Used to demote headers and do other html processing. */
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: props => <h2 id={format(props.children[0])}>{props.children}</h2>,
    h2: props => <h3 id={format(props.children[0])}>{props.children}</h3>,
    h3: props => <h4 id={format(props.children[0])}>{props.children}</h4>,
    h4: props => <h5 id={format(props.children[0])}>{props.children}</h5>,
    pre: props => {
      var id = "codeblock" + ++codeblockId;
      return (
        <pre id={id}>
          <button
            className="button is-light is-hidden"
            onClick={() => {
              navigator.clipboard.writeText(
                document.getElementById(id).innerText
              );
            }}
          >
            <FontAwesomeIcon className="has-text-grey" icon={faCopy} />
          </button>
          {props.children}
        </pre>
      );
    }
  }
}).Compiler;

const Section = styled.div`
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const CreateDate = ({ createdAt }) => {
  const date = new Date(createdAt);
  var internationalize = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format;
  var dateFormatted = internationalize(date);

  return (
    <div class="level-item">
      <p className="subtitle is-size-6">{dateFormatted}</p>
    </div>
  );
};

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

const Series = ({ series }) => {
  return (
    series && (
      <>
        <div className="level-item">·</div>
        <div class="level-item">
          <p className="subtitle is-size-6">{series}</p>
        </div>
      </>
    )
  );
};

const Frontmatter = styled.div`
  ${"" /* margin-bottom: 2vmin; */}
  @media screen and (max-width: 769px) {
    padding: 3rem 1.5rem 0 1.5rem;
  }
`;

const Body = styled.div`
  @media screen and (max-width: 769px) {
    padding: 3rem 1.5rem;
  }
`;

const Markdown = styled.div`
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

  & h2,
  h3,
  h4,
  h5 {
    font-family: "Lato", sans-serif;
    color: #363636;
    display: inline-block;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  & h2 {
    font-size: calc(10px + 1.8vw);
    border-bottom: 2px solid #eaaa03;
  }

  & h3 {
    font-size: calc(10px + 1.2vw);
  }

  & p {
    font-family: "Open Sans", sans-serif;
    margin-bottom: 1rem;
  }

  & blockquote {
    margin-bottom: 1rem;
    padding-left: 3rem;
    color: grey;
  }

  a {
    color: #3298DC;
    border-bottom: 2px dotted #363636;
  }
`;

export default ({ data }) => {
  const {
    title,
    createdAt,
    image,
    body,
    projectfiles,
    series,
    seriesNum
  } = data.post;

  const { seriesNeighbors } = data;
  const excerpt = body.childMarkdownRemark.excerpt;
  const toc = body.childMarkdownRemark.tableOfContents;
  var beforePost = null;
  var afterPost = null;

  if (series) {
    for (var i = 0; i < seriesNeighbors.nodes.length; ++i) {
      if (seriesNum - 1 === i) {
        beforePost = seriesNeighbors.nodes[i];
      }
      if (seriesNum + 1 === i) {
        afterPost = seriesNeighbors.nodes[i];
      }
    }
  }

  return (
    <Layout>
      <style>
        {" "}
        @import
        url("https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Open+Sans&display=swap");
      </style>
      <SEO title={title} description={excerpt} />

      <Section className="section">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-6">
              <Frontmatter>
                <Title className={"title is-size-1 is-size-3-mobile"}>
                  {title}
                </Title>
                <div className="level is-mobile subtitle">
                  <div class="level-left">
                    <CreateDate createdAt={createdAt} />
                    <Series series={series} />
                  </div>
                </div>
              </Frontmatter>
            </div>
            <div className="column is-2 is-hidden-mobile" />
          </div>

          <div
            className={"columns is-variable is-5 is-centered " + styles.Columns}
          >
            {/* Main Article */}
            <div className="column is-6">
              <Img
                fluid={image ? image.fluid : ""}
                alt="Article Feature"
                style={{ marginBottom: "2vmin" }}
              />
              <Body>
                <Markdown className={styles.Markdown}>
                  {renderAst(body.childMarkdownRemark.htmlAst)}
                </Markdown>
              </Body>
              {(beforePost || afterPost) && (
                <div className="level">
                  <div className="level-right">
                    <div className="level-item">
                      {beforePost && (
                        <Link
                          to={"../" + beforePost.slug}
                          className={styles.SeriesNavInline}
                        >
                          <div className="level is-mobile">
                            <div className="level-item">
                              <FontAwesomeIcon icon={faChevronLeft} />
                            </div>
                            <div className="level-item">{beforePost.title}</div>
                          </div>
                        </Link>
                      )}{" "}
                    </div>
                  </div>
                  <div className="level-left">
                    <div className="level-item">
                      {afterPost && (
                        <Link
                          to={"../" + afterPost.slug}
                          className={styles.SeriesNavInline}
                        >
                          <div className="level is-mobile">
                            <div className="level-item">{afterPost.title}</div>
                            <div className="level-item">
                              <FontAwesomeIcon icon={faChevronRight} />
                            </div>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <hr
                style={{
                  marginTop: "8vmin",
                  marginBottom: "8vmin"
                }}
              />
              {/* Body - Comments */}
              <HyvorTalk.Embed websiteId={292} />
            </div>
            {/* Sidebar */}
            {(series || toc || projectfiles) && (
              <div className="column is-2 is-hidden-mobile">
                <Sidebar>
                  <TOC src={toc} />
                  <ProjectFiles src={projectfiles} />
                </Sidebar>
              </div>
            )}
          </div>
        </div>
      </Section>

      <ScrollUpButton
        ShowAtPosition={600}
        style={{
          color: "#EAAA03",
          justifyContent: "right",
          position: "fixed",
          right: "5vmin",
          bottom: "2vmin",
          WebkitTransition: "all 0.5s ease-in-out",
          transition: "all 0.5s ease-in-out",
          transitionProperty: "opacity, right",
          cursor: "pointer",

          opacity: 0,
          zIndex: 1000,
          fill: "#292929",
          paddingBottom: 1,
          paddingLeft: 1,
          paddingRight: 1
        }}
        ToggledStyle={{
          color: "#EAAA03",
          justifyContent: "right",
          position: "fixed",
          right: "5vmin",
          bottom: "2vmin",
          WebkitTransition: "all 0.5s ease-in-out",
          transition: "all 0.5s ease-in-out",
          transitionProperty: "opacity, right",
          cursor: "pointer",

          opacity: 100,
          zIndex: 1000,
          fill: "#292929",
          paddingBottom: 1,
          paddingLeft: 1,
          paddingRight: 1
        }}
      >
        <FontAwesomeIcon icon={faAngleUp} size="2x" />
      </ScrollUpButton>
    </Layout>
  );
};

export const postQuery = graphql`
  query($slug: String!, $series: String) {
    post: contentfulPost(slug: { eq: $slug }) {
      slug
      title
      createdAt
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      body {
        childMarkdownRemark {
          excerpt
          htmlAst
          headings {
            depth
            value
          }
          tableOfContents(absolute: false)
        }
      }
      projectfiles
      series
      seriesNum
    }
    seriesNeighbors: allContentfulPost(
      filter: { series: { eq: $series } }
      sort: { fields: seriesNum, order: ASC }
    ) {
      nodes {
        title
        slug
        seriesNum
      }
    }
  }
`;
