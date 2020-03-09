import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Overlord from "../components/overlord"
import Sidebar from "../components/sidebar"
import Toc from "../components/toc"
import Projfiles from "../components/projfiles"
import { Card, Container, Row, Col } from "react-bootstrap"

import "bootstrap/dist/css/bootstrap.css"
import postStyles from "./post-basic.module.scss"

export default ({ data }) => {
  const { title, image, body } = data.contentfulBlogPost

  return (
    <Overlord title={title}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/abe5nxq.css"
        ></link>
      </Helmet>
      <Container className="p-0 mx-0 my-2" fluid>
        <Row>
          <Col/>
          <Col xs='12' lg='6' className="px-0">
            <Card
              text="light"
              style={{
                backgroundColor: "#1D1D1D",
                borderWidth: "0px",
              }}
            >
              <Card.Body>
                <div style={{ position: "relative" }}>
                  <Card.Img
                    variant="top"
    {*/src={image.file.url}*/}
                    alt=""
                    fluid
                    style={{
                      objectFit: "cover",
                      maxHeight: "70vh",
                    }}
                  ></Card.Img>
                </div>
              </Card.Body>
              <Card.Body className="py-0">
                <h1 className={postStyles.Title}>{title}</h1>

                <div
                  className={postStyles.Markdown}
                  dangerouslySetInnerHTML={{
                    __html: body.childMarkdownRemark.html,
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xs='12' lg='2' className="p-0 mx-lg-2 my-2 my-lg-0 d-lg-block">
            <Sidebar>
              <Container className="mb-0 mx-0 px-0">
                <Projfiles />
              </Container>
              <Container className="px-0 mt-2 d-none d-lg-block">
                <Toc
                  src={
                    data.contentfulBlogPost.body.childMarkdownRemark
                      .tableOfContents
                  }
                />
              </Container>
            </Sidebar>
          </Col>
          <Col/>
        </Row>
      </Container>
    </Overlord>
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
