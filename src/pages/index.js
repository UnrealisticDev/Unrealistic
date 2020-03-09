import React from "react"
import { graphql } from "gatsby"
import * as random from "random"

import "../styles/global.scss"
import "bootstrap/dist/css/bootstrap.css"

import Overlord from "../components/overlord"



export default ({ data }) => {

 // console.log(data.allPosts);
 // function getNewestPost() {
 //      var closestDiff = 99999999
 //      var closestDiffIdx = -1
 //      for (var i = 0; i < data.allPosts.edges.length; ++i) {
 //      var post = data.allPosts.edges[i].node
 //      if (post.createdAt !== null && Number(post.createdAt) < closestDiff) {
 //        closestDiff = post.createdAt
 //        closestDiffIdx = i
 //      }
 //    }

  //   return data.allPosts.edges[closestDiffIdx].node
  // }

  // function getNewestInsiderPost() {
  //   var closestDiff = 99999999
  //   var closestDiffIdx = -1
  //   for (var i = 0; i < data.insiderPosts.edges.length; ++i) {
  //     var post = data.insiderPosts.edges[i].node
  //     if (post.createdAt !== null && Number(post.createdAt) < closestDiff) {
  //       closestDiff = post.createdAt
  //       closestDiffIdx = i
  //     }
  //   }

  //   return data.insiderPosts.edges[closestDiffIdx].node
  // }

  // function getRandomPost() {
  //   var idx = random.int(0, data.allPosts.edges.length - 1)
  //   return data.allPosts.edges[idx].node
  // }

  //  var freshPost = getNewestPost()
  // var insiderPost = getNewestInsiderPost()

  return (
    <Overlord>
      <div class='tile is-ancestor'>
        <div class='tile is-vertical'>  
          <div class='tile'>
            <div class='tile is-parent is-9'>
              <div class='tile is-child box'>
                1
              </div>
            </div>
            <div class='tile is-parent is-vertical'>
              <div class='tile is-child box'>
                2
              </div>
              <div class='tile is-child box'>
                3
              </div>
            </div>
          </div>
          <div class='tile is-parent is-12'>
            <div class='tile is-child box is-4'>
              4
            </div>
            <div class='tile is-child box is-8'>
              5
            </div>
          </div>
        </div>
      </div>
    </Overlord>
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
