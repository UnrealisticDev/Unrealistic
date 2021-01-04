import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { CarouselProvider, Slider, Slide, Dot } from "pure-react-carousel";
import { getPostSlug } from "../scripts/router";

const StyledCarouselProvider = styled(CarouselProvider)`
  position: relative;
  width: 100%;
  height: calc(100vh - 3.25rem);
`;

const PostDetails = styled.div`
  position: absolute;
  bottom: 5vmin;
  right: 5vmin;

  text-align: right;
`;

const PostTitle = styled.h2`
  display: inline-block;

  background: #f5f5f5;
  padding: 1rem;

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

  &:hover {
    color: hsl(204, 86%, 53%) !important;
  }
`;
const PostExcerpt = styled.p`
  text-align: left;
  max-width: 30vw;
  margin-bottom: 1rem;
  padding: 1rem;
  
  background: hsl(204, 86%, 53%);
  border-right: solid 7px hsl(204, 86%, 53%);

  &:hover {
    text-decoration: underline;
  }
`;

const DotBox = styled.div`
  position: absolute;
  bottom: 5vmin;
  left: 5vmin;
`;

const StyledDot = styled(Dot)`
  border: 0;
  box-shadow: none;
  border-radius: 1px;

  height: 0.5rem;
  width: 0.5rem;
  margin-right: 1rem;

  background: grey;

  &:disabled {
    background: hsl(204, 86%, 53%);
  }

  &:hover {
    background: hsl(204, 86%, 53%);
  }

  cursor: pointer;
`;

export default ({ items }) => {
  return (
    <StyledCarouselProvider
      naturalSlideWidth={600}
      naturalSlideHeight={350}
      totalSlides={items.edges.length}
      isPlaying={false}
      interval={10000}
      dragEnabled={false}
      infinite={true}
      isIntrinsicHeight={true}
    >
      <Slider style={{ overflow: "hidden", width: "100%", height: "100%" }}>
        {items.edges.map(({ node }, i) => {
          const { slug, title, image, excerpt, body } = node;

          return (
            <Slide
              index={i}
              key={i}
              style={{ position: "relative", height: "93vh" }}
            >
              <Link to={getPostSlug(slug)}>
                <Img fluid={image ? image.fluid : null} style={{height: '94vh', margin: 0, padding: 0, objectFit: 'cover'}} />{" "}
              <PostDetails>
                <div style={{ display: "flex", flexDirection: 'row' }}>
                  <div style={{ flexGrow: 1 }}></div>
                  <PostExcerpt className="has-background-white has-text-dark">
                    {excerpt || body.childMarkdownRemark.excerpt}
                  </PostExcerpt>
                </div>
                  <PostTitle className="title is-size-5">{title}</PostTitle>
              </PostDetails>
              </Link>
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
