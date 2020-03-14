import React from "react"
import { graphql } from "gatsby"
import HyvorTalk from "hyvor-talk-react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
import Toc from "../components/toc"
import Projectfiles from "../components/projectfiles"

import "../styles/code.scss"
import postStyles from "./post-basic.module.scss"

export default ({ data }) => {
  const { title, image, body, projectfiles } = data.contentfulBlogPost

  var toc = body.childMarkdownRemark.tableOfContents

  return (
    <Layout>
      <SEO title={title}/>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-8">
            <div class="box has-background-light">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div className={"title " + postStyles.Title}>{title}</div>
                  </div>
                </div>
                <div class="card-image">
                  <figure class="image is-5by3">
                    <img
                      src={image ? image.file.url : ""}
                      alt="alt"
                      style={{ objectFit: "cover" }}
                    />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="content">
                    <div
                      className={postStyles.Markdown}
                      dangerouslySetInnerHTML={{
                        __html: body.childMarkdownRemark.html,
                      }}
                    />
                    <hr style={{ marginTop: "8vmin", marginBottom: "8vmin" }} />
                    <HyvorTalk.Embed websiteId={292} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {(toc || projectfiles) && (
            <div className="column is-3">
              <div
                className="box has-background-light"
                style={{ position: "sticky", top: "10vmin", bottom: "25vmin" }}
              >
                <Sidebar>
                  <Toc src={toc} />
                  <Projectfiles src={projectfiles} />
                </Sidebar>
              </div>
            </div>
          )}
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
          tableOfContents(absolute: false)
        }
      }
      projectfiles
    }
  }
`
