import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
// import rehypeReact from "rehype-react";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";
import EditOnGithub from "../components/editongithub";
import Sidebar from "../components/sidebar";
import CategoryNav from "../components/glossary/categorynav";
import CategoryNavInline from "../components/glossary/categorynavinline";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faClipboard,
  faLevelUpAlt
} from "@fortawesome/free-solid-svg-icons";

/* Header id formatter. */
// const format = string => {
//   const regex = /,|\./gi;
//   const spacesregex = /\s/gi;
//   var processed = String(string).toLowerCase();
//   processed = processed.replace(regex, "");
//   processed = processed.replace(spacesregex, "-");
//   return processed;
// };

// var codeblockId = 0;

/* Used to demote headers and do other html processing. */
// const renderAst = new rehypeReact({
//   createElement: React.createElement,
//   components: {
//     h1: props => <h2 id={format(props.children[0])}>{props.children}</h2>,
//     h2: props => <h3 id={format(props.children[0])}>{props.children}</h3>,
//     h3: props => <h4 id={format(props.children[0])}>{props.children}</h4>,
//     h4: props => <h5 id={format(props.children[0])}>{props.children}</h5>,
//     h5: props => <h6 id={format(props.children[0])}>{props.children}</h6>,
//     pre: props => {
//       var id = "codeblock" + ++codeblockId;
//       return <pre id={id}>{props.children}</pre>;
//     }
//   }
// }).Compiler;

const BackToGlossary = () => {
  const StyledLink = styled(Link)`
    display: flex;
    color: hsl(0, 0%, 71%);

    & #icon {
      margin-right: 0.5rem;
      transform: scale(-1, 1);
    }

    &:hover #icon {
      color: hsl(204, 86%, 53%);
    }
  `;

  return (
    <StyledLink to="/glossary">
      <div class="level">
        <FontAwesomeIcon id="icon" icon={faLevelUpAlt} />
        <p>Glossary</p>
      </div>
    </StyledLink>
  );
};

const Key = styled.h1`
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

const Type = ({ value }) => {
  return value && <span className="tag is-dark is-medium">{value}</span>;
};

const Meta = ({ value }) => {
  return (
    value && (
      <span className="tag is-success is-medium">{value ? "Meta" : ""}</span>
    )
  );
};

const EarliestVersion = ({ versions }) => {
  versions.sort((a, b) => a.version > b.version);
  return (
    <span className="tag is-info is-medium">{`4.${versions[0].version}+`}</span>
  );
};

const SectionHeader = styled.h2`
  ${"" /* font-family: "Lato", sans-serif; */}
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
    ${"" /* background-color: rgb(250, 242, 242);
    color: rgb(53, 142, 184);
    border-radius: 0.3em; */}
    color: #0c1c38;
    border-radius: 0.3em;
    ${"" /* border-bottom: 2px solid hsl(0, 0%, 71%); */}
    background: #dfe8f7;

    @media screen and (max-width: 769px) {
      padding: 1vmin;
    }

    @media screen and (min-width: 770px) {
      padding: 0.5vmin;
    }
  }
