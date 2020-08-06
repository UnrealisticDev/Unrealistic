import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";

// This is the actual search bar that users type
// input into.
const SearchEntry = connectSearchBox(
  ({ refine, currentRefinement, onFocus }) => (
    <form onSubmit={event => event.preventDefault()}>
      <div className="control has-icons-right is-expanded">
        <input
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
  )
);

export default SearchEntry;
