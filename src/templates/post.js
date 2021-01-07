import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import Helmet from "react-helmet";
import styled from "styled-components";
import rehypeReact from "rehype-react";
import HyvorTalk from "hyvor-talk-react";

import router from "../scripts/router";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Sidebar from "../components/sidebar";
import TOC from "../components/toc";
import SeriesNav from "../components/seriesnav";
import ProjectFiles from "../components/projectfiles";
import ScrollUpButton from "react-scroll-up-button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faCopy,
  faArrowRight,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

import "../styles/code.scss";

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
    h5: props => <h6 id={format(props.children[0])}>{props.children}</h6>,
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
    <div className="level-item">
      <p className="subtitle is-size-6">{dateFormatted}</p>
    </div>
  );
};

function sanitizeTitle(title, series) {
  return series ? title.replace(series.title.concat(": "), "") : title;
}

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
        <div className="level-item">
          <p className="subtitle is-size-6">{series.title}</p>
        </div>
      </>
    )
  );
};

const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const TopicTags = ({ tags }) => {
  return (
    tags && (
      <>
        <div className="level-item" style={{ marginRight: "0px" }}>
          ·
        </div>
        <div className="level-item">
          <div className="subtitle is-size-6 dropdown is-hoverable is-light">
            {" "}
            <div className="dropdown-trigger">
              <button
                className="button is-light"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span>{capitalize(tags[0])}</span>
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faAngleDown} />
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                {tags.map(tag => {
                  return (
                    <div href="#" className="dropdown-item">
                      {capitalize(tag)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

const StyledTopicTags = styled(TopicTags)``;

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
  & h2,
  h3,
  h4,
  h5 {
    ${"" /* font-family: "Lato", sans-serif; */}
    font-family: 'Bungee', cursive;
    color: #363636;
    display: inline-block;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  & h2 {
    font-size: calc(10px + 1.8vw);
    border-bottom: 2px solid hsl(204, 86%, 53%);
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

  a:not(.gatsby-resp-image-link) {
    color: #3298dc;
    border-bottom: 2px dotted #363636;
  }

  ul,
  ol {
    margin-left: 2rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: square;
  }

  li {
    padding-left: 3vmin;
  }

  pre {
    position: relative;

    button {
      position: absolute;
      top: 0;
      right: 0;
    }

    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  p > code,
  ul > code,
  ol > code {
    ${"" /* background-color: hsl(0, 0%, 86%); */}
    color: #135d8f;
    border-radius: 0.3em;
    border-bottom: 2px solid hsl(0, 0%, 71%);

    @media screen and (max-width: 769px) {
      padding: 1vmin;
    }

    @media screen and (min-width: 770px) {
      padding: 0.5vmin;
    }
  }

  table {
    margin-bottom: 1rem;
  }
`;

const SeriesNavWrapper = styled.div`
  margin-top: 3rem;
`;

const SeriesNavLink = styled(Link)`
  display: flex;
  align-items: center;
  flex-direction: ${props => (props.next === true ? "row-reverse" : "row")};
  p {
    display: inline-block;
    color: #363636;
    white-space: nowrap;
  }
`;

const SeriesNavInline = ({ post, next, series }) =>
  post && (
    <SeriesNavLink
      to={router.getPostSlug(post.slug)}
      next={next ? true : false}
    >
      <FontAwesomeIcon
        icon={next ? faArrowRight : faArrowLeft}
        style={{ flex: "0 0 28px" }}
      />
      <p className="is-hidden-mobile">{sanitizeTitle(post.title, series)}</p>
    </SeriesNavLink>
  );

const Separator = styled.hr`
  margin-top: 5vmin;
  margin-bottom: 5vmin;
`;

const FurtherReadingBody = styled.div``;

const FurtherReadingPost = ({ post }) => {
  const StyledImg = styled(Img)`
    margin-bottom: 2vmin;
    @media screen and (max-width: 768px) {
      border-radius: 5px;
    }
  `;

  return (
    <FurtherReadingBody>
      <Link to={router.getPostSlug(post.slug)}>
        <StyledImg
          fluid={post.image ? post.image.fluid : ""}
          alt="Article Feature"
        />
        <div
          style={{
            textAlign: "left",
            color: "#363636",
            fontFamily: "'basic-sans', sans-serif",
            fontWeight: "300 !important"
          }}
        >
          {post.title}
        </div>
      </Link>
    </FurtherReadingBody>
  );
};

function findSeriesNeighbors(post, series) {
  var ret = {};

  if (post && series) {
    series = series.posts;
    const postIndex = series.findIndex(element => element.id === post.id);

    const beforePostIndex = postIndex - 1;
    ret.beforePost =
      series[beforePostIndex] !== void 0 ? series[beforePostIndex] : null;

    const afterPostIndex = postIndex + 1;
    ret.afterPost =
      series[afterPostIndex] !== void 0 ? series[afterPostIndex] : null;
  }

  return ret;
}

function getFurtherReading(furtherReading) {
  furtherReading = furtherReading.edges;
  var outPosts = [];

  if (furtherReading.length < 3) {
    outPosts = furtherReading;
  } else {
    var indices = [];
    while (indices.length < 3) {
      var r = Math.floor(Math.random() * (furtherReading.length - 1)) + 1;
      if (indices.indexOf(r) === -1) {
        indices.push(r);
      }
    }
    indices.forEach(i => {
      outPosts.push(furtherReading[i]);
    });
  }

  return outPosts;
}

export default ({ data, pageContext }) => {
  const { post, series, furtherReading } = data;
  const {
    slug,
    title,
    excerpt,
    createdAt,
    updatedAt,
    image,
    body,
    topicTags,
    projectfiles
  } = post;

  const sanitizedTitle = sanitizeTitle(title, series);
  const description = excerpt || body.childMarkdownRemark.excerpt;
  const toc = body.childMarkdownRemark.tableOfContents;

  const neighbors = findSeriesNeighbors(post, series);
  const furtherReadingPosts = getFurtherReading(furtherReading);

  return (
    <Layout>
      <Helmet>
        <style>
          @import
          url("https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Open+Sans&display=swap");
        </style>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Bungee&display=swap');
        </style>
      </Helmet>
      <SEO
        title={series ? `${sanitizedTitle} | ${series.title}` : title}
        description={description}
        canonical={router.getPostSlug(slug)}
        image={image.file.url}
        type="BlogPosting"
        datePublished={createdAt}
        dateModified={updatedAt}
      />

      <Section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-6">
              <Frontmatter>
                <Title className={"title is-size-1 is-size-3-mobile"}>
                  {sanitizeTitle(title, series)}
                </Title>
                <div className="level is-mobile subtitle">
                  <div className="level-left">
                    <CreateDate createdAt={createdAt} />
                    <Series series={series} />
                    <StyledTopicTags tags={topicTags} />
                  </div>
                </div>
              </Frontmatter>
            </div>
            <div className="column is-2 is-hidden-mobile" />
          </div>
          <div className={"columns is-variable is-5 is-centered"}>
            <div className="column is-6">
              <Img
                fluid={image ? image.fluid : ""}
                alt="Article Feature"
                style={{ marginBottom: "2vmin" }}
              />
              <Body>
                <Markdown>
                  {renderAst(body.childMarkdownRemark.htmlAst)}
                </Markdown>
                {neighbors && (
                  <SeriesNavWrapper className="level is-mobile">
                    <div className="level-right">
                      <div className="level-item">
                        {neighbors.beforePost && (
                          <SeriesNavInline
                            post={neighbors.beforePost}
                            series={series}
                          />
                        )}
                      </div>
                    </div>
                    <div className="level-left">
                      <div className="level-item">
                        {neighbors.afterPost && (
                          <SeriesNavInline
                            post={neighbors.afterPost}
                            next
                            series={series}
                          />
                        )}
                      </div>
                    </div>
                  </SeriesNavWrapper>
                )}
              </Body>
              <Separator />
              <div className="has-text-centered">
                <h2
                  style={{
                    marginBottom: "2rem",
                    fontWeight: "600",
                    fontFamily: "'Bungee', sans-serif",
                    fontSize: "22px"
                  }}
                >
                  Up Next
                </h2>
                <div className="columns">
                  {furtherReadingPosts.map(({ node }) => (
                    <div className="column is-4">
                      <FurtherReadingPost post={node}></FurtherReadingPost>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <HyvorTalk.Embed websiteId={292} />
            </div>
            {/* Sidebar */}
            {(series || toc || projectfiles) && (
              <div className="column is-2 is-hidden-mobile">
                <Sidebar>
                  <TOC src={toc} />
                  <SeriesNav series={series} />
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
          color: "hsl(204, 86%, 53%)",
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
          color: "hsl(204, 86%, 53%)",
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

export const query = graphql`
  query($slug: String!, $series: String!) {
    post: contentfulPost(slug: { eq: $slug }) {
      id
      slug
      title
      excerpt
      createdAt
      updatedAt
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
        file {
          url
        }
      }
      body {
        childMarkdownRemark {
          excerpt(pruneLength: 160)
          html
          htmlAst
          tableOfContents(absolute: false)
        }
      }
      topicTags
      projectfiles
    }

    series: contentfulSeries(id: { eq: $series }) {
      title
      posts {
        id
        title
        slug
      }
    }

    furtherReading: allContentfulPost(
      filter: { fields: { standalone: { eq: true } } }
      sort: { fields: createdAt, order: DESC }
    ) {
      edges {
        node {
          title
          slug
          image {
            fluid(maxWidth: 300) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`;
