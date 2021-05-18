import React from "react";
import styled from "styled-components";

import { connectSearchBox } from "react-instantsearch-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SInput = styled.input`
  background-color: #dbdbdb !important;

  ::placeholder {
    color: #575754 !important;
  }

  &:disabled {
    background: repeating-linear-gradient(
      -45deg,
      hsl(0, 0%, 86%),
      hsl(0, 0%, 86%) 10px,
      hsl(0, 0%, 80%) 10px,
      hsl(0, 0%, 80%) 20px
    ) !important;
  }
`;

export default connectSearchBox(
  ({
    currentRefinement,
    refine,
    onFocus,
    placeholder,
    className,
    style,
    id,
    disabled
  }) => (
    <form
      onSubmit={event => event.preventDefault()}
      className={className}
      style={style}
    >
      <div className="control has-icons-right is-expanded">
        <SInput
          type="text"
          value={currentRefinement}
          onChange={event => refine(event.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          className="input"
          aria-label="Search"
          id={id}
          disabled={disabled}
        />
        <span className="icon is-small is-right">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
    </form>
  )
);
