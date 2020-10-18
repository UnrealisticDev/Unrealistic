import React from "react";
import styled from 'styled-components'

import styles from "./toc.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const ToggleWrapper = styled.a`
  color: #363636;
  &:hover {
    color: #209cee;
  }
`;

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
        <div style={{ marginBottom: "1rem" }}>
          <ToggleWrapper
            className="level is-mobile"
            onClick={this.toggleExpansion}
            onKeyPress={e => {
              if (e.key === "Return") this.toggleExpansion();
            }}
            role="button"
            tabIndex="0"
            style={{ marginBottom: "1rem" }}
          >
            <div className="level-left">
              <p className="menu-label">Contents</p>
            </div>
            <div className="level-right">
              <FontAwesomeIcon icon={this.state.expanded ? faMinus : faPlus} />
            </div>
          </ToggleWrapper>
          {this.state.expanded && (
            <ul className={"menu-list " + styles.List}>
              <div dangerouslySetInnerHTML={{ __html: this.props.src }} />
            </ul>
          )}
        </div>
      </>
    ) : null;
  }
}

export default TOC;
