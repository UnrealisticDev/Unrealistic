import React from "react"
import { graphql } from "gatsby"
import * as random from "random"

import Layout from "../components/layout"
import SEO from '../components/seo'
import Widget from "../components/widget"

import logo from "../images/logo-name.png"

export default ({ data }) => {
  function getRandomPost() {
    var idx = random.int(0, data.allPosts.edges.length - 1)
    return data.allPosts.edges[idx].node
  }

  function getImageFromPost(post) {
    var defaultImg = "https://bulma.io/images/placeholders/1280x960.png;"
    return post && post.image ? post.image.file.url : defaultImg
  }

  var freshPost = data.newestPosts.nodes[0]
  var insiderPost = data.insiderPosts.nodes[0]
  var editorPost = data.editorPosts.nodes[0]

  return (
    <Layout>
      <SEO title='Unrealistic'/>
      <div class="level">
        <div class="container">
          <div class="content has-text-centered">
            <figure class="image" style={{ maxWidth: "512px", marginLeft: 'auto', marginRight: 'auto', marginBottom: '.5vmin'}}>
              <img src={logo} alt="logo" />
            </figure>
              <p style={{fontStyle: 'italic'}}>
                A place to learn about Unreal Engine 4,<br/> gamedev, and chasing
                your dreams
              </p>
          </div>
        </div>
      </div>
      <div class="tile is-ancestor">
        <div class="tile is-vertical">
          <div class="tile">
            <div class="tile is-parent is-9">
              <div class="tile is-child">
                <Widget
                  title={freshPost.title}
                  subtitle="Fresh Off the Press"
                  image={getImageFromPost(freshPost)}
                  to={freshPost.slug}
                  maxheight
                />
              </div>
            </div>
            <div class="tile is-parent is-vertical">
              <div class="tile is-child">
                <Widget
                  title={insiderPost.title}
                  subtitle="Insider Insight"
                  image={getImageFromPost(insiderPost)}
                  to={insiderPost.slug}
                />
              </div>
              <div class="tile is-child">
                <Widget
                  title={editorPost.title}
                  subtitle="Editorial"
                  image={editorPost.image.file.url}
                  to={editorPost.slug}
                />
              </div>
            </div>
          </div>
          <div class="tile">
            <div class="tile is-parent is-4">
              <div class="tile is-child">
                <Widget
                  to={getRandomPost().slug}
                  title="Try something new!"
                  subtitle="Random"
                  image="https://cdn.vox-cdn.com/thumbor/2PaCKdhf1dUhQkcGE9P-pMwKcJQ=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/8587203/overwatch_loot_box.jpg"
                />
              </div>
            </div>
            <div class="tile is-parent">
              <div class="tile is-child">
                <Widget
                  to="/"
                  title="No better place to start!"
                  subtitle="Beginner's Guide"
                  image="https://files.ayumilove.net/games/maplestory2/guide/beginner/MapleStory2_Beginner_Guide_9.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
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
          image {
            file {
              url
            }
          }
        }
      }
    }
    newestPosts: allContentfulBlogPost(
      filter: { tags: { nin: ["insider", "editor"] } }
      sort: { fields: createdAt, order: DESC }
    ) {
      nodes {
        slug
        title
        image {
          file {
            url
          }
        }
      }
    }
    insiderPosts: allContentfulBlogPost(
      filter: { tags: { in: "insider" } }
      sort: { fields: createdAt, order: DESC }
    ) {
      nodes {
        slug
        title
        image {
          file {
            url
          }
        }
      }
    }
    editorPosts: allContentfulBlogPost(
      filter: { tags: { in: "editor" } }
      sort: { fields: createdAt, order: DESC }
    ) {
      nodes {
        slug
        title
        image {
          file {
            url
          }
        }
      }
    }
  }
`
