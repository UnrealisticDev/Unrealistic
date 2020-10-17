const path = require(`path`);
const router = require(`./src/scripts/router`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const query = await graphql(
    `
      {
        allContentfulPost {
          edges {
            node {
              slug
              series
            }
          }
        }
        allContentfulPlugin {
          edges {
            node {
              slug
              docTag
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

  const postTemplate = path.resolve(`./src/templates/post.js`);
  query.data.allContentfulPost.edges.forEach(({ node }) => {
    const path = router.getArticleSlug(node.slug) + "/";
    const series = node.series;
    console.log("Creating page: " + path);
    createPage({
      path,
      component: postTemplate,
      context: {
        slug: node.slug,
        series: series
      }
    });
  });

  const pluginTemplate = path.resolve(`./src/templates/plugin.js`);
  query.data.allContentfulPlugin.edges.forEach(({ node }) => {
    const path = router.getProductSlug(node.slug) + "/";
    console.log("Creating page: " + path);
    createPage({
      path,
      component: pluginTemplate,
      context: {
        slug: node.slug,
        docTag: node.docTag
      }
    });
  });
};
