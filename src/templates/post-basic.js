import React from "react"
import { Link, graphql } from "gatsby"
import HyvorTalk from "hyvor-talk-react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
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

  function makeSeriesMarker(post, right) {
    if (pageContext.pageSeries) {
      return (
        post && (
            <Link to={post.slug}>{post.title}</Link>
        )
      )
    }
  }

  var toc = body.childMarkdownRemark.tableOfContents

  var beforePost = {}
  var afterPost = {}
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
                     {series && <div
                      className={
                        "subtitle has-background-warning has-text-grey-darker " +
                        postStyles.Subtitle
                      }
                    >
                      {series}
                    </div>}
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
                style={{ position: "sticky", top: "10vmin", bottom: "25vmin" }}
              >
                <Sidebar>
                  <Toc src={toc} />
                  <Projectfiles src={projectfiles} />
                </Sidebar>
                <div className='level'>
                  <div className='level-left'>
                    <div className='level-item button'>{makeSeriesMarker(beforePost)}</div>
                  </div>
                  <div className='level-right'>
                    <div className='level-item button'>{makeSeriesMarker(afterPost)}</div>
                  </div>
                </div>
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
