/* eslint-disable */
import React, { useState } from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

import styles from "./seriesnav.module.scss"

export default ({
  series,
  seriesNeighbors,
  beforePost,
  afterPost,
  startNum,
}) => {
  const [seriesOpen, setSeriesOpen] = useState(false)
  const [seriesList, setSeriesList] = useState([])

  function toggleSeriesList() {
    var mylist = []

    if (!seriesOpen) {
      for (var i = 0; i < seriesNeighbors.length; ++i) {
        const neighbor = seriesNeighbors[i]

        mylist.push(
          <Link
            to={"../" + neighbor.slug}
            style={{
              justifyContent: "left",
            }}
          >
            <li href="javascript:;" className={styles.ListItem}>
              {neighbor.title}
            </li>
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
        <div className="card">
          <div className="card-content">
            <div className="content">
              <div className="level is-mobile" style={{ margin: 0 }}>
                <div className="level-left">
                  {beforePost && (
                    <div className="level-right">
                      <Link to={"../" + beforePost.slug}>
                        <div className="level-item button is-marginless is-white">
                          <FontAwesomeIcon
                            icon={faChevronLeft}
                            style={{ color: "#EAAA03" }}
                          />
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
                <div
                  className="level-item has-text-centered"
                  style={{ margin: 0 }}
                >
                  <div
                    class="button is-white"
                    onClick={() => toggleSeriesList()}
                    onKeyDown={e => {
                      if (e.key === "Return") toggleSeriesList()
                    }}
                    href="javascript:;"
                    style={{ flex: "1 0 auto" }}
                  >
                    <div
                      className="title"
                      style={{ fontSize: "calc(12px + .8vw)" }}
                    >
                      {"Series"}
                    </div>
                  </div>
                </div>
                {afterPost && (
                  <div className="level-right">
                    <Link to={"../" + afterPost.slug}>
                      <div className="level-item button is-marginless is-white">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          style={{ color: "#EAAA03" }}
                        />
                      </div>
                    </Link>
                  </div>
                )}
              </div>
              <ol
                style={{
                  padding: seriesList.length === 0 ? "0" : "2.5vmin",
                  margin: 0,
                }}
                start={startNum}
              >
                {seriesList}
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
