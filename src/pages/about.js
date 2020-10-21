import React from "react";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Hireme from "../components/hireme";

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

  font-family: "basic-sans";
`;

const ContentBody = styled.div`
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

export default () => (
  <Layout>
    <SEO title="About" />
    <section className="section">
      <div class="hero">
        <ContentBody className="hero-body">
          <div className="container">
            <div className="columns is-centered is-variable is-6">
              <div className="column is-4">
                <div className="container">
                  <div className="content">
                    <Title className="title is-size-1 is-size-3-mobile">
                      About Unrealistic
                    </Title>
                    <p style={{ textAlign: "justify" }}>
                      Unrealistic was inspired by one man's journey to break
                      into game development, and the deluge of naysayers that
                      rained down upon him.
                    </p>
                    <p>
                      Our mission is to help people from all backgrounds,
                      professional and personal, understand the technologies,
                      processes, and techniques that go into making some the
                      most impactful digital media of our age. We do this by
                      educating, empowering, and inspiring current and hopeful
                      game developers, through educational content, discussions
                      with gaming insiders, and industry analysis.
                    </p>
                    <p>
                      Mostly, though, Unrealistic stands as a testament to the
                      idea that everyone has the right to fail, and the chance
                      to succeed.
                    </p>
                  </div>
                </div>
              </div>
              <div className="column is-4">
                <Hireme />
              </div>
            </div>
          </div>
        </ContentBody>
      </div>
    </section>
  </Layout>
);
