import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faClipboard,
  faLevelUpAlt
} from "@fortawesome/free-solid-svg-icons";

import Layout from "../shared/components/layout";
import SEO from "../shared/components/seo";
import { Sidebar, SidebarElement } from "../shared/components/sidebar";
import { Heading, SubHeading } from "../shared/components/typography";

import EditOnGithub from "./uspecifier/editongithub";
import Categories from "./uspecifier/incategory";
import CategoryNavInline from "./uspecifier/incategoryinline";
import SpecList from "./uspecifier/list";

const GlossaryLink = styled(Link)`
  margin-top: 1rem;

  display: flex;
  color: hsl(0, 0%, 71%);

  & #icon {
    margin-right: 0.5rem;
    transform: scale(-1, 1);
  }

  &:hover #icon {
    color: hsl(204, 86%, 53%);
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const BackToSearch = () => {
  return (
    <GlossaryLink to="/spectacle">
      <div className="level">
        <FontAwesomeIcon id="icon" icon={faLevelUpAlt} />
        <p>Search</p>
      </div>
    </GlossaryLink>
  );
};

const Type = ({ value }) => {
  return (
    value && (
      <span className="tag has-background-grey has-text-light is-medium">
        {value}
      </span>
    )
  );
};

const Meta = ({ value }) => {
  return (
    value && (
      <span className="tag has-background-grey-lighter is-medium">
        {value ? "Meta" : ""}
      </span>
    )
  );
};

const EarliestVersion = ({ versions }) => {
  versions.sort((a, b) => a.version > b.version);
  return (
    <span className="tag is-info is-medium">{`Since 4.${versions[0].version}`}</span>
  );
};

const SectionHeader = styled(SubHeading)`
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

const CopyRoot = styled.button`
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

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Copy = () => {
  return (
    <CopyRoot
      onClick={() => {
        navigator.clipboard.writeText(
          document.getElementById("code").innerText
        );
      }}
    >
      <FontAwesomeIcon icon={faClipboard} size="lg" />
    </CopyRoot>
  );
};

const CodeWrapper = styled.div`
  position: relative;

  display: flex;
  width: 100%;
  justify-content: left;
  margin-top: 1rem;
  font-style: italic;

  overflow: hidden;
  &:hover {
    overflow: auto;
  }

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

const Code = ({ keyFriendly, meta, values }) => {
  var code = (
    <>
      {/* Meta (optional) */}
      {meta && (
        <>
          <div className="meta">meta</div>
          <div className="equal">=</div>
          <div className="left paren">(</div>
        </>
      )}
      {/* Key */}
      {<div className="key">{keyFriendly}</div>}
      {/* Value(s) (optional) */}
      {values && typeof values === "string" && (
        <>
          <div className="equal">=</div>
          {meta && <div className="quote">"</div>}
          <div className="value">{values}</div>
          {meta && <div className="quote">"</div>}
        </>
      )}
      {values && Array.isArray(values) && values.length > 0 && (
        <>
          <div className="equal">=</div>
          {meta ? (
            <div className="quote">"</div>
          ) : (
            <div className="left paren">{"("}</div>
          )}
          {values.map((value, index) => {
            return (
              <React.Fragment key={value}>
                {index > 0 ? <div className="comma">,</div> : null}
                <div className="value">{value}</div>
              </React.Fragment>
            );
          })}
          {meta ? (
            <div className="quote">"</div>
          ) : (
            <div className="right paren">{")"}</div>
          )}
        </>
      )}
      {/* Meta (optional) */}
      {meta && (
        <>
          <div className="right paren">)</div>
        </>
      )}
    </>
  );

  return (
    <CodeWrapper className="code" id="code">
      {code}
    </CodeWrapper>
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

const Header = styled(SubHeading)`
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

const Examples = ({ occ }) => {
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
      <div className="level is-mobile">
        <div className="level-left">
          <div className="level-item">
            <Header>Found In</Header>
          </div>
        </div>

        <div className="level-right">
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
                  <div className="has-text-info">{prettyVersion(version)}</div>
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
                        key={version}
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
            <li key={file}>
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
  const { specifier, local, category, mirrors, combos, mutex } = data;
  const { type, keyFriendly, meta, occ } = specifier;
  const { childMarkdownRemark, relativePath } = local || {};
  const { analysis, frontmatter } = childMarkdownRemark || {};
  const { snippet, values } = frontmatter || {};

  var neighbors = findCategoryNeighbors(specifier, category);

  return (
    <>
      <SEO
        title={`${keyFriendly} | U${
          type === "EnumMeta" ? "Meta" : type
        } Specifier`}
        description={snippet}
      />
      <Layout>
        <section className="section">
          <div className="container">
            <div className="columns is-variable is-centered is-5">
              <div className="column is-1 is-hidden-mobile">
                <BackToSearch />
              </div>
              <div className="column is-6">
                <Heading className="title is-size-1 is-size-3-mobile">
                  {keyFriendly}
                </Heading>
                <div className="tags">
                  <Type value={type} />
                  <Meta value={meta} />
                  <EarliestVersion versions={occ.versions} />
                  {relativePath && (
                    <span className="tag is-large">
                      <EditOnGithub
                        branch="master"
                        path={`src/content/uspecifiers/`}
                      />
                    </span>
                  )}
                </div>
                {analysis ? (
                  <Analysis
                    dangerouslySetInnerHTML={{
                      __html: analysis
                    }}
                  />
                ) : (
                  <div>Analysis coming soon...</div>
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
                  {mirrors && mirrors.nodes.length > 0 && (
                    <SidebarElement intrinsic>
                      <SpecList
                        label="Mirrors"
                        specifiers={mirrors}
                        field="type"
                      />
                    </SidebarElement>
                  )}
                  {combos && combos.nodes.length > 0 && (
                    <SidebarElement intrinsic>
                      <SpecList
                        label="Pairs With"
                        specifiers={combos}
                        field="keyFriendly"
                      />
                    </SidebarElement>
                  )}
                  {mutex && mutex.nodes.length > 0 && (
                    <SidebarElement intrinsic>
                      <SpecList
                        label="Excludes"
                        specifiers={mutex}
                        field="keyFriendly"
                      />
                    </SidebarElement>
                  )}
                  {category && category.nodes.length > 0 && (
                    <SidebarElement grow>
                      <Categories type={type} category={category} />
                    </SidebarElement>
                  )}
                </Sidebar>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export const query = graphql`
  query(
    $id: String!
    $key: String!
    $type: String!
    $slug: String!
    $combos: [String!]!
    $mutex: [String!]!
  ) {
    specifier: contentfulUnrealSpecifier(id: { eq: $id }) {
      id
      type
      keyFriendly
      meta
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
    local: file(name: { eq: $slug }) {
      childMarkdownRemark {
        analysis: html
        frontmatter {
          snippet
          values
        }
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
    mirrors: allContentfulUnrealSpecifier(
      filter: { key: { eq: $key }, type: { ne: $type } }
    ) {
      nodes {
        type
        slug
      }
    }
    combos: allContentfulUnrealSpecifier(filter: { slug: { in: $combos } }) {
      nodes {
        keyFriendly
        slug
      }
    }
    mutex: allContentfulUnrealSpecifier(filter: { slug: { in: $mutex } }) {
      nodes {
        keyFriendly
        slug
      }
    }
  }
`;
