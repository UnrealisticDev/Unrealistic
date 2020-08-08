import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

import styles from "./widget.module.scss";

export default ({ title, subtitle, flair, image, to, fullheight }) => {
  function getTitle() {
    if (title) {
      return <div className="title">{title}</div>;
    }
  }

  function getSubtitle() {
    if (subtitle) {
      return <div className="">{subtitle}</div>;
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
          <div className={styles.ImageContainer}>
            {image ? (
              image.fluid ? (
                <Img fluid={image ? image.fluid : null} />
              ) : (
                <img src={image} alt="Splash feature" />
              )
            ) : null}
            {flair && <div className={styles.Flair}>{flair}</div>}
          </div>
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
