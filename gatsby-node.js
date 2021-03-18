const path = require(`path`);
const router = require(`./src/scripts/router`);
require('dotenv').config({
  path: `.env`
});

exports.sourceNodes = ({
  actions: { createNode, createNodeField },
  createNodeId,
  createContentDigest,
  getNodes,
  getNodesByType
}) => {
  idsOfSerialPosts = [];
  for (node of getNodesByType("ContentfulSeries")) {
    for (id of node.posts___NODE) {
      idsOfSerialPosts.push(id);
    }
  }

  for (node of getNodesByType("ContentfulPost")) {
    createNodeField({
      node,
      name: `standalone`,
      value: idsOfSerialPosts.includes(node.id) ? false : true
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const query = await graphql(
    `
      {
        allContentfulPost {
          edges {
            node {
              id
              slug
            }
          }
        }
        allContentfulSeries {
          edges {
            node {
              id
              posts {
                id
              }
            }
          }
        }
        allContentfulPlugin {
          edges {
            node {
              name
            }
          }
        }
        specifiers: allContentfulUnrealSpecifier {
          nodes {
            id
            slug
            type
          }
        }
        glossaryLists: allContentfulList(filter: { tags: { in: "glossary" } }) {
          nodes {
            id
            references {
              id
              slug
            }
          }
        }
      }
    `
  );

  if (query.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  function findSeriesId(post) {
    for (edge of query.data.allContentfulSeries.edges) {
      const series = edge.node;
      for (item of series.posts) {
        if (item.id == post.id) {
          return series.id;
        }
      }
    }
    return "";
  }

  const postTemplate = path.resolve(`./src/templates/post.js`);
  query.data.allContentfulPost.edges.forEach(({ node }) => {
    const { slug } = node;
    const path = router.getPostSlug(slug);
    console.log("Creating page: " + path);
    createPage({
      path,
      component: postTemplate,
      context: {
        slug: slug,
        series: findSeriesId(node)
      }
    });
  });

  const pluginTemplate = path.resolve(`./src/templates/plugin.js`);
  query.data.allContentfulPlugin.edges.forEach(({ node }) => {
    const { name } = node;
    const path = router.getProductSlug(name.toLowerCase());
    console.log("Creating page: " + path);
    createPage({
      path,
      component: pluginTemplate,
      context: {
        name: name
      }
    });
  });

  const uSpecifierTemplate = path.resolve(`./src/templates/uspecifier.js`);
  query.data.specifiers.nodes.forEach(({ id, slug, type }) => {
    const path = `/glossary/${slug}`;
    createPage({
      path,
      component: uSpecifierTemplate,
      context: {
        id: id,
        type: type
      }
    });
  });
};
