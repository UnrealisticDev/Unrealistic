import React from "react"
import { graphql } from "gatsby"
import * as random from "random"

import Layout from "../components/layout"
import Widget from "../components/widget"

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

  function getImageFromPost(post) {
    var defaultImg = "https://bulma.io/images/placeholders/1280x960.png;"
    return post && post.image ? post.image.file.url : defaultImg
  }

  var freshPost = getNewestPost()
  var insiderPost = getNewestInsiderPost()
  var editorPost = data.editorPosts.nodes[0];

  return (
    <Layout title='Unrealistic'>
      <div>
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
                    to={freshPost.slug}
                  />
                </div>
              </div>
            </div>
            <div class="tile">
              <div class="tile is-parent is-4">
                <div class="tile is-child">
                  <Widget
                    to="/"
                    title="No better place to start!"
                    subtitle="Beginner's Guide"
                    image="https://files.ayumilove.net/games/maplestory2/guide/beginner/MapleStory2_Beginner_Guide_9.jpg"
                  />
                </div>
              </div>
              <div class="tile is-parent">
                <div class="tile is-child">
                  <Widget
                    to={getRandomPost().slug}
                    title="Random"
                    subtitle="Try something new!"
                    image="https://www.howtogeek.com/wp-content/uploads/2018/08/shutterstock_407554567.jpg"
                  />
                </div>
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
          createdAt(difference: "minutes")
          image {
            file {
              url
            }
          }
        }
      }
    }
    insiderPosts: allContentfulBlogPost(filter: { tags: { in: "insider" } }) {
      edges {
        node {
          slug
          title
          createdAt(difference: "minutes")
          image {
            file {
              url
            }
          }
        }
      }
    }
    editorPosts: allContentfulBlogPost(filter: {tags: {in: "editor"}}, sort: {fields: createdAt, order: DESC}) {
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
