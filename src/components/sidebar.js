import React from "react";
import styled from 'styled-components'

const Aside = styled.aside`

  @media screen and (min-width: 769px) {
    position: sticky;
    top: 10vh;

    height: 80vh;
    overflow-x: visible;
    overflow-y: hidden;

    display: flex;
    flex-direction: column;
  }
`;

export default ({ children }) => <Aside className="menu">{children}</Aside>;
