const path = require(`path`)
const slash = require(`slash`)
const router = require(`./src/scripts/router`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    //   console.log(node);
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allContentfulBlogPost {
          edges {
            node {
              id
              slug
              series
            }
          }
        }
        allContentfulPlugin {
          edges {
            node {
              id
              slug
              docTag
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const articleTemplate = path.resolve(`./src/templates/article.js`)
  result.data.allContentfulBlogPost.edges.forEach(({ node }) => {
    const path = router.getArticleSlug(node.slug)
    const series = node.series
    console.log("Creating page: " + path)
    createPage({
      path,
      component: articleTemplate,
      context: {
        pagePath: node.slug,
        pageSeries: series,
      },
    })
  })

  const pluginTemplate = path.resolve(`./src/templates/plugin.js`)
  result.data.allContentfulPlugin.edges.forEach(({node}) => {
    const path = router.getProductSlug(node.slug)
    const series = node.series
    console.log("Creating page: " + path)
    createPage({
      path,
      component: pluginTemplate,
      context: {
        slug: node.slug,
        docTag: node.docTag
      }
    })
  })
}
