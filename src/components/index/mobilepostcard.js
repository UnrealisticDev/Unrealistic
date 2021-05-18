import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import { Heading, Text } from "../../shared/components/typography";
import { getPostSlug } from "../../shared/scripts/router";

const Wrapper = styled.div`
  margin-bottom: 2rem;
`;

const StyledImg = styled(Img)`
  border-radius: 5px;
`;

const Title = styled(Heading)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem !important;
`;

const MobilePostCard = ({ post }) => {
  const { slug, title, image, excerpt, body } = post || {};
  return (
    <Wrapper>
      <Link to={getPostSlug(slug)}>
        <StyledImg fluid={image ? image.fluid : null} />
      </Link>
      <Title as="h2" className="title is-size-5">
        {title}
      </Title>
      <Text>{excerpt || body ? body.childMarkdownRemark.excerpt : null}</Text>
    </Wrapper>
  );
};

export default MobilePostCard;
