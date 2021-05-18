import React, { useEffect, useState } from "react";
import { graphql, Link, navigate } from "gatsby";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import GitHubButton from "react-github-btn";
import { connectHits, InstantSearch } from "react-instantsearch-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faMugHot, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faAlgolia } from "@fortawesome/free-brands-svg-icons";

import Layout from "../components/shared/layout";
import Seo from "../components/shared/seo";
import { Heading, SubHeading } from "../components/shared/typography";
import searchClient from "../components/shared/search/client";
import SearchBox from "../components/shared/search/searchbox";
import HitCount, { countHit } from "../components/spectacle/hitcount";

const Title = styled(Heading)`
  margin-bottom: 5vh !important;
`;

const SearchBoxWrapper = styled.div`
  width: 100%;
  margin-right: 1rem;
`;

const SSearchBox = styled(SearchBox)`
  ${"" /* margin-bottom: 1rem; */}
`;

const HitType = styled(SubHeading)`
  display: inline-block;
  margin-top: 2rem;
  margin-bottom: 1rem;

  border-bottom: 2px solid hsl(204, 86%, 53%);
`;

const HitKey = styled.h3`
  margin-bottom: 0.5rem;

  color: #363636;
  &:hover {
    color: hsl(204, 86%, 53%);
  }
`;

const Hit = ({ hit }) => {
  return (
    <Link
      id={hit.id}
      to={`/glossary/${hit.slug}`}
      className=""
      style={{ display: "block" }}
      onClick={() => countHit()}
    >
      <HitKey>{hit.keyFriendly}</HitKey>
    </Link>
  );
};

const types = [
  "Class",
  "Struct",
  "Function",
  "Property",
  "Interface",
  "Enum",
  "EnumMeta"
];

const TypeWrapper = styled.ul`
  border-style: solid;
  border-width: 0px 2px 0px 2px;
  border-radius: 0.3rem;
  border-color: rgba(32, 156, 238, 0);

  &:hover {
    border-color: rgba(32, 156, 238, 100);
  }

  @media screen and (max-width: 768px) {
    border-style: none;
  }
`;

const RESULT_CHUNK_SIZE = 4;

const SearchResults = ({ hits }) => {
  return (
    <div className="columns is-multiline is-centered">
      {types.map(type => {
        var hitsOfType = hits.filter(hit => {
          return hit.type === type;
        });

        const chunks = [];
        for (var i = 0; i < hitsOfType.length; i += RESULT_CHUNK_SIZE) {
          chunks.push(hitsOfType.slice(i, i + RESULT_CHUNK_SIZE));
        }

        return (
          chunks.length > 0 && (
            <div className={`column is-${chunks.length * 3}`}>
              <HitType>{type}</HitType>
              <TypeWrapper className="columns">
                {chunks.map(chunk => (
                  <div className="column">
                    {chunk.map(hit => (
                      <Hit hit={hit} key={hit.id} />
                    ))}
                  </div>
                ))}
              </TypeWrapper>
            </div>
          )
        );
      })}
    </div>
  );
};

const CSearchResults = connectHits(SearchResults);

const CatalogLoader = props => {
  const [component, setComponent] = useState();
  useEffect(() => {
    setTimeout(() => setComponent(<Catalog {...props} />));
  }, [props]);

  return component || <div className="has-text-centered">Loading...</div>;
};

const Catalog = ({ specifiers }) => {
  return (
    <>
      {types.map(type => {
        var specifiersOfType = specifiers.filter(specifier => {
          return specifier.type === type;
        });

        const chunks = [];
        for (var i = 0; i < specifiersOfType.length; i += RESULT_CHUNK_SIZE) {
          chunks.push(specifiersOfType.slice(i, i + RESULT_CHUNK_SIZE));
        }

        return (
          chunks.length > 0 && (
            <>
              <HitType>{type}</HitType>
              <TypeWrapper className="columns is-multiline">
                {chunks.map(chunk => (
                  <div className="column is-3">
                    {chunk.map(specifier => (
                      <Hit hit={specifier} key={specifier.id} />
                    ))}
                  </div>
                ))}
              </TypeWrapper>
            </>
          )
        );
      })}
    </>
  );
};

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 3.25rem);
`;

const MainContainer = styled.div`
  flex-grow: 1;
  width: 100%;
`;

const ShoutoutContainer = styled.div`
  flex-grow: 0;
  width: 100%;

  margin-top: 2rem;
`;

const PoweredBy = styled.a`
  color: hsl(0, 0%, 71%);
  &:hover {
    color: hsl(204, 86%, 53%);
  }
