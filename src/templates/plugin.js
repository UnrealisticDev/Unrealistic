import React from "react"
import { Link, graphql } from "gatsby"

import router from "../scripts/router"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data, pageContext }) => {
  const plugin = data.contentfulPlugin

  return (
    <Layout>
      <SEO title="Plugin" />
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-8">
          <div class="tile is-parent">
            <div class="tile is-child">
              <img src={plugin.featureImage.file.url} alt="Plugin Feature" />
            </div>
          </div>
          <div class="tile is-parent">
            <div class="tile is-child content">
              <h1>{plugin.longName}</h1>
              <p>{plugin.description.description}</p>
              <a className="button is-warning" href={plugin.marketplaceUrl}>
                Get it on the Marketplace
              </a>
            </div>
          </div>
        </div>
        <div class="tile is-4 is-parent">
          <div class="tile is-child">
            <aside class="menu">
              <p className="menu-label">Documentation</p>
              <ul className="menu-list">
                {data.documentation.nodes.map(({ slug, title }) => {
                  return (
                    <li>
                      <Link href={router.getArticleSlug(slug)}>{title}</Link>
                    </li>
                  )
                })}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pluginQuery = graphql`
  query($slug: String!, $docTag: String) {
    contentfulPlugin(slug: { eq: $slug }) {
      slug
      name
      longName
      description {
        description
      }
      featureImage {
        file {
          url
        }
      }
      marketplaceUrl
      docTag
    }
    documentation: allContentfulBlogPost(filter: { tags: { in: [$docTag] } }) {
      nodes {
        title
        slug
      }
    }
  }
`
