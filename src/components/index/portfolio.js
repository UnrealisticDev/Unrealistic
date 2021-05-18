import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import { Heading, SubHeading, Text } from "../../shared/components/typography";
import { getShowcaseSlug } from "../../shared/scripts/router";

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

const Panel = ({ showcase, className }) => {
  return showcase ? (
    <PanelWrapper to={getShowcaseSlug(showcase)} className={className}>
      <StyledImg fluid={showcase.feature.fluid} />
      <Heading as="h2" id="title" className="subtitle">
        {showcase.title}
      </Heading>
      <Text>{showcase.pitch}</Text>
    </PanelWrapper>
  ) : null;
};

const Portfolio = ({ portfolio }) => {
  return (
    portfolio ? (
      <section className="section is-fullheight-with-navbar">
        <div class="container">
          <SubHeading className="title is-1 is-size-3-mobile">
            Portfolio
          </SubHeading>
          <div className="columns is-multiline">
            {portfolio.nodes.map((showcase) => {
              return <Panel showcase={showcase} className="column is-4" />;
            })}
          </div>
        </div>
      </section>
    ) : null
  );
};

export default Portfolio;
