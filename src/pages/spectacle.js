import React, { useState } from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";

import { connectHits, InstantSearch } from "react-instantsearch-dom";
import searchClient from "../components/search/client";
import SearchBox from "../components/search/searchbox";

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

  margin-bottom: 5vh !important;
`;

const SSearchBox = styled(SearchBox)`
  width: 50vw;
  margin-bottom: 1rem;
`;

const HitType = styled.h1``;

const Hit = ({ hit }) => {
  return (
    <Link id={hit.id} to={`/glossary/${hit.slug}`} className="button">
      {hit.keyFriendly}
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

const SearchResults = ({ hits }) => {
  return (
    <div className="columns is-multiline">
      {types.map(type => {
        var hitsOfType = hits.filter(hit => {
          return hit.type === type;
        });
        return (
          hitsOfType.length > 0 && (
            <div className="column is-3">
              <HitType>{type}</HitType>
              <ul>
                {hitsOfType.map(hit => {
                  return <Hit hit={hit} key={hit.id} />;
                })}
              </ul>
            </div>
          )
        );
      })}
    </div>
  );
};

const CSearchResults = connectHits(SearchResults);

const Searchbar = () => {
  const [, setQuery] = useState();
  const [hasFocus, setFocus] = useState(false);

  return (
    <InstantSearch
      searchClient={searchClient()}
      indexName="UnrealSpecifiers"
      onSearchStateChange={({ query }) => setQuery(query)}
    >
      <SSearchBox
        onFocus={() => setFocus(true)}
        placeholder={"BlueprintReadWrite"}
      />
      <CSearchResults />
    </InstantSearch>
  );
};

export default () => {
  return (
    <>
      <Helmet></Helmet>
      <Layout>
        <SEO
          title="Spectacle"
          description="Search for class, struct, property and other specifiers for Unreal Engine 4, all in one place."
        />
        <section className="hero is-fullheight-with-navbar">
          <div className="hero-body">
            <div class="container">
              <Title className="title is-1 has-text-centered">Spectacle</Title>
              <Searchbar />
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};
