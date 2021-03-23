import React from "react";
import styled from "styled-components";

import Layout from "../shared/components/layout";
import SEO from "../shared/components/seo";
import { SubHeading, Text } from "../shared/components/typography";

import HireMe from "./about/hireme";

const Title = styled(SubHeading)`
  & #title-lead {
    font-size: 2rem;
    color: hsl(204, 86%, 53%);
  }
`;

const ContentBody = styled.div`
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

export default () => (
  <>
    <SEO title="About" canonical="/about" />
    <Layout>
      <section className="section">
        <div className="hero">
          <ContentBody className="hero-body">
            <div className="container">
              <div className="columns is-centered is-variable is-6">
                <div className="column is-4">
                  <div className="container">
                    <div className="content">
                      <Title
                        as="h1"
                        className="title is-size-1 is-size-3-mobile"
                      >
                        <span id="title-lead"> Un</span>
                        <span id="title-remainder">realistic</span>
                      </Title>
                      <Text as="div">
                        <p>
                          Unrealistic was inspired by my (ongoing) journey to
                          break into game development, and the deluge of
                          naysayers that rained down upon me.
                        </p>
                        <p>
                          My mission is to help people from all backgrounds,
                          professional and personal, understand the
                          technologies, processes, and techniques that go into
                          making some of the most impactful digital media of our
                          age. I do this by educating, empowering, and inspiring
                          current and hopeful game developers, through
                          educational content, discussions with insiders, and
                          industry analysis.
                        </p>
                        <p>
                          Mostly, though, Unrealistic stands as a testament to
                          the idea that everyone has the right to fail, and the
                          chance to succeed.
                        </p>
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="column is-4">
                  <HireMe />
                </div>
              </div>
            </div>
          </ContentBody>
        </div>
      </section>
    </Layout>
  </>
);
