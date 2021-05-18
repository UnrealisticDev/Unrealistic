const path = require(`path`);
const router = require(`./src/scripts/shared/router`);

exports.sourceNodes = ({
  actions: { createNodeField },
  getNode,
  getNodesByType,
}) => {
  /* Relate posts to referencing series */
  for (const series of getNodesByType("ContentfulSeries")) {
    for (const postId of series.posts___NODE) {
      var post = getNode(postId);
      createNodeField({ node: post, name: `series`, value: series });
    }
  }
};

exports.onCreateNode = ({ node, actions, getNodesByType }) => {
  /* Link uspecifiers and local analysis files. */
  const { createParentChildLink } = actions;
  if (
    node.internal.type === "File" &&
    node.sourceInstanceName === "uspecifiers"
  ) {
    const file = node;
    const specifier = getNodesByType("ContentfulUnrealSpecifier").find(
      (specifier) => specifier.slug === file.name
    );
    if (specifier) {
      createParentChildLink({ parent: specifier, child: file });
    }
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
        plugins: allContentfulPlugin {
          nodes {
            name
          }
        }
        showcases: allContentfulShowcase {
          nodes {
            id
            title
          }
        }
        specifiers: allContentfulUnrealSpecifier {
          nodes {
            id
            key
            slug
            type
            local: childrenFile {
              childMarkdownRemark {
                frontmatter {
                  combos
                  mutex
                }
              }
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

  const postTemplate = path.resolve(`./src/components/templates/post.js`);
  query.data.posts.nodes.forEach(({ id, slug }) => {
    const path = router.getPostSlug(slug);
    createPage({
      path,
      component: postTemplate,
      context: {
        id: id,
      },
    });
  });

  const pluginTemplate = path.resolve(`./src/components/templates/plugin.js`);
  query.data.plugins.nodes.forEach(({ name }) => {
    const path = router.getProductSlug(name.toLowerCase());
    createPage({
      path,
      component: pluginTemplate,
      context: {
        name: name,
      },
    });
  });

  const showcaseTemplate = path.resolve("./src/components/templates/showcase.js");
  query.data.showcases.nodes.forEach((showcase) => {
    const path = router.getShowcaseSlug(showcase);
    console.log(`Creating showcase page at ${path}`);
    createPage({
      path,
      component: showcaseTemplate,
      context: {
        id: showcase.id,
      },
    });
  });

  const uSpecifierTemplate = path.resolve(`./src/components/templates/uspecifier.js`);
  query.data.specifiers.nodes.forEach(({ id, slug, type, key, local }) => {
    const { combos, mutex } =
      local && local[0] && local[0].childMarkdownRemark
        ? local[0].childMarkdownRemark.frontmatter
        : {};

    const path = `/glossary/${slug}`;
    createPage({
      path,
      component: uSpecifierTemplate,
      context: {
        id: id,
        type: type,
        key: key,
        slug: slug,
        combos: combos || [],
        mutex: mutex || [],
      },
    });
  });
};
