import React from "react"
import { graphql, Link } from "gatsby"
import router from "../scripts/router"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/global.scss"
import "./articles.module.scss"

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Articles" />
      <div className="columns is-multiline is-desktop">
        {data.allContentfulBlogPost.nodes.map(({ slug, title, image }) => {
          return (
            <div className="column is-4">
              <Link to={router.getArticleSlug(slug)}>
                <div className="box is-paddingless" style={{ height: "100%" }}>
                  <div className="card" style={{ height: "100%" }}>
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src={
                            image
                              ? image.file.url
                              : "https://versions.bulma.io/0.5.3/images/placeholders/1280x960.png"
                          }
                          alt="Post Feature"
                          style={{ objectFit: "cover" }}
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="content">
                        <div className="title">{title}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulBlogPost(
      filter: {
        tags: {
          nin: [
            "docs"
          ]
        }
      }
      sort: { fields: createdAt, order: DESC }
    ) {
      nodes {
        slug
        title
        id
        createdAt(difference: "minutes")
        image {
          file {
            url
          }
        }
      }
    }
  }
`
