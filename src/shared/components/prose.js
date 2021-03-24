import React from "react";
import rehypeReact from "rehype-react";
import styled from "styled-components";

import { Text } from "./typography";

import "../../styles/code.scss";

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    // h1: props => (
    //   <SubHeading id={format(props.children[0])}>{props.children}</SubHeading>
    // ),
    // h2: props => (
    //   <SubHeading as="h3" id={format(props.children[0])}>
    //     {props.children}
    //   </SubHeading>
    // ),
    // h3: props => (
    //   <SubHeading as="h4" id={format(props.children[0])}>
    //     {props.children}
    //   </SubHeading>
    // ),
    // h4: props => (
    //   <SubHeading as="h5" id={format(props.children[0])}>
    //     {props.children}
    //   </SubHeading>
    // ),
    // h5: props => (
    //   <SubHeading as="h6" id={format(props.children[0])}>
    //     {props.children}
    //   </SubHeading>
    // ),
    p: props => <Text>{props.children}</Text>,
    pre: props => {
      return <pre id="codeblock">{props.children}</pre>;
    }
  }
}).Compiler;

const Prose = ({ html, htmlAst, className }) => {
  return htmlAst ? (
    <div className={className}>{renderAst(htmlAst)}</div>
  ) : html ? (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  ) : null;
};

export default styled(Prose)`
  & p {
    margin-bottom: 1rem;
  }

  & blockquote {
    margin-bottom: 1rem;
    padding-left: 3rem;
    color: grey;
  }

  a:not(.gatsby-resp-image-link) {
    color: #3298dc;
    border-bottom: 2px dotted #363636;
  }

  ul,
  ol {
    margin-left: 2rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: square;
  }

  li {
    padding-left: 3vmin;
  }

  pre {
    position: relative;

    button {
      position: absolute;
      top: 0;
      right: 0;
    }

    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  p > code,
  ul > code,
  ol > code {
    color: #0c1c38;
    border-radius: 0.3em;
    background: #dfe8f7;

    @media screen and (max-width: 769px) {
      padding: 1vmin;
    }

    @media screen and (min-width: 770px) {
      padding: 0.1rem;
    }
  }
`;
