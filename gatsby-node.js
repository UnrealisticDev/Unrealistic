const path = require(`path`);
const router = require(`./src/shared/scripts/router`);

exports.sourceNodes = ({
  actions: { createNodeField },
  getNode,
  getNodesByType
}) => {
  for (const series of getNodesByType("ContentfulSeries")) {
    for (const postId of series.posts___NODE) {
      var post = getNode(postId);
      createNodeField({ node: post, name: `series`, value: series });
    }
  }

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
        posts: allContentfulPost {
          nodes {
            id
            slug
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
            key
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

  const postTemplate = path.resolve(`./src/templates/post.js`);
  query.data.posts.nodes.forEach(({ id, slug }) => {
    const path = router.getPostSlug(slug);
    createPage({
      path,
      component: postTemplate,
      context: {
        id: id
      }
    });
  });

  const pluginTemplate = path.resolve(`./src/templates/plugin.js`);
  query.data.allContentfulPlugin.edges.forEach(({ node }) => {
    const { name } = node;
    const path = router.getProductSlug(name.toLowerCase());
    createPage({
      path,
      component: pluginTemplate,
      context: {
        name: name
      }
    });
  });

  const uSpecifierTemplate = path.resolve(`./src/templates/uspecifier.js`);
  query.data.specifiers.nodes.forEach(async ({ id, slug, type, key }) => {
    const {
      data: { file }
    } = await graphql(
      `
        {
          file(name: {eq: "${slug}"}) {
            childMarkdownRemark {
              frontmatter {
                combos
                mutex
              }
            }
          }
        }
      `
    );

    const path = `/glossary/${slug}`;
    createPage({
      path,
      component: uSpecifierTemplate,
      context: {
        id: id,
        type: type,
        key: key,
        slug: slug,
        combos:
          file && file.childMarkdownRemark.frontmatter.combos
            ? file.childMarkdownRemark.frontmatter.combos
            : ["none"],
        mutex:
          file && file.childMarkdownRemark.frontmatter.mutex
            ? file.childMarkdownRemark.frontmatter.mutex
            : ["none"]
      }
    });
  });
};
