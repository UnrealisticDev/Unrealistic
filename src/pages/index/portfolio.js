import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import { Heading, SubHeading, Text } from "../../shared/components/typography";
import { getPostSlug } from "../../shared/scripts/router";

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
      <StyledImg fluid={post.image.fluid} />
      <Heading as="h2" id="title" className="subtitle">
        {post.title}
      </Heading>
      {excerpt ? <Text>{post.excerpt}</Text> : null}
    </PanelWrapper>
  ) : null;
};

export default ({ portfolio }) => {
  return (
    <section className="section is-fullheight-with-navbar">
      <div class="container">
        <SubHeading className="title is-1 is-size-3-mobile">
          Portfolio
        </SubHeading>
        <Text>Coming soon...</Text>
        {/* <div className="columns is-multiline">
          {portfolio.map(post => {
            return <Panel post={post} className="column is-4" />;
          })}
        </div> */}
      </div>
    </section>
  );
};
