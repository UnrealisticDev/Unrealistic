import React from "react";
import styled from 'styled-components'

const Aside = styled.aside`
  @media (min-width: 769px) {
    height: 80vh;
    overflow-x: visible;
    overflow-y: hidden;
    position: sticky;
    top: 15vmin;
  }
`;

export default ({ children }) => <Aside className="menu">{children}</Aside>;
