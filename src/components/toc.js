import React from "react"

import styles from "./toc.module.scss"

export default ({ src }) => {
  if (src) {
    // return (
    //   <div className="card">
    //     <div className="card-content">
    //       <div className={styles.Container}>
    //         <div className={"title " + styles.Title}>Table of Contents</div>
    //         <div
    //           className={styles.List}
    //           dangerouslySetInnerHTML={{ __html: src }}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // )
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
