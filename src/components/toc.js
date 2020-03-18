import React from "react"

import styles from "./toc.module.scss"

export default ({ src }) => {
  if (src) {
    return (
      <div className="card">
        <div className="card-content">
          <div className="title">Table of Contents</div>
          <div>
            <div
              className={styles.List}
              dangerouslySetInnerHTML={{ __html: src }}
            />
          </div>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}
