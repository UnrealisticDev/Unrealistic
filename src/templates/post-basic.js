import React from "react"
import { Link, graphql } from "gatsby"
import HyvorTalk from "hyvor-talk-react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar"
import Seriesnav from "../components/seriesnav"
import Toc from "../components/toc"
import Projectfiles from "../components/projectfiles"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

import "../styles/code.scss"
import styles from "./post-basic.module.scss"

export default ({ data, pageContext }) => {
  const {
    title,
    image,
    body,
    projectfiles,
    series,
    seriesNum,
  } = data.contentfulBlogPost

  const { seriesNeighbors } = data

  var toc = body.childMarkdownRemark.tableOfContents

  var beforePost = null
  var afterPost = null
  if (series) {
    for (var i = 0; i < seriesNeighbors.nodes.length; ++i) {
      if (seriesNum - 1 === i) {
        beforePost = seriesNeighbors.nodes[i]
      }
      if (seriesNum + 1 === i) {
        afterPost = seriesNeighbors.nodes[i]
      }
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
                    <div className={"title " + styles.Title}>{title}</div>
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
                      className={styles.Markdown}
                      dangerouslySetInnerHTML={{
                        __html: body.childMarkdownRemark.html,
                      }}
                    />
                    <div class="level">
                      <div class="level-right">
                        <div class="level-item">
                          {beforePost && (
                            <Link to={beforePost.slug} className={styles.SeriesNavInline}>
                              <div class="level is-mobile">
                                <div class="level-item">
                                  <FontAwesomeIcon icon={faChevronLeft} />
                                </div>
                                <div class="level-item">
                                  {beforePost.title}
                                </div>
                              </div>
                            </Link>
                          )}{" "}
                        </div>
                      </div>
                      <div class="level-left">
                        <div class="level-item">
                          {afterPost && (
                            <Link to={afterPost.slug} className={styles.SeriesNavInline}>
                              <div class="level is-mobile">
                                <div class="level-item">
                                  {afterPost.title}
                                </div>
                                <div class="level-item">
                                  <FontAwesomeIcon icon={faChevronRight} />
                                </div>
                              </div>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr style={{ marginTop: "8vmin", marginBottom: "8vmin" }} />
                    <HyvorTalk.Embed websiteId={292} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {(toc || projectfiles || beforePost || afterPost) && (
            <div className="column is-3">
              {(beforePost || afterPost) && (
                <div class="box has-background-light">
                  <Sidebar>
                    <Seriesnav
                      series={series}
                      seriesNeighbors={seriesNeighbors.nodes}
                      beforePost={beforePost}
                      afterPost={afterPost}
                    />
                  </Sidebar>
                </div>
              )}
              {(toc || projectfiles) && (
                <div
                  className="box has-background-light"
                  style={{ position: "sticky", top: "10vmin" }}
                >
                  <Sidebar>
                    <Toc src={toc} />
                    <Projectfiles src={projectfiles} />
                  </Sidebar>
                </div>
              )}{" "}
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
