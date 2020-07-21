import React from "react"

import styles from "./toc.module.scss"

export default ({ src }) => {
  if (src) {
    return (
      <>
        <p className="menu-label">Contents</p>
        <div
          className={styles.List}
          dangerouslySetInnerHTML={{ __html: src }}
        />
      </>
    )
  } else {
    return <></>
  }
}
