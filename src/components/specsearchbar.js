import React, { createRef, useState } from "react";
import algoliasearch from "algoliasearch";
import { connectSearchBox, InstantSearch } from "react-instantsearch-dom";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import SearchResult from "./search/searchresult";
import useClickOutside from "./search/clickoutside";

const Root = styled.div`
  position: relative;
`;

const TextEntry = styled.input`
  background-color: #dbdbdb !important;

  ::placeholder {
    color: #575754 !important;
  }
`;

const SearchBox = connectSearchBox(({ currentRefinement, refine, onFocus }) => {
  return (
    <form onSubmit={event => event.preventDefault()}>
      <div className="control has-icons-right is-expanded">
        <TextEntry
          className="input"
          type="text"
          placeholder="I want to learn about..."
          aria-label="Search"
          onChange={e => refine(e.target.value)}
          value={currentRefinement}
          onFocus={onFocus}
        />
        <span className="icon is-small is-right">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
    </form>
  );
});

const StyledSearchResult = styled(SearchResult)`
  position: absolute;
  right: 0;
`;

const searchClient = algoliasearch(
  `Y7ES67CX6H`,
  `96c36ce9095febfc8cd1d0ae87fa9a7d`
);

export default ({ indexName }) => {
  const rootRef = createRef();
  const [query, setQuery] = useState();
  const [hasFocus, setFocus] = useState(false);

  useClickOutside(rootRef, () => setFocus(false));

  return (
    <Root>
      <h1>React InstantSearch e-commerce demo</h1>
      <InstantSearch
        searchClient={searchClient}
        indexName={indexName}
        onSearchStateChange={({ query }) => {
          setQuery(query);
        }}
      >
        <SearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
      </InstantSearch>
    </Root>
  );
};
