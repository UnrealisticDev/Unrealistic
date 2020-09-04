import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import rehypeReact from "rehype-react";
import HyvorTalk from "hyvor-talk-react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Sidebar from "../components/sidebar";
import SeriesNav from "../components/seriesnav";
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
import styles from "./article.module.scss";

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
            className="button is-light"
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

export default ({ data }) => {

  const {
    title,
    image,
    body,
    projectfiles,
    series,
    seriesNum
  } = data.contentfulBlogPost;

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
      <SEO title={title} description={excerpt} />
      <section className={"section " + styles.MainSection}>
        <div className="container">
          <div className={"columns " + styles.Columns}>
            {/* Main Article */}
            <div className="column is-8">
              <div className="box has-background-light is-paddingless">
                <div className="card">
                  {/* Frontmatter */}
                  <div className={styles.FrontmatterContainer}>
                    {/* Feature image */}
                    <Img
                      fluid={image ? image.fluid : ""}
                      alt="Article Feature"
                    />
                    {/* Title */}
                    <h1 className={"title has-background-dark " + styles.Title}>
                      {title}
                    </h1>
                  </div>
                  {/* Body */}
                  <div className="card-content">
                    <div className="content">
                      {/* Body - Markdown */}
                      {
                        <div className={styles.Markdown}>
                          {renderAst(body.childMarkdownRemark.htmlAst)}
                        </div>
                      }
                      {/* Body - Series - Previous/Next */}
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
                                    <div className="level-item">
                                      {beforePost.title}
                                    </div>
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
                                    <div className="level-item">
                                      {afterPost.title}
                                    </div>
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
                  </div>
                </div>
              </div>
            </div>
            {/* Sidebar */}
            {(series || toc || projectfiles) && (
              <div className="column is-3 is-hidden-mobile">
                <Sidebar>
                  <SeriesNav
                    series={series}
                    seriesNeighbors={seriesNeighbors.nodes}
                    beforePost={beforePost}
                    afterPost={afterPost}
                    startNum={seriesNeighbors.nodes[0].seriesNum}
                  />
                  <TOC src={toc} />
                  <ProjectFiles src={projectfiles} />
                </Sidebar>
              </div>
            )}
          </div>
        </div>
      </section>
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
  query($pagePath: String!, $pageSeries: String) {
    contentfulBlogPost(slug: { eq: $pagePath }) {
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
    seriesNeighbors: allContentfulBlogPost(
      filter: { series: { eq: $pageSeries } }
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
