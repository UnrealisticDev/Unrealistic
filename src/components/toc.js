import React from "react"

import lStyles from "./toc.module.scss"

import { LoremIpsum } from "lorem-ipsum"
var lorem = new LoremIpsum()

export default ({ src }) => {
  return (
    <div className="card">
      <div class="card-content">
        <div className="title">Table of Contents</div>
        <div>
          <div
            className={lStyles.List}
            dangerouslySetInnerHTML={{ __html: src }}
          />
        </div>
      </div>
    </div>
  )
}
