import React from "react"
import { Link } from "gatsby"

import localStyles from "./widget.module.scss"

export default props => {
  function getImage() {
    if (props.image) {
      return <div src={props.image} className={localStyles.CardImg} />
    }
  }

  function getDescriptor() {
    if (props.descriptor) {
      return <div>{props.descriptor}</div>
    }
  }

  function getTitle() {
    if (props.title) {
      return <div className={localStyles.Title}>{props.title}</div>
    }
  }

  function getSubtitle() {
    if (props.subtitle) {
      return <div className={localStyles.Subtitle}>{props.subtitle}</div>
    }
  }

  return (
    <Link to={props.to} className="w-100">
      <div
        className="h-100 w-100 m-0"
        variant="dark"
        style={{ backgroundColor: "#1D1D1D" }}
      >
        {getImage()}
        <div className='d-flex m-0 p-0'>
          <div className={localStyles.TextContent + ' align-self-end'}>
            {getDescriptor()}
            {getTitle()}
            {getSubtitle()}
          </div>
        </div>
      </div>
    </Link>
  )
}
