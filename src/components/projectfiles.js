import React from "react";

import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./projectfiles.module.scss";

export default function ProjectFiles({ src }) {
  return src ? (
    <div className={"card has-background-grey-lighter " + styles.Card}>
      <a href={src} target="_blank" rel="noopener noreferrer">
        <div className="card-content">
          <div className="content">
            <div className="level is-mobile">
              <div className="level-left">
                <div className="level-item menu-label">
                  <div>Project Files</div>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  ) : null;
}
