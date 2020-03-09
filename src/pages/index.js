import React from "react"
import { graphql } from "gatsby"
import * as random from "random"

import "bootstrap/dist/css/bootstrap.css"
import { Tile, Heading, Card, Container, Content} from "react-bulma-components"

import Overlord from "../components/overlord"

export default ({ data }) => {

  console.log(data.allPosts);
  // function getNewestPost() {
  //   var closestDiff = 99999999
  //   var closestDiffIdx = -1
  //   for (var i = 0; i < data.allPosts.edges.length; ++i) {
  //     var post = data.allPosts.edges[i].node
  //     if (post.createdAt !== null && Number(post.createdAt) < closestDiff) {
  //       closestDiff = post.createdAt
  //       closestDiffIdx = i
  //     }
  //   }

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

  // var freshPost = getNewestPost()
  // var insiderPost = getNewestInsiderPost()

  return (
    <Overlord>
      <Tile kind="ancestor">
        <Tile>
          <Tile vertical>
            <Tile>
              <Tile size={9}>
                <Tile kind="parent">
                  <Tile renderAs="article" kind="child">
                    <Content>
                      {/* <img src={freshPost.image.file.url} style={{margin: 0}}/> */}
                    </Content>
                  </Tile>
                </Tile>
              </Tile>
              <Tile vertical kind="parent">
                <Tile renderAs="article" kind="child">
                  <img src="https://images.wallpaperscraft.com/image/texture_relief_3d_156496_1920x1080.jpg" />
                  <Heading>Titles</Heading>
                  <Heading subtitle>Lols</Heading>
                </Tile>
                <Tile renderAs="article" kind="child">
                  <img src="https://images.wallpaperscraft.com/image/texture_relief_3d_156496_1920x1080.jpg" />
                </Tile>
              </Tile>
            </Tile>
            <Tile kind="parent">
              <Tile renderAs="article" kind="child" size={4}>
                <img src="https://i.ytimg.com/vi/Yf9tQKheHbk/maxresdefault.jpg" />
              </Tile>
              <Tile renderAs="article" kind="child">
                <img
                  src="https://images.wallpaperscraft.com/image/texture_relief_3d_156496_1920x1080.jpg"
                  style={{ objectFit: "cover" }}
                />
              </Tile>
            </Tile>
          </Tile>
          <Tile kind="parent" size={3}>
            <Tile kind="child">
              <Container // tip of the week
                className="align-self-center px-lg-3 px-xs-0"
                style={{ color: "#404040" }}
              >
                <h2
                  style={{
                    textAlign: "center",
                    width: "100%",
                    borderBottom: "2px solid #EAAA03",
                    color: "#FF9900",
                  }}
                >
                  Tip of the Week
                </h2>
                <p style={{ textAlign: "justify" }} className="h-100">
                  {data.site.siteMetadata.tipOfTheWeek}
                </p>
              </Container>
            </Tile>
          </Tile>
        </Tile>
      </Tile>
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
