import { default as React, createRef, useState } from "react";
import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch-dom";
import SearchBox from "./search/searchbox";
import SearchResults from "./search/searchresult";
import useClickOutside from "./search/clickoutside";
import styled from 'styled-components'

const SearchRoot = styled.div`
  position: relative;
`

const SSearchResults = styled(SearchResults)`
  position: absolute;
  right: 0;
`

const manualSearchClient = algoliasearch(
  `Y7ES67CX6H`,
  `7f89d8a0c9168f15d2e36ef0b99087ff`
);

export default function Searchbar({index, hitComponent}) {
  const rootRef = createRef();
  const [query, setQuery] = useState();
  const [hasFocus, setFocus] = useState(false);

  useClickOutside(rootRef, () => setFocus(false));

  return (
    <SearchRoot ref={rootRef}>
      <InstantSearch
        searchClient={manualSearchClient}
        indexName={index}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchBox onFocus={() => setFocus(true)} hasFocus={hasFocus} />
        <SSearchResults
          index={index}
          show={query && query.length > 0 && hasFocus}
          hitComponent={hitComponent}
        />
      </InstantSearch>
    </SearchRoot>
  );
}
