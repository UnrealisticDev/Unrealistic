import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

import "../styles/global.scss"
import "./articles.module.scss"

export default ({ data }) => {
  return (
    <Layout title="Articles">
      <div class="columns is-multiline is-desktop">
        {data.allContentfulBlogPost.nodes.map(({ slug, title, image }) => {
          return (
            <div class="column is-4">
              <Link to={slug}>
                <div class="box">
                  <div class="card">
                    <div class="card-image">
                      <figure class="image is-4by3">
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
                    <div class="card-content">
                      <div class="content">
                        <div class="title">{title}</div>
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
    allContentfulBlogPost(sort: { fields: createdAt, order: DESC }) {
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
