import React from "react"
import { graphql, Link } from "gatsby"

import { Card, Container, Image } from "react-bootstrap"

import Overlord from "../components/overlord"

import "bootstrap/dist/css/bootstrap.css"
import localStyles from "./articles.module.scss"

export default ({ data }) => {
    return (
        <Overlord>
            <Container className={localStyles.Box + " px-0 mx-0"}>
                {data.allContentfulBlogPost.nodes.map(({slug, title, image}) => {
                    return (
                    <Link to={slug} className={localStyles.Content}>
                        <Card className={localStyles.Card}>
                            <Card.Title className={localStyles.Title}>
                                {title}
                            </Card.Title>
                            {/* <Card.Subtitle className={localStyles.Subtitle}>
                                {post.frontmatter.date
                                    ? post.frontmatter.date
                                    : "01-23-4567"}
                            </Card.Subtitle> */}
                        </Card>
                        <Image
                            src={image.file.url}
                            className={localStyles.Image}
                        />
                    </Link>
                    )
                })}
            </Container>
        </Overlord>
    )
}

export const query = graphql`
    query {
        allContentfulBlogPost {
            nodes {
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
`
