import React from "react"
import { Link } from "gatsby"
import { Card } from "react-bootstrap"

import "bootstrap/dist/css/bootstrap.css"
import localStyles from "./widget.module.scss"

export default props => {
  function getImage() {
    if (props.image) {
      return <Card.Img src={props.image} className={localStyles.CardImg} />
    }
  }

  function getDescriptor() {
    if (props.descriptor) {
      return <Card.Text>{props.descriptor}</Card.Text>
    }
  }

  function getTitle() {
    if (props.title) {
      return <Card.Title className={localStyles.Title}>{props.title}</Card.Title>
    }
  }

  function getSubtitle() {
    if (props.subtitle) {
      return <Card.Subtitle className={localStyles.Subtitle}>{props.subtitle}</Card.Subtitle>
    }
  }

  return (
    <Link to={props.to} className="w-100">
      <Card
        className="h-100 w-100 m-0"
        variant="dark"
        style={{ backgroundColor: "#1D1D1D" }}
      >
        {getImage()}
        <Card.ImgOverlay className='d-flex m-0 p-0'>
          <div className={localStyles.TextContent + ' align-self-end'}>
            {getDescriptor()}
            {getTitle()}
            {getSubtitle()}
          </div>
        </Card.ImgOverlay>
      </Card>
    </Link>
  )
}
