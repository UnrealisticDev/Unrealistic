import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

import styles from "./widget.module.scss";

export default ({
  title,
  subtitle,
  flair,
  descriptor,
  image,
  to,
  dims,
  fullheight
}) => {
  function getImage() {
    if (image) {
      if (image.fluid) {
        return (
          <div className="card-image">
            <Img fluid={image ? image.fluid : null} />
          </div>
        );
      } else {
        return <img src={image} alt="Splash" />;
      }
    } else {
      return null;
    }
  }

  function getTitle() {
    if (title) {
      return <div className="title">{title}</div>;
    }
  }

  function getSubtitle() {
    if (subtitle) {
      return <div className="subtitle">{subtitle}</div>;
    }
  }

  function getFlair() {
    if (flair) {
      return (
        <div
          className="subtitle has-background-warning has-text-grey-darker"
          style={{
            display: "inline-block",
            paddingRight: "1em",
            paddingLeft: "1em",
            paddingTop: ".2em",
            paddingBottom: ".2em",
            margin: "0"
          }}
        >
          {flair}
        </div>
      );
    }
  }

  function cHeight() {
    if (fullheight) {
      return styles.Height100;
    }
  }

  return (
    <div className={"box is-paddingless has-background-light " + cHeight()}>
      <Link to={to}>
        <div className={"card " + cHeight()}>
          {getImage()}
          {getFlair()}
          <div className="card-content">
            <div className="content">
              {getTitle()}
              {getSubtitle()}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
