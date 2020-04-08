/* eslint-disable */
import React, { useState } from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

import styles from './seriesnav.module.scss'

export default ({ series, seriesNeighbors, beforePost, afterPost, startNum }) => {
  const [seriesOpen, setSeriesOpen] = useState(false)
  const [seriesList, setSeriesList] = useState([])

  function toggleSeriesList() {
    var mylist = []

    if (!seriesOpen) {
      for (var i = 0; i < seriesNeighbors.length; ++i) {
        const neighbor = seriesNeighbors[i]

        mylist.push(
          <Link
            to={neighbor.slug}
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
                <div className="level is-mobile" style={{margin: 0}}>
                  <div className="level-left">
                    <div className="level-item">
                      {beforePost && (
                        <Link to={beforePost.slug} style={{ color: "#EAAA03" }}>
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
                      style={{ fontSize: "calc(12px + .8vw)" }}
                    >
                      {"Series"}
                    </div>
                  </div>
                  <div className="level-right">
                    <div className="level-item">
                      {afterPost && (
                        <Link to={afterPost.slug} style={{ color: "#EAAA03" }}>
                          <FontAwesomeIcon icon={faChevronRight} />
                        </Link>
                      )}{" "}
                    </div>
                  </div>
                </div>
                <ol style={{padding: 0}} start={startNum}>
                  {seriesList}
                </ol>
              </div>
            </div>
          </div>
        </a>
      )}
    </>
  )
}
