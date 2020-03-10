import React from "react"
import { graphql } from "gatsby"
import * as random from "random"

import Layout from "../components/layout"

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

  // function getRandomPost() {
  //   var idx = random.int(0, data.allPosts.edges.length - 1)
  //   return data.allPosts.edges[idx].node
  // }

  function getImageFromPost(post) {
    var defaultImg = "https://bulma.io/images/placeholders/1280x960.png;"
    return post && post.image ? post.image.file.url : defaultImg
  }

  var freshPost = getNewestPost()
  var insiderPost = getNewestInsiderPost()

  return (
    <Layout>
      <div class="tile is-ancestor">
        <div class="tile is-vertical">
          <div class="tile">
            <div class="tile is-parent is-9">
              <div class="tile is-child card has-background-grey">
                <div class="card-image">
                  <figure class="image is-5by3">
                    <img src={getImageFromPost(freshPost)} />
                  </figure>
                </div>
                <div class="card-header">
                  <div class="card-header-title">{freshPost.title}</div>
                </div>
              </div>
            </div>
            <div class="tile is-parent is-vertical">
              <div class="tile is-child card has-background-grey">
                <div class="card-image">
                  <figure class="image is-5by4">
                    <img src={getImageFromPost(insiderPost)} />
                  </figure>
                </div>
                <div class="card-header">
                  <div class="card-header-title">{insiderPost.title}</div>
                </div>
              </div>
              <div class="tile is-child card has-background-grey">
                <div class="card-image">
                  <figure class="image is-5by4">
                    <img
                      src="https://steamcdn-a.akamaihd.net/steam/apps/367520/ss_d5b6edd94e77ba6db31c44d8a3c09d807ab27751.1920x1080.jpg?t=1577747500"
                      alt="stuff"
                    />
                  </figure>
                </div>
                <div class="card-header">
                  <div class="card-header-title">Editorial</div>
                </div>
              </div>
            </div>
          </div>
          <div class="tile">
            <div class="tile is-parent is-4">
              <div class="tile is-child card has-background-grey">
                <div class="card-image">
                  <figure class="image is-5by4">
                    <img
                      src="https://files.ayumilove.net/games/maplestory2/guide/beginner/MapleStory2_Beginner_Guide_9.jpg"
                      alt="stuff"
                      style={{objectFit: 'cover'}}
                    />
                  </figure>
                </div>
                <div class="card-header">
                  <div class="card-header-title">Beginner's Guide</div>
                </div>
              </div>
            </div>
            <div class="tile is-parent is-8">
              <div class="tile is-child card has-background-grey">
                <div class="card-image">
                  <figure class="image is-3by1">
                    <img
                      src="https://www.howtogeek.com/wp-content/uploads/2018/08/shutterstock_407554567.jpg"
                      alt="Random banner"
                      style={{objectFit: 'cover'}}
                    />
                  </figure>
                </div>
                <div class="card-header">
                  <div class="card-header-title">Random</div>
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
  }
`
