import React from "react"

import lStyles from "./projectfiles.module.scss"

export default ({ src }) => {
  if (src) {
    return (
      <div className={"card has-background-grey-lighter " + lStyles.Card}>
        <a href={src} target="_blank">
          <div class="card-content">
            <div class="content">
              <div class="subtitle">Project Files</div>
            </div>
          </div>
        </a>
      </div>
    )
  } else {
    return <></>
  }
}
