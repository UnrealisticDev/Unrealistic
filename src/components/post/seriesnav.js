import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import { getPostSlug } from "../../shared/scripts/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Toggle = styled.a`
  margin-bottom: ${props => props.expanded ? "1.5rem" : "unset"} !important;

  color: #363636;
  &:hover {
    color: #209cee;
  }
`;

const List = styled.ul`
  list-style: none;
  font-size: calc(10px + 0.2rem);

  @media (min-width: 1024px) {
    max-height: 70vh;
    scrollbar-width: none;
  }

  & li {
    padding-bottom: .5em;
  }

  & li a {
    color: #363636;
  }

  & li a:hover {
    text-decoration: none;
    color: hsl(204, 86%, 53%);
  }
`;

function sanitizeTitle(title, series) {
  return series ? title.replace(`${series.title}: `, "") : title;
}

const SeriesNav = ({ series }) => {
  const [expanded, setExpanded] = useState(false);

  function toggleExpansion() {
    setExpanded(!expanded);
  }

  return (
    series && (
      <>
        <Toggle
          className="level is-mobile"
          onClick={() => toggleExpansion()}
          onKeyPress={e => {
            if (e.key === "Return") toggleExpansion();
          }}
          role="button"
          tabIndex="0"
          expanded={expanded}
        >
          <div className="level-left">
            <p className="menu-label">Series</p>
          </div>
          <div className="level-right">
            <FontAwesomeIcon icon={expanded ? faMinus : faPlus} />
          </div>
        </Toggle>
        <List>
          {expanded &&
            series.posts.map(post => {
              return (
                <li>
                  <Link to={getPostSlug(post.slug)}>
                    {sanitizeTitle(post.title, series)}
                  </Link>
                </li>
              );
            })}
        </List>
      </>
    )
  );
};

export default SeriesNav;
