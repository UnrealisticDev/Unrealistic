import React, { useState } from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

export default ({ series, seriesNeighbors, beforePost, afterPost }) => {
  // function makeSeriesMarker(post, after) {
  //   return (
  //     post && (
  //       <Link to={post.slug}>
  //         <div className="button has-background-grey-lighter">
  //           {after ? ">" : "<"}
  //         </div>
  //       </Link>
  //     )
  //   )
  // }

  const [seriesOpen, setSeriesOpen] = useState(false)
  const [seriesList, setSeriesList] = useState([])

  function toggleSeriesList() {
    var mylist = []

    if (!seriesOpen) {
      for (var i = 0; i < seriesNeighbors.length; ++i) {
        const neighbor = seriesNeighbors[i]

        mylist.push(
          <Link to={neighbor.slug}>
            <div class="content">
              <button className={"button is-white"} style={{ width: "100%", justifyContent: 'left'}}>
                <div>{(neighbor.seriesNum + 1) + '. ' + neighbor.title}</div>
              </button>
            </div>
          </Link>
        )
      }
    }
    setSeriesOpen(!seriesOpen)
    setSeriesList(mylist)
  }

  return (
    <>
      {series && (
        <div className="card" style={{ marginBottom: "1em" }}>
          <div className="card-content">
            <div className="content">
              <div class="level">
                <div
                  class="level-left"
                  style={{ maxWidth: "70%", overflowWrap: "break-word" }}
                >
                  <div class="level-item">
                    <div className="subtitle">{series}</div>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <button
                      href="#"
                      className="button is-white"
                      onClick={() => toggleSeriesList()}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
              </div>
              {seriesList}
              {/* <div className="level is-mobile">
                {beforePost && (
                  <div className="level-left">
                    <div className="level-item">
                      {makeSeriesMarker(beforePost)}
                    </div>
                  </div>
                )}
                <div className="level-item has-text-centered">
                  <div className="button has-background-grey-lighter">v</div>
                </div>
                {afterPost && (
                  <div className="level-right">
                    <div className="level-item">
                      {makeSeriesMarker(afterPost, true)}
                    </div>
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
