const path = require(`path`)
const slash = require(`slash`)

exports.createPages = async ({ graphql, actions, reporter }) => {

    const {createPage} = actions;

    const result = await graphql(
        `
          {
            allContentfulBlogPost {
                edges {
                    node {
                        id
                        slug
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
    result.data.allContentfulBlogPost.edges.forEach(({node}) => {
        const path = node.slug
        console.log('Creating page: ' + path);
        createPage({
            path,
            component: postTemplate,
            context: {
                pagePath: path,
            }
        })
    })
}
