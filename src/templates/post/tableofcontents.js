import React, { useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Toggle = styled.a`
  color: #363636;
  &:hover {
    color: #209cee;
  }
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;

  font-size: calc(10px + 0.2rem);

  @media (min-width: 1024px) {
    max-height: 70vh;
    scrollbar-width: none;
  }

  & p {
    margin: 0;
  }

  & a {
    padding: 3px;
    color: #363636;
  }

  & a:hover {
    text-decoration: none;
    color: hsl(204, 86%, 53%);
  }

  & li {
    margin-top: 2px;
    margin-bottom: 2px;
  }

  & li a {
    padding: 3px;
    color: lighten(hsl(204, 86%, 53%), 10%);
  }

  & li li {
    padding-left: 1em;
  }

  & li li a {
    padding: 3px;
    color: lighten(hsl(204, 86%, 53%), 20%);
  }

  & li li li {
    padding-left: 2em;
  }
`;

export default ({ src }) => {
  const [isExpanded, setExpanded] = useState(false);

  function toggleExpansion(_) {
    setExpanded(!isExpanded);
  }

  return src ? (
    <>
      <Toggle
        className="level is-mobile"
        onClick={_ => toggleExpansion()}
        onKeyPress={e => {
          if (e.key === "Return") {
            toggleExpansion();
          }
        }}
        role="button"
        tabIndex="0"
      >
        <div className="level-left">
          <div class="level-item">
            <p className="menu-label">Contents</p>
          </div>
        </div>
        <div className="level-right">
          <div class="level-item">
            <FontAwesomeIcon icon={isExpanded ? faMinus : faPlus} />
          </div>
        </div>
      </Toggle>
      {isExpanded && (
        <List className="menu-list">
          <div dangerouslySetInnerHTML={{ __html: src }} />
        </List>
      )}
    </>
  ) : null;
};
