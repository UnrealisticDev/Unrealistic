import React from "react"
import { graphql, Link } from "gatsby"

import { Card, Container, Image } from "react-bootstrap"

import Overlord from "../components/overlord"

import "bootstrap/dist/css/bootstrap.css"
import localStyles from "./articles.module.scss"

export default ({ data }) => {
    return (
        <Overlord>
            Coming soon...
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