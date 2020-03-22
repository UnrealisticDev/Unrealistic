/* eslint-disable */
import React, { useState } from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

export default ({ series, seriesNeighbors, beforePost, afterPost }) => {
  const [seriesOpen, setSeriesOpen] = useState(false)
  const [seriesList, setSeriesList] = useState([])

  function toggleSeriesList() {
    var mylist = []

    if (!seriesOpen) {
      for (var i = 0; i < seriesNeighbors.length; ++i) {
        const neighbor = seriesNeighbors[i]

        mylist.push(
          <Link to={neighbor.slug}>
            <div className="content">
              <a
                style={{
                  width: "100%",
                  justifyContent: "left",
                  color: "#363636 !important",
                }}
                href="javascript:;"
              >
                {neighbor.seriesNum + 1 + ". " + neighbor.title}
              </a>
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
        <a
          onClick={() => toggleSeriesList()}
          onKeyDown={e => {
            if (e.key === "Return") toggleSeriesList()
          }}
          href="javascript:;"
        >
          <div className="card">
            <div className="card-content">
              <div className="content">
                <div className="level is-mobile">
                  <div className="level-left">
                    <div className="level-item">
                      {beforePost && (
                        <Link to={beforePost.slug}>
                          <FontAwesomeIcon icon={faChevronLeft} />
                        </Link>
                      )}{" "}
                    </div>
                  </div>
                  <div
                    className="level-item has-text-centered"
                    style={{ margin: 0 }}
                  >
                    <div
                      className="title"
                      style={{ fontSize: "calc(12px + .75vw)" }}
                    >
                      {series}
                    </div>
                  </div>
                  <div className="level-right">
                    <div className="level-item">
                      {afterPost && (
                        <Link to={afterPost.slug}>
                          <FontAwesomeIcon icon={faChevronRight} />
                        </Link>
                      )}{" "}
                    </div>
                  </div>
                </div>
                {seriesList}
              </div>
            </div>
          </div>
        </a>
      )}
    </>
  )
}
