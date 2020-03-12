import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import Toc from "../components/toc"
import Projfiles from "../components/projfiles"

import "../styles/code.scss"
import postStyles from "./post-basic.module.scss"

export default ({ data }) => {
  const { title, image, body } = data.contentfulBlogPost

  return (
    <Layout title={title}>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-8">
            <div class="box has-background-light">
              <div style={{ position: "relative" }}>
                <img src={image ? image.file.url : ""} />
              </div>
              <div>
                <h1 className={postStyles.Title}>{title}</h1>
                <div
                  className={postStyles.Markdown}
                  dangerouslySetInnerHTML={{
                    __html: body.childMarkdownRemark.html,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="column is-2">
            <div className="box has-background-light" style={{ position: 'sticky', top: '10vmin' }}>
              <Sidebar>
                <Toc
                  src={
                    data.contentfulBlogPost.body.childMarkdownRemark
                      .tableOfContents
                  }
                />
                {/* <Projfiles /> */}
              </Sidebar>
            </div>
          </div>
          <div />
        </div>
      </div>
    </Layout>
  )
}

export const postQuery = graphql`
  query($pagePath: String!) {
    contentfulBlogPost(slug: { eq: $pagePath }) {
      slug
      title
      image {
        file {
          url
        }
      }
      body {
        childMarkdownRemark {
          html
          tableOfContents
        }
      }
    }
  }
`
