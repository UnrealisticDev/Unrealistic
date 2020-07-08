/* eslint-disable */
import React from "react"
import router from "../scripts/router"

import logo from "../images/logo-new.png"

import "./header.scss"

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
            <div class="navbar-item has-dropdown is-hoverable" href="/">
              <a href="" class="navbar-link">
                Products
              </a>
              <div class="navbar-dropdown has-background-light">
                <a href={router.getProductSlug("remapt")} class="navbar-item">
                  Remapt
                </a>
                <a href={router.getProductSlug("prefixed")} class="navbar-item">
                  Prefixed
                </a>
              </div>
            </div>
            <a className="navbar-item" href="/about/">
              About
            </a>
          </div>

          <div className="navbar-end"></div>
        </div>
      </div>
    </nav>
  )
}
