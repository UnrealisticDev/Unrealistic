import React from "react"
import { graphql, Link } from "gatsby"

import Overlord from "../components/overlord"

import "../styles/global.scss"
import localStyles from "./articles.module.scss"

export default ({ data }) => {
  return (
    <Overlord title="Articles">
      <div class='columns is-multiline is-desktop'>
        {data.allContentfulBlogPost.nodes.map(({ slug, title, image }) => {
          return (
            <div class='column is-4 is-primary'>
                <Link to={slug}>
                  <div class='card is-primary'>
                    <div class="card-image">
                      <figure class="image is-4by3">
            {/*<img src="https://versions.bulma.io/0.5.3/images/placeholders/1280x960.png" alt="Placeholder image">*/}
                      </figure>
                     </div>
                    <div class='card-content'>
                      <div class='content'>
                         {title}
                      </div>
                    </div>
                  </div>
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
