import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import { Heading, SubHeading } from "../../shared/components/typography";
import router from "../../shared/scripts/router";

function getRandom(array, count) {
  var out = [];

  if (array.length < count) {
    out = array;
  } else {
    var indices = [];
    while (indices.length < count) {
      var r = Math.floor(Math.random() * (array.length - 1)) + 1;
      if (indices.indexOf(r) === -1) {
        indices.push(r);
      }
    }
    indices.forEach(i => {
      out.push(array[i]);
    });
  }

  return out;
}

const Root = styled.div`
  @media screen and (max-width: 768px) {
    padding: 1.5rem;
  }
`

const PostTitle = styled(Heading)`
  text-align: left;
`;

const PostImage = styled(Img)`
  margin-bottom: 2vmin;
  @media screen and (max-width: 768px) {
    border-radius: 5px;
  }
`;

const Post = ({ post }) => {
  return (
    <>
      <Link to={router.getPostSlug(post.slug)}>
        <PostImage fluid={post.image && post.image.fluid} alt="Article Feature" />
        <PostTitle as="h3">{post.title}</PostTitle>
      </Link>
    </>
  );
};

const FurtherReading = ({ posts }) => {
  posts = getRandom(posts.nodes, 3);
  return (
    posts && (
      <Root>
        <SubHeading style={{marginBottom: '1rem'}}>Up next</SubHeading>
        <div className="columns">
          {posts.map(post => (
            <div className="column is-4">
              <Post post={post}></Post>
            </div>
          ))}
        </div>
      </Root>
    )
  );
};

export default FurtherReading;
