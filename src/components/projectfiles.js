import React from "react"

import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import styles from "./projectfiles.module.scss"

export default ({ src }) => {
  if (src) {
    return (
      <div className={"card has-background-grey-lighter " + styles.Card}>
        <a href={src} target="_blank" rel="noopener noreferrer">
          <div className="card-content">
            <div className="content">
              <div className="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <div className={"subtitle"} style={{ margin: 0 }}>
                      Project Files
                    </div>
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <FontAwesomeIcon icon={faExternalLinkAlt}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    )
  } else {
    return <></>
  }
}
