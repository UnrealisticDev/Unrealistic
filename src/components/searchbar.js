import { default as React, createRef, useState } from "react";
import algoliasearch from "algoliasearch";
import { InstantSearch } from "react-instantsearch-dom";
import SearchEntry from "./searchbar/searchentry";
import SearchResult from "./searchbar/searchresult";
import useClickOutside from "./searchbar/clickoutside";
import styled from 'styled-components'

const SearchRoot = styled.div`
  position: relative;
`

const StyledSearchResult = styled(SearchResult)`
  position: absolute;
  right: 0;
`

const indices = [{ name: `Articles`, title: `Articles` }];

export default function Searchbar(props) {
  const rootRef = createRef();
  const [query, setQuery] = useState();
  const [hasFocus, setFocus] = useState(false);
  const searchClient = algoliasearch(
    `Y7ES67CX6H`,
    `7f89d8a0c9168f15d2e36ef0b99087ff`
  );

  useClickOutside(rootRef, () => setFocus(false));

  return (
    <SearchRoot ref={rootRef}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchEntry onFocus={() => setFocus(true)} hasFocus={hasFocus} />
        <StyledSearchResult
          show={query && query.length > 0 && hasFocus}
          indices={indices}
        />
      </InstantSearch>
    </SearchRoot>
  );
}