`;

const Copy = () => {
  const Root = styled.button`
    display: inline-block;
    margin-left: 1rem;
    height: 2.5rem;
    width: 2.5rem;

    color: hsl(0, 0%, 71%);
    background-color: hsl(0, 0%, 96%);
    border: none;
    border-radius: 0.3rem;

    &:hover {
      color: hsl(0, 0%, 29%);
      background-color: hsl(0, 0%, 92%);
    }

    cursor: pointer;
  `;

  return (
    <Root
      onClick={() => {
        navigator.clipboard.writeText(
          document.getElementById("code").innerText
        );
      }}
    >
      <FontAwesomeIcon icon={faClipboard} size="lg" />
    </Root>
  );
};

const Code = ({ keyFriendly, meta, values }) => {
  var code = (
    <>
      {meta && (
        <>
          <div className="meta">meta</div>
          <div className="equal">=</div>
          <div className="left paren">(</div>
        </>
      )}
      {<div className="key">{keyFriendly}</div>}
      {values && values.length > 0 && (
        <>
          <div className="equal">=</div>
          {meta ? (
            <div className="quote">"</div>
          ) : (
            <div className="left paren">{"("}</div>
          )}
          {values.map((value, index) => {
            return (
              <>
                {index > 0 ? <div className="comma">,</div> : null}
                <div className="value">{value}</div>
              </>
            );
          })}
          {meta ? (
            <div className="quote">"</div>
          ) : (
            <div className="right paren">{")"}</div>
          )}
        </>
      )}
      {meta && (
        <>
          <div className="right paren">)</div>
        </>
      )}
    </>
  );

  const Wrapper = styled.div`
    position: relative;

    display: flex;
    width: 100%;
    justify-content: left;
    margin-top: 1rem;
    font-size: 18px;
    ${"" /* font-weight: 600; */}
    font-style: italic;
    margin-left: 2rem;
    .code {
      display: flex;
    }

    & .key {
    }

    & .meta {
    }

    & .equal {
      margin: 0 0.5rem;
      color: hsl(204, 86%, 53%);
    }

    & .paren {
      color: hsl(171, 100%, 41%);
    }

    & .paren.left {
      margin-right: 0.5rem;
    }

    & .paren.right {
      margin-left: 0.5rem;
    }

    & .value {
      color: #257bc2;
    }

    & .comma {
      margin-right: 0.5rem;
      color: grey;
    }

    & .copy {
      visibility: hidden;
    }

    &:hover .copy {
      visibility: visible;
    }
  `;

  return (
    <Wrapper class="code" id="code">
      {code}
    </Wrapper>
  );
};

const Example = ({ file, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="button is-light"
      style={{ justifyContent: "flex-start" }}
    >
      <div>{file}</div>
      {/* {active && <FontAwesomeIcon id="icon" icon={faExternalLinkAlt} />} */}
    </a>
  );
};

const InlineCategoryNavWrapper = styled.div`
  margin-top: 5rem;
