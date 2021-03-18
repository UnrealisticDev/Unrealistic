import React from "react";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const StyledLink = styled.a`
  position: relative;
  color: hsl(0, 0%, 71%);
  
  &:hover #tooltiptext {
      visibility: visible;
  }
`;

const TooltipText = styled.span`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -100%);

  visibility: hidden;

  width: 100px;
  padding: 5px;

  font-size: 12px;

  color: hsl(0, 0%, 96%);
  background: hsl(0, 0%, 21%);
  border-radius: 3px;

  text-align: center;
`;

export default ({ branch, path }) => {
  const ref = `https://github.com/UnrealisticDev/Unrealistic/tree/${
    branch ? branch : "master"
  }/${path}`;
  return (
    <StyledLink href={ref} target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faGithub} />
      <TooltipText id="tooltiptext">Edit on Github</TooltipText>
    </StyledLink>
  );
};
