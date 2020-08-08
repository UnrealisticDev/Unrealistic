/* eslint-disable */
import React from "react";
import router from "../scripts/router";
import Searchbar from "./searchbar";

import logo from "../images/logo.png";

import "./header.scss";

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
        <input type="checkbox" id="nav-toggle-state" />

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/">
              Home
            </a>
            <a className="navbar-item" href="/articles/">
              Articles
            </a>
            <div className="navbar-item has-dropdown is-hoverable" href="/">
              <a href="" className="navbar-link">
                Products
              </a>
              <div className="navbar-dropdown">
                <a
                  href={router.getProductSlug("remapt") + '/'}
                  className="navbar-item"
                >
                  Remapt
                </a>
                <a
                  href={router.getProductSlug("prefixed") + '/'}
                  className="navbar-item"
                >
                  Prefixed
                </a>
              </div>
            </div>
            <a className="navbar-item" href="/about/">
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
