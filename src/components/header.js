import React from "react"
import { Link } from "gatsby"

import logo from "../images/logo.png"

import './header.scss'

export default () => {

  return (
    <nav class="navbar is-fixed-top is-light" role="navigation" aria-label="main navigation" style={{boxShadow: '0 2px 2px 2px rgba(0,0,0,.2)'}}>
      <div class='container'>
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img
              src={logo}
            />
          </a>
  
          <label
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            htmlFor='nav-toggle-state'
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </label>
        </div>
        <input type="checkbox" id="nav-toggle-state" />
  
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href='/'>Home</a>
  
            <a class="navbar-item" href='/articles/'>Articles</a>
  
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">More</a>
  
              <div class="navbar-dropdown">
                <a class="navbar-item">About</a>
                <a class="navbar-item">Jobs</a>
                <a class="navbar-item">Contact</a>
                <hr class="navbar-divider" />
                <a class="navbar-item">Report an issue</a>
              </div>
            </div>
          </div>
  
          <div class="navbar-end">
          </div>
        </div>
      </div>
    </nav>
  )
}
