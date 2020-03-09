import React from "react"
import { graphql, Link } from "gatsby"

import Overlord from "../components/overlord"

import "../styles/global.scss"
import localStyles from "./articles.module.scss"

export default ({ data }) => {
  return (
    <Overlord title="Articles">
      <div class='columns'>
        {data.allContentfulBlogPost.nodes.map(({ slug, title, image }) => {
          return (
            <div class='column is-4'>
                <Link to={slug}>
                    <Card style={{height: '100%'}}>
            {/*<Card.Image src={image.file.url} />*/}
                      <Card.Content>
                        <Heading>{title}</Heading>
                      </Card.Content>
                    </Card>
                </Link>
            </div>
          )
        })}
      </div>
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
