import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Header from "./layout/header";
import Footer from "./layout/footer";

import favicon16 from "../../content/images/logo/favicon16.png";
import favicon32 from "../../content/images/logo/favicon32.png";
import favicon64 from "../../content/images/logo/favicon64.png";

const Site = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 3.25rem);
`;

const Content = styled.div`
  flex-grow: 1;

  @media screen and (max-width: 769px) {
    padding: 0;
  }
`;

function getFavicon(size, icon) {
  return {
    rel: "icon",
    type: "image/png",
    sizes: size.toString() + "x" + size.toString(),
    href: `${icon}`
  };
}

export default ({ children }) => (
  <>
    <Helmet
      link={[
        getFavicon(16, favicon16),
        getFavicon(32, favicon32),
        getFavicon(64, favicon64)
      ]}
    >
      <html className="has-navbar-fixed-top" lang="en" />
    </Helmet>
    <Site>
      <Header />
      <Content className="has-background-light">{children}</Content>
    </Site>
    <Footer />
  </>
);
