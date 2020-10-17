const escapeStringRegexp = require("escape-string-regexp");

const indexName = `Articles`;

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

const queries = [
  {
    query: articleQuery,
    transformer: ({ data }) => data.articles.edges.map(pageToAlgoliaRecord),
    indexName
  }
];

module.exports = queries;
