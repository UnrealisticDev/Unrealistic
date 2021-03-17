import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Searchbar from "../components/searchbar";

const Title = styled.h1`
  @font-face {
    font-family: "basic-sans";
    src: url("https://use.typekit.net/af/fa9ffd/00000000000000003b9b0438/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3")
        format("woff2"),
      url("https://use.typekit.net/af/fa9ffd/00000000000000003b9b0438/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3")
        format("woff"),
      url("https://use.typekit.net/af/fa9ffd/00000000000000003b9b0438/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3")
        format("opentype");
    font-style: normal;
    font-weight: 900;
    font-display: auto;
  }
  font-family: "basic-sans", sans-serif;
  color: #363636;

  margin-bottom: 5vh !important;
`;

export default () => {
  return (
    <>
      <Helmet></Helmet>
      <Layout>
        <SEO
          title="Spectacle"
          description="Search for class, struct, property and other specifiers for Unreal Engine 4."
        />
        <section className="hero is-fullheight-with-navbar">
          <div className="hero-body" style={{ position: "relative" }}>
            <div
              class="columns is-centered"
              style={{ width: "100%", top: "30%", position: "absolute" }}
            >
              <div class="column is-half">
                <Title className="title is-1 has-text-centered">
                  Spectacle
                </Title>
                <Searchbar />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};
