import React from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import rehypeReact from "rehype-react";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Sidebar from "../components/sidebar";
import CategoryNav from "../components/glossary/categorynav";
import CategoryNavInline from "../components/glossary/categorynavinline";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faLevelUpAlt
} from "@fortawesome/free-solid-svg-icons";

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
      return <pre id={id}>{props.children}</pre>;
    }
  }
}).Compiler;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  -webkit-transform:scale(-1, 1);
`

const TermName = styled.h1`
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

const SectionHeader = styled.h2`
  ${'' /* font-family: "Lato", sans-serif; */}
  font-family: 'Bungee', cursive;
  color: #363636;
  display: inline-block;
  margin-top: 2rem;
  margin-bottom: 1rem;

  font-size: calc(10px + 1.4vw);
  border-bottom: 2px solid hsl(204, 86%, 53%);
`;

const Analysis = styled.div`
  & p {
    font-family: "Open Sans", sans-serif;
    margin-bottom: 1rem;
  }

  p > code,
  ul > code,
  ol > code {
    ${'' /* background-color: rgb(250, 242, 242);
    color: rgb(53, 142, 184);
    border-radius: 0.3em; */}
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
`;

const CodeSample = styled.div`
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
`;

const Example = styled.a`
  justify-content: flex-start;
  color: black;
  &:hover {
    color: rgb(50, 115, 220) !important;
  }
`;

const InlineCategoryNavWrapper = styled.div`
  margin-top: 5rem;
`;

function findCategoryNeighbors(term, category) {
  var ret = {};

  if (term && category) {
    category = category.references;
    const termIndex = category.findIndex(element => element.id === term.id);

    const previousTermIndex = termIndex - 1;
    ret.previous =
      category[previousTermIndex] !== void 0
        ? category[previousTermIndex]
        : null;

    const nextTermIndex = termIndex + 1;
    ret.next =
      category[nextTermIndex] !== void 0 ? category[nextTermIndex] : null;
  }

  return ret;
}

const BackToGlossaryText = styled.p`
  color: black;
  margin-left: 4px;
`;

export default ({ data }) => {
  const { term, category } = data;
  const { name, description, analysis, codeSample, examples } = term;

  var neighbors = findCategoryNeighbors(term, category);

  return (
    <Layout>
      <SEO title={`${name} | ${category.name}`} description={description} />
      <Helmet>
        <style>
          @import
          url("https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Open+Sans&display=swap");
        </style>
      </Helmet>
      <section className="section">
        <div className="container">
          <div className="columns is-variable is-centered is-5">
            <Link
              className="column is-1"
              to="/glossary"
              style={{ display: "flex" }}
            >
              <StyledFontAwesomeIcon icon={faLevelUpAlt} />
              <BackToGlossaryText>Glossary</BackToGlossaryText>
            </Link>
            <div className="column is-6">
              <TermName className="title is-size-1 is-size-3-mobile">
                {name}
              </TermName>
              {analysis && (
                <Analysis
                  dangerouslySetInnerHTML={{
                    __html: analysis.childMarkdownRemark.html
                  }}
                />
              )}
              <SectionHeader>Code</SectionHeader>
              {codeSample && (
                <CodeSample>
                  {renderAst(codeSample.childMarkdownRemark.htmlAst)}
                </CodeSample>
              )}
              {examples && (
                <>
                  <SectionHeader>Examples</SectionHeader>
                  <ul>
                    {examples.items.map(({ name, url }) => {
                      return (
                        <li>
                          <Example
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button is-light is-fullwidth"
                          >
                            {name}
                            <spacer style={{ flex: "1 1 0px" }} />
                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                          </Example>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
              <InlineCategoryNavWrapper className="level is-mobile">
                <div className="level-left">
                  <CategoryNavInline
                    term={neighbors.previous}
                    className="level-item"
                  />
                </div>
                <div className="level-right">
                  <CategoryNavInline
                    term={neighbors.next}
                    next
                    className="level-item"
                  />
                </div>
              </InlineCategoryNavWrapper>
            </div>
            <div className="column is-2 is-hidden-mobile">
              <Sidebar>
                <CategoryNav category={category} />
              </Sidebar>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!, $categoryId: String!) {
    term: contentfulDefinedTerm(id: { eq: $id }) {
      id
      name
      description
      analysis {
        childMarkdownRemark {
          html
        }
      }
      codeSample {
        childMarkdownRemark {
          html
          htmlAst
        }
      }
      examples {
        items {
          name
          url
        }
      }
    }
    category: contentfulList(id: { eq: $categoryId }) {
      name
      references {
        id
        name
        slug
      }
    }
  }
`;
