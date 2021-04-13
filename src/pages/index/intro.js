import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import { Heading, SubHeading, Text } from "../../shared/components/typography";
import { getPostSlug } from "../../shared/scripts/router";

const Title = styled(SubHeading)`
  & #title-lead {
    font-size: 2rem;
    color: hsl(204, 86%, 53%);
  }
`;

const PanelWrapper = styled(Link)`
  color: hsl(0, 0%, 21%) !important;

  #title {
    margin-bottom: 1rem;
  }

  &:hover #title {
    color: hsl(204, 86%, 53%) !important;
  }
`;

const StyledImg = styled(Img)`
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const Panel = ({ post, className, excerpt }) => {
  return post ? (
    <PanelWrapper to={getPostSlug(post.slug)} className={className}>
      <StyledImg id="thumbnail" fluid={post.image.fluid} />
      <Heading as="h2" id="title" className="subtitle">
        {post.title}
      </Heading>
      {excerpt ? <Text>{post.excerpt}</Text> : null}
    </PanelWrapper>
  ) : null;
};

function limitOnePerSeries(posts) {
  var outPosts = [];
  var identifiedSeries = [];

  posts.forEach(post => {
    if (post.series !== null) {
      if (!identifiedSeries.includes(post.series.id)) {
        identifiedSeries.push(post.series.id);
        outPosts.push(post);
      }
    } else {
      outPosts.push(post);
    }
  });

  return outPosts;
}

export default ({ posts }) => {
  posts = limitOnePerSeries(posts);
  return posts ? (
    <section className="section">
      <div class="container">
        <Title className="title is-1 is-size-3-mobile">
          <span id="title-lead">Un</span>
          <span>realistic</span>
        </Title>
        <div className="tile is-ancestor">
          <div className="tile is-6">
            <div className="tile is-parent">
              <Panel className="tile is-child" post={posts[0]} excerpt />
            </div>
          </div>
          <div className="tile is-vertical is-3">
            <div className="tile is-parent">
              <div className="tile is-child">
                <Panel className="tile is-child" post={posts[1]} />
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile is-child">
                <Panel className="tile is-child" post={posts[2]} />
              </div>
            </div>
          </div>
          <div className="tile is-vertical is-3">
            <div className="tile is-parent">
              <div className="tile is-child">
                <Panel className="tile is-child" post={posts[3]} />
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile is-child">
                <Panel className="tile is-child" post={posts[4]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;
};