`;

function findCategoryNeighbors(specifier, category) {
  var neighbors = {};

  if (specifier && category) {
    category = category.nodes;
    const specifierIndex = category.findIndex(
      element => element.id === specifier.id
    );

    const previousSpecifierIndex = specifierIndex - 1;
    neighbors.previous =
      category[previousSpecifierIndex] !== void 0
        ? category[previousSpecifierIndex]
        : null;

    const nextSpecifierIndex = specifierIndex + 1;
    neighbors.next =
      category[nextSpecifierIndex] !== void 0
        ? category[nextSpecifierIndex]
        : null;
  }

  return neighbors;
}

const Examples = ({ occ }) => {
  const Header = styled.h3`
    font-family: "Bungee", cursive;
    color: #363636;
    display: inline-block;
    margin: 0;

    font-size: calc(10px + 1.4vw);
    border-bottom: 2px solid hsl(204, 86%, 53%);
  `;

  const DropdownMenu = styled.div`
    min-width: 2rem !important;
    height: 30vh;

    overflow-x: visible;
    overflow-y: scroll;
    scrollbar-width: none;

    & .dropdown-item:hover {
      border-left: solid 2px hsl(204, 86%, 53%);
    }
  `;

  var { versions } = occ;
  versions.sort((a, b) => {
    return a.version < b.version;
  });

  const [version, setVersion] = useState(versions[0].version);
  const [open, setOpen] = useState(false);

  const prettyVersion = version => {
    return "4." + version;
  };

  const prettyFile = file => {
    const elems = file.split("/");
    return elems[elems.length - 1].split(".")[0];
  };

  const data = versions.find(({ version: v }) => v === version);

  return (
    <div style={{ marginTop: "2rem" }}>
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <Header>Found In</Header>
          </div>
        </div>

        <div class="level-right">
          <div className="level-item">
            <div
              className={"dropdown " + (open ? "is-active" : "")}
              onMouseLeave={() => setOpen(false)}
              role="menu"
              tabIndex={0}
            >
              <div className="dropdown-trigger">
                <button
                  className="button is-light"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu"
                  onMouseEnter={() => setOpen(true)}
                >
                  <div class="has-text-info">{prettyVersion(version)}</div>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    style={{ marginLeft: "2rem" }}
                  />
                </button>
              </div>
              <DropdownMenu
                className="dropdown-menu has-background-light"
                id="dropdown-menu"
                role="menu"
                style={{
                  minWidth: "2rem !important",
                  height: "15vh",
                  overflow: "scroll"
                }}
              >
                <div className="dropdown-content has-background-light">
                  {occ.versions.map(({ version }) => {
                    return (
                      <a
                        href={`#${version}`}
                        value={version}
                        onClick={() => {
                          setVersion(version);
                          setOpen(false);
                        }}
                        className="dropdown-item"
                      >
                        {prettyVersion(version)}
                      </a>
                    );
                  })}
                </div>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <ul className="buttons" style={{ width: "30vw" }}>
        {data.items.map(({ file }) => {
          return (
            <li>
              <Example
                file={prettyFile(file)}
                url={`https://github.com/EpicGames/UnrealEngine/tree/${prettyVersion(
                  data.version
                )}/${file}`}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ({ data }) => {
  const { specifier, analysis, category } = data;
  const { type, keyFriendly, meta, values, snippet, occ } = specifier;

  console.log(analysis);

  var neighbors = findCategoryNeighbors(specifier, category);

  return (
    <Layout>
      <SEO title={`${keyFriendly} | ${type}`} description={snippet} />
      <Helmet>
        <style>
          @import
          url("https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Open+Sans&display=swap");
        </style>
      </Helmet>
      <section className="section">
        <div className="container">
          <div className="columns is-variable is-centered is-5">
            <div class="column is-1">
              <BackToGlossary />
            </div>
            <div className="column is-6">
              <div class="level is-mobile subtitle">
                <div class="level-left">
                  <div class="level-item">
                    <Key className="title is-size-1 is-size-3-mobile">
                      {keyFriendly}
                    </Key>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item"></div>
                </div>
              </div>
              <div class="tags">
                <Type value={type} />
                <Meta value={meta} />
                <EarliestVersion versions={occ.versions} />
                <span class='tag is-large'>
                  <EditOnGithub
                    branch="spectacle"
                    path={`src/content/uspecifiers/${analysis.relativePath}`}
                  />
                </span>
              </div>
              {analysis && (
                <Analysis
                  dangerouslySetInnerHTML={{
                    __html: analysis.childMarkdownRemark.html
                  }}
                />
              )}
              {keyFriendly && (
                <>
                  <SectionHeader>Form</SectionHeader>
                  <Copy />
                  <Code
                    className="level is-centered"
                    keyFriendly={keyFriendly}
                    meta={meta}
                    values={values}
                  />
                </>
              )}
              {occ && (
                <>
                  <Examples occ={occ} />
                </>
              )}
              <InlineCategoryNavWrapper className="level is-mobile">
                <div className="level-left">
                  <CategoryNavInline
                    specifier={neighbors.previous}
                    className="level-item"
                  />
                </div>
                <div className="level-right">
                  <CategoryNavInline
                    specifier={neighbors.next}
                    next
                    className="level-item"
                  />
                </div>
              </InlineCategoryNavWrapper>
            </div>
            <div className="column is-2 is-hidden-mobile">
              <Sidebar>
                <CategoryNav type={type} category={category} />
              </Sidebar>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!, $type: String!, $slug: String!) {
    specifier: contentfulUnrealSpecifier(id: { eq: $id }) {
      id
      type
      keyFriendly
      meta
      values
      snippet
      occ {
        versions {
          version
          items {
            count
            file
          }
        }
      }
    }
    analysis: file(name: { eq: $slug }) {
      childMarkdownRemark {
        html
      }
      relativePath
    }
    category: allContentfulUnrealSpecifier(
      filter: { type: { eq: $type } }
      sort: { fields: key, order: ASC }
    ) {
      nodes {
        id
        keyFriendly
        slug
      }
    }
  }
`;
