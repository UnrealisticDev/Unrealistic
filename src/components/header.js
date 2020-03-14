/* eslint-disable */
import React from "react"

import logo from "../images/logo.png"

import "./header.scss"

export default () => {
  return (
    <nav
      class="navbar is-fixed-top is-transparent is-light"
      role="navigation"
      aria-label="main navigation"
      style={{ boxShadow: "0 2px 2px -2px rgba(0,0,0,.2)" }}
    >
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img src={logo} alt="logo" />
          </a>

          <label
            role="button"
            class="navbar-burger burger"
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

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href="/">
              Home
            </a>

            <a class="navbar-item" href="/articles/">
              Articles
            </a>
          </div>

          <div class="navbar-end">
            <div class="navbar-item is-hidden-mobile" id="site-descriptor">
              Welcome to Unrealistic: A place to learn about Unreal Engine 4,
              gamedev, and chasing your dreams
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
