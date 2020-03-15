import React from "react"
import { Link } from "gatsby"

import styles from "./widget.module.scss"

export default ({ title, subtitle, descriptor, image, to, dims, fullheight }) => {
  function getImage() {
    if (image) {
      return (
        <div class="card-image">
          <figure class="image is-5by3">
            <img
              src={image}
              alt="Post feature"
              style={{ objectFit: "cover" }}
            />
          </figure>
        </div>
      )
    }
  }

  function getDescriptor() {
    if (descriptor) {
      return <div>{descriptor}</div>
    }
  }

  function getTitle() {
    if (title) {
      return <div class="title">{title}</div>
    }
  }

  function getSubtitle() {
    if (subtitle) {
      return (
        <div
          class="subtitle has-background-warning has-text-grey-darker"
          style={{
            display: "inline-block",
            paddingRight: "1em",
            paddingLeft: "1em",
            paddingTop: ".2em",
            paddingBottom: ".2em",
            margin: '0'
          }}
        >
          {subtitle}
        </div>
      )
    }
  }

  function cHeight() {
    if (fullheight) {
      return styles.Height100;
    }
  }

  return (
    <div className={"box has-background-light " + cHeight()}>
      <Link to={to}>
        <div class={"card " + cHeight()}>
          {getImage()}
          {getSubtitle()}
          <div class="card-content">
            <div class="content">
              {getDescriptor()}
              {getTitle()}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
