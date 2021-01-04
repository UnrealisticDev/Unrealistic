/* eslint-disable no-useless-concat */
import React from "react";
import styled from 'styled-components'

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Form = styled.form`
  & input.input {
    background-color: lightgrey !important;
    color: #171716;
  }

  & textarea {
    background-color: lightgrey !important;
  }
  
  & input.input::placeholder, textarea::placeholder {
    color: #575754 !important;
  }
`

const Title = styled.h2`
    @font-face {
    font-family: "basic-sans";
    src: url("https://use.typekit.net/af/fa9ffd/00000000000000003b9b0438/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3")
        format("woff2"),
      url("https://use.typekit.net/af/fa9ffd/00000000000000003b9b0438/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3")
        format("woff"),
      url("https://use.typekit.net/af/fa9ffd/00000000000000003b9b0438/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n9&v=3")
        format("opentype");
    font-style: normal;
    font-weight: 900;
    font-display: auto;
  }

  font-family: "basic-sans", sans-serif;
`

function BulmaControl({ children, name, hasLeftIcons, hasRightIcons }) {
  function getControlClass() {
    var className = "control";
    className = className.concat(hasLeftIcons ? " " + "has-icons-left" : "");
    className = className.concat(hasRightIcons ? " " + "has-icons-right" : "");
    return className;
  }

  return (
    <div className="field">
      <label className="label">{name}</label>
      <div className={getControlClass()}>{children}</div>
    </div>
  );
}

export default () => {
  return (
    <Form name="hireme" method="POST" netlify action="/success/">
      <input type="hidden" name="form-name" value="hireme" />
      <Title className="title is-size-3">Now Accepting New Projects</Title>
      <div className="columns is-variable is-1">
        <div className="column">
          <BulmaControl name="First Name">
            <input
              className="input"
              type="text"
              placeholder="John"
              name="firstname"
            />
          </BulmaControl>
        </div>
        <div className="column">
          <BulmaControl name="Last Name">
            <input
              className="input"
              type="text"
              placeholder="Smith"
              name="lastname"
            />
          </BulmaControl>
        </div>
      </div>
      <BulmaControl name="Email" hasLeftIcons>
        <input
          className="input"
          type="email"
          placeholder="johnsmith@gmail.com"
          name="email"
        />{" "}
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
      </BulmaControl>
      <BulmaControl name="Project description">
        <textarea
          className="textarea"
          name="projectdescription"
          placeholder="I want to make..."
        />
      </BulmaControl>
      <BulmaControl>
        <button className={"button is-info is-fullwidth"} type="submit">
          Submit
        </button>
      </BulmaControl>
    </Form>
  );
};
