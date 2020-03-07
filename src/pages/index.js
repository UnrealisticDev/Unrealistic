import React from "react"
import { graphql } from "gatsby"
import * as random from "random"

import "bootstrap/dist/css/bootstrap.css"

import Overlord from "../components/overlord"
import Widget from "../components/widget"

import { Container, Col, Row } from "react-bootstrap"

export default ({ data }) => {
  function getNewestPost() {
    var closestDiff = 99999999
    var closestDiffIdx = -1
    for (var i = 0; i < data.allPosts.edges.length; ++i) {
      var post = data.allPosts.edges[i].node
      if (post.createdAt !== null && Number(post.createdAt) < closestDiff) {
        closestDiff = post.createdAt
        closestDiffIdx = i
      }
    }

    return data.allPosts.edges[closestDiffIdx].node
  }

  function getNewestInsiderPost() {
    var closestDiff = 99999999
    var closestDiffIdx = -1
    for (var i = 0; i < data.insiderPosts.edges.length; ++i) {
      var post = data.insiderPosts.edges[i].node
      if (post.createdAt !== null && Number(post.createdAt) < closestDiff) {
        closestDiff = post.createdAt
        closestDiffIdx = i
      }
    }

    return data.insiderPosts.edges[closestDiffIdx].node
  }

  function getRandomPost() {
    var idx = random.int(0, data.allPosts.edges.length - 1)
    return data.allPosts.edges[idx].node
  }

  var freshPost = getNewestPost();
  var insiderPost = getNewestInsiderPost();

  return (
    <Overlord title='Unrealistic'>
      <div style={{ height: "80vh" }}>
        <Container fluid className="mt-0 mx-0 my-2 h-100">
          <Row className="h-100">
            <Col lg={9} xs={12}>
              <Row className="h-75">
                <Col lg={9} xs={12} className="pl-0 pr-1 mr-0">
                  <Widget
                    // title={getTitleFromSlug(getNewestPostSlug(data))}
                    title={freshPost.title}
                    subtitle="Fresh Off the Press"
                    to={freshPost.slug}
                    image={freshPost.image.file.url}
                  />
                </Col>
                <Col lg={3} xs={12} className="pl-1 pr-0 mr-0 w-100">
                  <Row className="mx-0 my-0 px-0 pb-1 h-50">
                    <Widget
                      title={insiderPost.title}
                      subtitle="Read up on the latest dev practices from industry professionals"
                      to={insiderPost.slug}
                      image={insiderPost.image.file.url}
                    />
                  </Row>
                  <Row className="mx-0 my-0 px-0 pt-1 h-50">
                    <Widget
                      title="Editorial"
                      subtitle="Dive into the Unreal Editor"
                      to="/content/Binding-Input-Code-Only"
                      image="https://www.onsetfacilities.com/wp-content/uploads/2019/07/Unreal-Engine-plugin-to-Cinema-4D.jpg"
                    />
                  </Row>
                </Col>
              </Row>
              <Row className="h-25 mt-2">
                <Col lg={4} xs={12} className="pl-0 pr-2">
                  <Widget
                    title="Beginner's Guide"
                    subtitle="No better place to start than the start"
                    to="/content/Binding-Input-Code-Only"
                    image="https://i.ytimg.com/vi/Yf9tQKheHbk/maxresdefault.jpg"
                  />
                </Col>
                <Col lg={8} xs={12} className="px-0">
                  <Widget
                    title="Random"
                    subtitle="Try something new!"
                    to={getRandomPost().slug}
                    image="https://images.wallpaperscraft.com/image/texture_relief_3d_156496_1920x1080.jpg"
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={3} xs={12} className="h-100 d-flex m-0 pr-0">
              <Container // tip of the week
                className="align-self-center px-5"
                style={{ color: "#404040" }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    width: "100%",
                    borderBottom: "2px solid #EAAA03",
                  }}
                >
                  Tip of the Week
                </h2>
                <p style={{ textAlign: "justify" }} className="h-100">
                  {data.site.siteMetadata.tipOfTheWeek}
                </p>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </Overlord>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        tipOfTheWeek
      }
    }
    allPosts: allContentfulBlogPost {
      edges {
        node {
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
    insiderPosts: allContentfulBlogPost(filter: {tags: {in: "insider"}}) {
      edges {
        node {
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
  }
`
