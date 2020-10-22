import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { CarouselProvider, Slider, Slide, Dot } from "pure-react-carousel";
import { getPostSlug } from "../scripts/router";

const StyledCarouselProvider = styled(CarouselProvider)`
  position: relative;
`;

const PostDetails = styled.div`
  @media screen and (min-width: 769px) {
    text-align: right;
  }
`;

const PostTitle = styled.h2`
  display: inline-block;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 3px solid #eaaa03;
`;
const PostExcerpt = styled.p`
  @media screen and (min-width: 769px) {
    margin-left: 50%;
    padding: 5px;
  }
`;

const DotBox = styled.div`
  text-align: right;
  position: absolute;

  @media screen and (min-width: 769px) {
    bottom: 20px;
  }
`;

const StyledDot = styled(Dot)`
  border: 0;
  box-shadow: none;
  border-radius: 1px;

  height: 1rem;
  width: 1rem;
  margin-right: 1rem;

  background: grey;

  &:disabled {
    background: #eaaa03;
  }
`;

export default ({ items }) => {
  return (
    <StyledCarouselProvider
      naturalSlideWidth={600}
      naturalSlideHeight={350}
      totalSlides={items.edges.length}
      isPlaying={true}
      interval={10000}
      dragEnabled={true}
      infinite={true}
      isIntrinsicHeight={true}
      style={{ position: "relative" }}
    >
      <Slider style={{ overflow: "hidden" }}>
        {items.edges.map(({ node }, i) => {
          const { slug, title, image, excerpt, body } = node;

          return (
            <Slide
              index={i}
              key={i}
              style={{ position: "relative", overflow: "visible" }}
            >
              <Link to={getPostSlug(slug)}>
                <Img
                  fluid={image ? image.fluid : null}
                  style={{ marginBottom: "1rem" }}
                />{" "}
              </Link>
              <PostDetails className="">
                <PostTitle className="title is-size-5">{title}</PostTitle>
                <PostExcerpt className="has-text-dark">
                  {excerpt || body.childMarkdownRemark.excerpt}
                </PostExcerpt>
              </PostDetails>
            </Slide>
          );
        })}
      </Slider>
      <DotBox>
        {items.edges.map((e, i) => {
          return <StyledDot slide={i} key={i} />;
        })}
      </DotBox>
    </StyledCarouselProvider>
  );
};
