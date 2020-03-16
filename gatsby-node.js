const path = require(`path`)
const slash = require(`slash`)

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
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const postTemplate = path.resolve(`./src/templates/post-basic.js`)
  result.data.allContentfulBlogPost.edges.forEach(({ node }) => {
    const path = node.slug
    const series = node.series
    console.log("Creating page: " + path)
    createPage({
      path,
      component: postTemplate,
      context: {
        pagePath: path,
        pageSeries: series,
      },
    })
  })
}
