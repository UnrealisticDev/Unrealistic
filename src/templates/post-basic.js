import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Sidebar from "../components/sidebar"
import Toc from "../components/toc"
import Projfiles from "../components/projfiles"

// import postStyles from "./post-basic.module.scss"

export default ({ data }) => {
  const { title, image, body } = data.contentfulBlogPost

  return (
    <Layout title={title}>
      <div className="p-0 mx-0 my-2" fluid>
        <div>
          <div />
          <div xs="12" lg="6" className="px-0">
            <div
              text="light"
              style={{
                backgrounddivor: "#1D1D1D",
                borderWidth: "0px",
              }}
            >
              <div>
                <div style={{ position: "relative" }}>
                  <img src={image ? image.file.url : ""} />
                </div>
              </div>
              <div className="py-0">
                <h1>{title}</h1>
                <div
                  // className={postStyles.Markdown}
                  dangerouslySetInnerHTML={{
                    __html: body.childMarkdownRemark.html,
                  }}
                />
              </div>
            </div>
          </div>
          <div xs="12" lg="2" className="p-0 mx-lg-2 my-2 my-lg-0 d-lg-block">
            <Sidebar>
              <div className="mb-0 mx-0 px-0">
                <Projfiles />
              </div>
              <div className="px-0 mt-2 d-none d-lg-block">
                <Toc
                  src={
                    data.contentfulBlogPost.body.childMarkdownRemark
                      .tableOfContents
                  }
                />
              </div>
            </Sidebar>
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
