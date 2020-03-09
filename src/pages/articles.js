import React from "react"
import { graphql, Link } from "gatsby"

import Overlord from "../components/overlord"

import {
  Heading,
  Card,
  Columns
} from "react-bulma-components"

import localStyles from "./articles.module.scss"

export default ({ data }) => {
  return (
    <Overlord title="Articles">
      {/* <Columns multiline>
        {data.allContentfulBlogPost.nodes.map(({ slug, title, image }) => {
          return (
            <Columns.Column size={4}>
                <Link to={slug}>
                    <Card style={{height: '100%'}}>
                      <Card.Image src={image.file.url} />
                      <Card.Content>
                        <Heading>{title}</Heading>
                      </Card.Content>
                    </Card>
                </Link>
            </Columns.Column>
          )
        })}
      </Columns> */}
    </Overlord>
  )
}

export const query = graphql`
  query {
    allContentfulBlogPost(sort: { fields: createdAt, order: DESC }) {
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
