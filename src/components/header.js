/* eslint-disable */
import React from "react";
import {Link} from 'gatsby'
import styled from "styled-components";

import router from "../scripts/router";
import Searchbar from "./searchbar";

import logo from "../images/logo.png";

const Toggle = styled.input`
  &#nav-toggle-state {
    display: none;
  }

  &#nav-toggle-state:checked ~ .navbar-menu {
    display: block;
  }
`;

const ProductLink = styled(Link)`

`

export default () => {
  return (
    <nav
      className="navbar is-fixed-top is-transparent is-light"
      role="navigation"
      aria-label="main navigation"
      style={{ boxShadow: "0 2px 2px -2px rgba(0,0,0,.2)" }}
    >
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={logo} alt="logo" />
          </a>

          <label
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            htmlFor="nav-toggle-state"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </label>
        </div>
        <Toggle type="checkbox" id="nav-toggle-state" />

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/">
              Home
            </a>
            <a className="navbar-item" href="/posts">
              Library
            </a>
            <div className="navbar-item has-dropdown is-hoverable" href="/">
              <div className="navbar-link">
                Products
              </div>
              <div className="navbar-dropdown">
                <ProductLink
                  href={router.getProductSlug("remapt")}
                  className="navbar-item"
                >
                  Remapt
                </ProductLink>
                <ProductLink
                  href={router.getProductSlug("prefixed")}
                  className="navbar-item"
                >
                  Prefixed
                </ProductLink>
                <ProductLink
                  href={router.getProductSlug("cursory")}
                  className="navbar-item"
                >
                  Cursory
                </ProductLink>
              </div>
            </div>
            <a className="navbar-item" href="/about">
              About
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <Searchbar />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
