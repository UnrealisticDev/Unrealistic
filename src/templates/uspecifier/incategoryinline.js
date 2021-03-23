import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const InlineCategoryNavLink = styled(Link)`
  display: flex;
  align-items: center;
  flex-direction: ${props => (props.next === true ? "row-reverse" : "row")};

  color: hsl(0, 0%, 71%);

  &:hover #icon {
    color: hsl(204, 86%, 53%);
  }
`;

export default ({ specifier, next }) =>
  specifier && (
    <InlineCategoryNavLink
      to={`/glossary/${specifier.slug}`}
      next={next ? true : false}
    >
      <FontAwesomeIcon
        id="icon"
        icon={next ? faArrowRight : faArrowLeft}
        style={{ flex: "0 0 28px" }}
      />
      <p className="is-hidden-mobile">{specifier.keyFriendly}</p>
    </InlineCategoryNavLink>
  );
