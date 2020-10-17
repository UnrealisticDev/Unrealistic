import React from "react";

import styles from "./toc.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

class TOC extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
    this.toggleExpansion = this.toggleExpansion.bind(this);
  }

  toggleExpansion(event) {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    return this.props.src ? (
      <>
        
        
        <div
          className="level is-mobile"
          onClick={this.toggleExpansion}
          onKeyPress={e => {
            if (e.key === "Return") this.toggleExpansion();
          }}
          role="button"
          tabIndex="0"
        >
          <div className="level-left">
            <p className="menu-label">Contents</p>
          </div>
          <div className="level-right">
            <FontAwesomeIcon
              icon={this.state.expanded ? faMinus : faPlus}
            />
          </div>
        </div>
        {this.state.expanded && (
          <ul className={"menu-list " + styles.List}>
            <div dangerouslySetInnerHTML={{ __html: this.props.src }} />
          </ul>
        )}
      
      
      </>
    ) : null;
  }
}

export default TOC;
