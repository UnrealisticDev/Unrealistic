const escapeStringRegexp = require("escape-string-regexp");

const articleIndex = `Articles`;

const articleQuery = `{
    articles: allContentfulPost {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }`;

function pageToAlgoliaRecord({ node: { id, title, slug, ...rest } }) {
  return {
    objectID: id,
    title: title,
    slug: slug,
    ...rest
  };
}

const specifierIndex = 'UnrealSpecifiers';

const specifierQuery = `{
  specifiers: allContentfulUnrealSpecifier {
    edges {
      node {
        id
        keyFriendly
        type
        slug
      }
    }
  }
}`

function specifierToAlgoliaRecord({ node: { id, keyFriendly, slug, type, ...rest } }) {
  return {
    objectID: id,
    keyFriendly: keyFriendly,
    type: type,
    slug: slug,
    ...rest
  };
}

const queries = [
  {
    query: articleQuery,
    transformer: ({ data }) => data.articles.edges.map(pageToAlgoliaRecord),
    indexName: articleIndex
  },
  {
    query: specifierQuery,
    transformer: ({data}) => data.specifiers.edges.map(specifierToAlgoliaRecord),
    indexName: specifierIndex
  }
];

module.exports = queries;
