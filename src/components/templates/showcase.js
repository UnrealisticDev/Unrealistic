import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import Seo from "../shared/seo";
import Layout from "../shared/layout";
import { Heading, SubHeading, Text } from "../shared/typography";

const Feature = styled(Img)`
  margin-bottom: 2rem;
`;

const Description = styled(Text)`
  margin-bottom: 5rem;

  & p {
    margin-bottom: 2rem;
  }
`;

const DisplayLinks = ({ children }) => {
  return (
    <div className="level" id="links">
      {children}
    </div>
  );
};

const DisplayLink = ({ text, link }) => {
  return (
    <a
      class="level-item px-2"
      href={link}
      target="_blank"
      rel="noreferrer noopener"
    >
      <button className="button is-dark is-outlined is-fullwidth">
        <span>{text}</span>
      </button>
    </a>
  );
};

const ElementWrapper = styled.div`
  @media screen and (min-width: 769px) {
    // margin-bottom: 5rem !important;
    flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
  }
  text-align: center;
`;

export default function Template({ data }) {
  const { showcase } = data;
  const {
    title,
    feature,
    pitch,
    description,
    demoLink,
    watchLink,
    sourceLink,
    elements,
  } = showcase;

  return (
    <>
      <Seo title={title} description={pitch} image={feature.file.url}/>
      <Layout>
        <section className="section" id="frontmatter">
          <div className="container">
            <div class="columns is-centered">
              <div class="column is-half">
                <Heading className="title is-size-1 is-size-3-mobile has-text-centered">
                  {title}
                </Heading>
                <Feature
                  fluid={feature && feature.fluid}
                  alt="Showcase Feature"
                />
                <Description
                  as="div"
                  dangerouslySetInnerHTML={{
                    __html: description.childMarkdownRemark.html,
                  }}
                />
                <DisplayLinks>
                  <DisplayLink text="Play" link={demoLink} />
                  <DisplayLink text="Watch" link={watchLink} />
                  <DisplayLink text="Source" link={sourceLink} />
                </DisplayLinks>
              </div>
            </div>
          </div>
        </section>

        {elements.map(({ headline, blurb, visualAid }, i) => {
          return (
            <section class="section">
              <div class="container">
                <ElementWrapper
                  className="columns is-centered is-vcentered"
                  reverse={i % 2 !== 0}
                >
                  <div class="column is-4">
                    <SubHeading className="title is-size-3 is-size-5-mobile">
                      {headline}
                    </SubHeading>
                    <Text>{blurb.blurb}</Text>
                  </div>
                  <div class="column is-6">
                    <Img fluid={visualAid && visualAid.fluid} />
                  </div>
                </ElementWrapper>
              </div>
            </section>
          );
        })}

        <section className="section" id="like-what-you-see">
          <div className="container has-text-centered">
            <Link to="/about">
              <button className="button is-dark is-outlined">
                <span as="p">Like What You See?</span>
              </button>
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
}

export const query = graphql`
  query($id: String!) {
    showcase: contentfulShowcase(id: { eq: $id }) {
      title
      feature {
        fluid {
          ...GatsbyContentfulFluid
        }
        file {
          url
        }
      }
      pitch
      description {
        childMarkdownRemark {
          html
        }
      }
      demoLink
      watchLink
      sourceLink
      elements {
        headline
        blurb {
          blurb
        }
        visualAid {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`;