`;

const BuyMeCoffee = styled.a`
  color: hsl(0, 0%, 71%);
  &:hover {
    color: hsl(204, 86%, 53%);
  }
`;

const Page = ({ data, location }) => {
  const {
    specifiers: { nodes: specifiers }
  } = data;
  const urlSearchTerms = location.search.split(/(\?)([^=]+)=([^&]+)/);

  const [, setFocus] = useState(false);
  const [query, setQuery] = useState();
  const [inCatalogMode, setCatalogMode] = useState(
    urlSearchTerms.includes("catalog") && urlSearchTerms.includes("true")
  );

  useEffect(() => {
    if (!inCatalogMode) document.getElementById("spec-searchbox").focus();
  });

  const randPlaceholder =
    specifiers[Math.floor(Math.random() * (specifiers.length - 1))].keyFriendly;

  return (
    <>
      <Helmet>
        <script async defer src="https://buttons.github.io/buttons.js"></script>
      </Helmet>
      <Seo
        title="Spectacle"
        description="Search for class, struct, property and other specifiers for Unreal Engine 4, all in one place."
      />
      <Layout>
        <MainSection className="section">
          <MainContainer className="container">
            <div class="level">
              <div class="level-left">
                <HitCount className="level-item" />
              </div>
              <div class="level-right">
                <div class="level-item" style={{ height: "2rem" }}>
                  <GitHubButton
                    href="https://github.com/UnrealisticDev/Spectacle"
                    data-icon="octicon-star"
                    data-show-count="false"
                    data-size="large"
                    aria-label="Star UnrealisticDev/Spectacle on GitHub"
                  >
                    Star
                  </GitHubButton>
                  {/* <iframe src="https://ghbtns.com/github-btn.html?user=UnrealisticDev&repo=Renom&type=star&count=true&size=large" frameborder="0" scrolling="0" width="170" height="30" title="GitHub"></iframe> */}
                </div>
              </div>
            </div>
            <InstantSearch
              searchClient={searchClient()}
              indexName="UnrealSpecifiers"
              onSearchStateChange={({ query }) => setQuery(query)}
            >
              <div class="columns is-centered">
                <div class="column is-half">
                  <Title className="title is-1 has-text-centered">
                    Spectacle
                  </Title>
                  <p className="subtitle has-text-centered">
                    The first <em>global</em> search for Unreal Engine 4
                    specifiers.
                  </p>
                  {/* <Searchbar /> */}
                  <div class="level is-mobile">
                    <SearchBoxWrapper class="level-item">
                      <SSearchBox
                        placeholder={randPlaceholder}
                        onFocus={() => setFocus(true)}
                        disabled={inCatalogMode}
                        id="spec-searchbox"
                        style={{ width: "100%" }}
                      />
                    </SearchBoxWrapper>
                    <div class="level-item">
                      <button
                        onClick={_ => {
                          setCatalogMode(!inCatalogMode);
                          navigate(`/spectacle?catalog=${!inCatalogMode}`, {
                            replace: true
                          });
                        }}
                        className="button is-light"
                        id="catalog-mode-toggle"
                      >
                        <FontAwesomeIcon
                          icon={inCatalogMode ? faSearch : faList}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {!inCatalogMode && query && query.length > 0 && (
                <CSearchResults />
              )}
              {inCatalogMode && <CatalogLoader specifiers={specifiers} />}
            </InstantSearch>
          </MainContainer>
          <ShoutoutContainer className="container">
            <div class="level is-mobile">
              <div class="level-left">
                <div class="level-item">
                  <BuyMeCoffee
                    className="level is-mobile"
                    href="https://www.buymeacoffee.com/mowgl33"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="level-item">
                      <FontAwesomeIcon icon={faMugHot} size="lg" />
                    </div>
                    <div className="level-item">Buy me coffee</div>
                  </BuyMeCoffee>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <PoweredBy
                    className="level is-mobile"
                    href="https://www.algolia.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div class="level-item">
                      <p>Powered by</p>
                    </div>
                    <div class="level-item">
                      <FontAwesomeIcon icon={faAlgolia} size="lg" />
                    </div>
                  </PoweredBy>
                </div>
              </div>
            </div>
          </ShoutoutContainer>
        </MainSection>
      </Layout>
    </>
  );
};

export default Page;

export const query = graphql`
  query {
    specifiers: allContentfulUnrealSpecifier(
      sort: { order: ASC, fields: key }
    ) {
      nodes {
        id
        type
        keyFriendly
        slug
      }
    }
  }
`;
