import React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Overlord from "../components/overlord"
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
                    <Col lg={9} xs={12}>
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
                                        src={image.file.url}
                                        alt=""
                                        fluid
                                        style={{
                                            objectFit: "cover",
                                            maxHeight: "70vh",
                                        }}
                                    ></Card.Img>
                                    <h1
                                        className={postStyles.title}
                                        // style={{
                                        //     position: "absolute",
                                        //     bottom: 0,
                                        //     left: 0,
                                        //     backgroundColor: "#1D1D1D",
                                        //     margin: 0,
                                        //     padding: 5,
                                        //     fontSize: "64px",
                                        // }}
                                    >
                                        {title}
                                    </h1>
                                </div>
                                <Card.ImgOverlay
                                    style={{ margin: 200, textAlign: "center" }}
                                ></Card.ImgOverlay>
                            </Card.Body>
                            <Card.Body className="py-0">
                                <Container className="p-0">
                                    <Row className="p-0">
                                        <Col
                                            className="mx-2 p-0"
                                            lg={8}
                                            className={postStyles.markdown}
                                        >
                                            <div dangerouslySetInnerHTML={{__html: body.childMarkdownRemark.html}}/>
                                        </Col>
                                        <Col className="m-0 mx-2 p-0 d-xs-none">
                                            <Projfiles />
                                            {/* <Toc src={data.contentfulBlogPost.body.childMarkdownRemark.tableOfContents} /> */}
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
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
