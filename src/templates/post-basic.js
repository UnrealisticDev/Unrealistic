import React from "react"
import { Link, graphql } from "gatsby"
import HyvorTalk from "hyvor-talk-react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
import Seriesnav from '../components/seriesnav'
import Toc from "../components/toc"
import Projectfiles from "../components/projectfiles"

import "../styles/code.scss"
import postStyles from "./post-basic.module.scss"

export default ({ data, pageContext }) => {
  const {
    title,
    image,
    body,
    projectfiles,
    series,
    seriesNum,
  } = data.contentfulBlogPost

  var toc = body.childMarkdownRemark.tableOfContents

  var beforePost = null
  var afterPost = null
  for (var i = 0; i < data.seriesNeighbors.nodes.length; ++i) {
    if (seriesNum - 1 === i) {
      beforePost = data.seriesNeighbors.nodes[i]
    }
    if (seriesNum + 1 === i) {
      afterPost = data.seriesNeighbors.nodes[i]
    }
  }

  return (
    <Layout>
      <SEO title={title} />
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-8">
            <div className="box has-background-light">
              <div className="card">
                <div className="card-content">
                  <div className="content">
                    <div className={"title " + postStyles.Title}>{title}</div>
                  </div>
                </div>
                <div className="card-image">
                  <figure className="image is-5by3">
                    <img
                      src={image ? image.file.url : ""}
                      alt="alt"
                      style={{ objectFit: "cover" }}
                    />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="content">
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
          {(toc || projectfiles || beforePost || afterPost) && (
            <div className="column is-3">
              <div
                className="box has-background-light"
                style={{ position: "sticky", top: "10vmin" }}
              >
                <Sidebar>
                  <Seriesnav series={series} beforePost={beforePost} afterPost={afterPost}/>
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
  query($pagePath: String!, $pageSeries: String) {
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
      series
      seriesNum
    }
    seriesNeighbors: allContentfulBlogPost(
      filter: { series: { eq: $pageSeries } }
      sort: { fields: seriesNum, order: ASC }
    ) {
      nodes {
        title
        slug
        seriesNum
      }
    }
  }
`
