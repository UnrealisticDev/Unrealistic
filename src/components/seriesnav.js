import React from "react"
import { Link } from "gatsby"

export default ({ series, beforePost, afterPost }) => {
  function makeSeriesMarker(post, after) {
    return (
      post && (
        <Link to={post.slug}>
          <div class="button is-light">{after ? ">" : "<"}</div>
        </Link>
      )
    )
  }

  return (
    <>
      {series && (
        <div className="level">
          {beforePost && (
            <div className="level-left">
              <div className="level-item">{makeSeriesMarker(beforePost)}</div>
            </div>
          )}

          <div className="level-item has-text-centered" style={{ wordWrap: "break-word" }}>
            <div>{series}</div>
          </div>

          {afterPost && (
            <div className="level-right">
              <div className="level-item">
                {makeSeriesMarker(afterPost, true)}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
