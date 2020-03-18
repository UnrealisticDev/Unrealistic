import React from "react"
import { Link } from "gatsby"

export default ({ series, beforePost, afterPost }) => {
  function makeSeriesMarker(post, after) {
    return (
      post && (
        <Link to={post.slug}>
          <div class="button has-background-grey-lighter">
            {after ? ">" : "<"}
          </div>
        </Link>
      )
    )
  }

  return (
    <>
      {series && (
        <div class="card has-background-grey-lighter">
          <div class="card-content">
            <div class="content">
              <div className="level">
                {beforePost && (
                  <div className="level-left">
                    <div className="level-item">
                      {makeSeriesMarker(beforePost)}
                    </div>
                  </div>
                )}
                <div
                  className="level-item has-text-centered title"
                  style={{ wordWrap: "break-word" }}
                >
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
            </div>
          </div>
        </div>
      )}
    </>
  )
}
