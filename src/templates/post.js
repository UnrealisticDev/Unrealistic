import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import rehypeReact from "rehype-react";
import HyvorTalk from "hyvor-talk-react";
import ScrollUpButton from "react-scroll-up-button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleUp,
  faAngleDown,
  faCopy,
  faArrowRight,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

import router from "../shared/scripts/router";
import Layout from "../shared/components/layout";
import SEO from "../shared/components/seo";
import { Sidebar, SidebarElement } from "../shared/components/sidebar";
import { Heading, SubHeading, Text } from "../shared/components/typography";

import FurtherReading from "./post/furtherreading";
import TableOfContents from "./post/tableofcontents";
import SeriesNav from "./post/seriesnav";
import ProjectFiles from "./post/projectfiles";

import "../styles/code.scss";

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
    h1: props => (
      <SubHeading id={format(props.children[0])}>{props.children}</SubHeading>
    ),
    h2: props => (
      <SubHeading as="h3" id={format(props.children[0])}>
        {props.children}
      </SubHeading>
    ),
    h3: props => (
      <SubHeading as="h4" id={format(props.children[0])}>
        {props.children}
      </SubHeading>
    ),
    h4: props => (
      <SubHeading as="h5" id={format(props.children[0])}>
        {props.children}
      </SubHeading>
    ),
    h5: props => (
      <SubHeading as="h6" id={format(props.children[0])}>
        {props.children}
      </SubHeading>
    ),
    p: props => <Text>{props.children}</Text>,
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

const Series = ({ series }) => {
  return series ? (
    <>
      <div className="level-item">·</div>
      <div className="level-item">
        <p className="subtitle is-size-6">{series.title}</p>
      </div>
    </>
  ) : null;
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
  @media screen and (max-width: 768px) {
    padding: 3.75rem 2rem 1rem 2.25rem;
  }
`;

const Body = styled.div``;

const Markdown = styled.div`
  @media screen and (max-width: 768px) {
    padding: 1.75rem;
  }
  & h2,
  h3,
  h4,
  h5 {
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
  ol > code,
  ul code,
  ol code {
    color: #0c1c38;
    border-radius: 0.3em;
    background: #dfe8f7;

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
  @media screen and (max-width: 768px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
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

export default ({ data }) => {
  const { post, furtherReading } = data;
  const {
    slug,
    title,
    excerpt,
    createdAt,
    updatedAt,
    image,
    body,
    topicTags,
    projectfiles,
    fields
  } = post;

  const { series } = fields || {};

  const sanitizedTitle = sanitizeTitle(title, series);
  const description = excerpt || body.childMarkdownRemark.excerpt;
  const tableOfContents = body.childMarkdownRemark.tableOfContents;

  const neighbors = findSeriesNeighbors(post, series);

  return (
    <>
      <SEO
        title={series ? `${sanitizedTitle} | ${series.title}` : title}
        description={description}
        canonical={router.getPostSlug(slug)}
        image={image.file.url}
        type="BlogPosting"
        datePublished={createdAt}
        dateModified={updatedAt}
      />
      <Layout>
        <Section className="section">
          <div className="container">
            <div className="columns is-multiline">
              <Frontmatter className="column is-half is-offset-2">
                <Heading className="title is-size-1 is-size-3-mobile">
                  {sanitizeTitle(title, series)}
                </Heading>
                <div className="level is-mobile subtitle">
                  <div className="level-left">
                    <CreateDate createdAt={createdAt} />
                    <Series series={series} />
                    <StyledTopicTags tags={topicTags} />
                  </div>
                </div>
              </Frontmatter>
              <Body className="column is-two-thirds is-offset-2">
                <div class="columns">
                  <div className="column is-9">
                    <Img
                      fluid={image && image.fluid}
                      alt="Article Feature"
                      style={{ marginBottom: "2vmin" }}
                    />
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
                    <Separator />
                    {furtherReading && (
                      <FurtherReading posts={furtherReading} />
                    )}
                    <Separator />
                    <HyvorTalk.Embed websiteId={292} />
                  </div>
                  {/* Sidebar */}
                  {(series || tableOfContents || projectfiles) && (
                    <Sidebar
                      height="auto"
                      className="column is-3 pl-5 is-hidden-mobile"
                    >
                      {tableOfContents && (
                        <SidebarElement intrinsic>
                          <TableOfContents src={tableOfContents} />
                        </SidebarElement>
                      )}
                      {series && (
                        <SidebarElement intrinsic>
                          <SeriesNav series={series} />
                        </SidebarElement>
                      )}
                      {projectfiles && (
                        <SidebarElement intrinsic>
                          <ProjectFiles link={projectfiles} />
                        </SidebarElement>
                      )}
                    </Sidebar>
                  )}
                </div>
              </Body>
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
    </>
  );
};

export const query = graphql`
  query($id: String!) {
    post: contentfulPost(id: { eq: $id }) {
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
      fields {
        series {
          title
          posts {
            id
            title
            slug
          }
        }
      }
    }
    furtherReading: allContentfulPost(
      filter: { fields: { series: { id: { eq: null } } }, id: { ne: $id } }
      sort: { fields: createdAt, order: DESC }
    ) {
      nodes {
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
`;
