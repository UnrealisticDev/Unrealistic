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
                {/* <div className="card-content">
                  <div className="content"></div>
                </div> */}
                <div style={{ position: "relative" }}>
                  <div className="card-image">
                    <figure className="image is-5by3">
                      <img
                        src={image ? image.file.url : ""}
                        alt="alt"
                        style={{ objectFit: "cover" }}
                      />
                    </figure>
                  </div>
                  <div
                    className={"title " + styles.Title}
                    style={{
                      position: "absolute",
                      bottom: ".5em",
                      right: ".5em",
                      color: '#EAAA03',
                      backgroundColor: 'rgb(64, 64, 64, .4)',
                      padding: '.5em',
                      justifyContent: 'end',
                      maxWidth: '85%',
                      borderBottom: '5px solid #EAAA03',
                    }}
                  >
                    {title}
                  </div>
                </div>
                <div className="card-content">
                  <div className="content">
                    <div
                      className={styles.Markdown}
                      dangerouslySetInnerHTML={{
                        __html: body.childMarkdownRemark.html,
                      }}
                    />
                    <div className="level">
                      <div className="level-right">
                        <div className="level-item">
                          {beforePost && (
                            <Link
                              to={beforePost.slug}
                              className={styles.SeriesNavInline}
                            >
                              <div className="level is-mobile">
                                <div className="level-item">
                                  <FontAwesomeIcon icon={faChevronLeft} />
                                </div>
                                <div className="level-item">
                                  {beforePost.title}
                                </div>
                              </div>
                            </Link>
                          )}{" "}
                        </div>
                      </div>
                      <div className="level-left">
                        <div className="level-item">
                          {afterPost && (
                            <Link
                              to={afterPost.slug}
                              className={styles.SeriesNavInline}
                            >
                              <div className="level is-mobile">
                                <div className="level-item">
                                  {afterPost.title}
                                </div>
                                <div className="level-item">
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
                <div className="box has-background-light">
                  <Sidebar>
                    <Seriesnav
                      series={series}
                      seriesNeighbors={seriesNeighbors.nodes}
                      beforePost={beforePost}
                      afterPost={afterPost}
                      startNum={seriesNeighbors.nodes[0].seriesNum}
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
                  </Sidebar>
                  <Projectfiles src={projectfiles} />
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
