import React from "react"

import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import lStyles from "./projectfiles.module.scss"

export default ({ src }) => {
  if (src) {
    return (
      <div className={"card has-background-grey-lighter " + lStyles.Card}>
        <a href={src} target="_blank" rel="noopener noreferrer">
          <div class="card-content">
            <div class="content">
              <div class="level">
                <div class="subtitle" style={{ margin: 0 }}>
                  Project Files
                </div>
                <FontAwesomeIcon icon={faExternalLinkAlt}/>
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
