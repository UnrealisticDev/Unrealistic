import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";
import { CarouselProvider, Slider, Slide, Dot } from "pure-react-carousel";
import { getPostSlug } from "../scripts/router";

const PostDetails = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  text-align: right;
`;

const PostTitle = styled.h2``;

const DotBox = styled.div`
  text-align: right;
`;

const StyledDot = styled(Dot)`
  border: 0;
  box-shadow: none;
  border-radius: 1px;
  height: 3px;
  width: 20px;
  background-color: #2f2f2f !important;
  margin: 2px;
`;

export default ({ items }) => {
  return (
    <CarouselProvider
      naturalSlideWidth={600}
      naturalSlideHeight={350}
      totalSlides={items.edges.length}
      isPlaying={true}
      interval={10000}
      dragEnabled={true}
      infinite={true}
      isIntrinsicHeight={true}
    >
      <Slider style={{ overflow: "hidden", boxShadow: "0 0 3px #ccc" }}>
        {items.edges.map(({ node }, i) => {
          const { slug, title, image } = node;

          return (
            <Slide
              index={i}
              key={i}
              style={{ position: "relative", overflow: "visible" }}
            >
              <Link to={getPostSlug(slug)}>
                <Img fluid={image ? image.fluid : null} />
                <PostDetails className="content">
                  <PostTitle className="button is-dark is-size-5">{title}</PostTitle>
                  {/* <p
                    style={{
                      background: "#2F2F2F",
                      borderRadius: "5px",
                      marginLeft: "50%",
                      textAlign: "left",
                      color: "#FFFFFF !important",
                      padding: "5px"
                    }}
                    className='has-text-light is-hidden-mobile'
                  >
                    {body.childMarkdownRemark.excerpt}
                  </p> */}
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
    </CarouselProvider>
  );
};
