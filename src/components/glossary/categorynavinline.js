import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const InlineCategoryNavLink = styled(Link)`
  display: flex;
  align-items: center;
  flex-direction: ${props => (props.next === true ? "row-reverse" : "row")};
  p {
    display: inline-block;
    color: #363636;
    white-space: nowrap;
  }
`;

export default ({ term, next }) =>
  term && (
    <InlineCategoryNavLink to={`/glossary/${term.slug}`} next={next ? true : false}>
      <FontAwesomeIcon
        icon={next ? faArrowRight : faArrowLeft}
        style={{ flex: "0 0 28px" }}
      />
      <p className="is-hidden-mobile">{term.name}</p>
    </InlineCategoryNavLink>
  );
