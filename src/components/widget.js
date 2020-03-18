import React from "react"
import { Link } from "gatsby"

import styles from "./widget.module.scss"

export default ({ title, subtitle, descriptor, image, to, dims, fullheight }) => {
  function getImage() {
    if (image) {
      return (
        <div className="card-image">
          <figure className="image is-5by3">
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
      return <div className="title">{title}</div>
    }
  }

  function getSubtitle() {
    if (subtitle) {
      return (
        <div
          className="subtitle has-background-warning has-text-grey-darker"
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
        <div className={"card " + cHeight()}>
          {getImage()}
          {getSubtitle()}
          <div className="card-content">
            <div className="content">
              {getDescriptor()}
              {getTitle()}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
