import React from "react"

// import { Navbar } from "react-bulma-components"
// import Navbar from 'react-bulma-components/lib/components/navbar';
import "../styles/global.scss"

import logo from "../images/logo-and-name.png"
// import styles from "./header.module.scss"

import voca from "voca"

export default () => {
  function getPath(name) {
    return "/" + name + "/"
  }

  function capsWord(name) {
    return voca.capitalize(name)
  }

  function createNavbarItem(name) {
    return (
      <a class="navbar-item has-text-dark" href={getPath(name)}>
        {capsWord(name)}
      </a>
    )
  }

  // function createNavbarDropdown(name, items) {
  //   return (
  //     <Navbar.Dropdown>
  //       title={capsWord(name)}
  //       {items.map(it => (
  //         <Navbar.Item href={getPath(it)}>{capsWord(it)}</Navbar.Item>
  //       ))}
  //     </Navbar.Dropdown>
  //   )
  // }

  return (
    <nav class="navbar is-transparent is-fixed-top is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src='https://bulma.io/images/bulma-logo.png' width="112" height="28" style={{ margin: 0 }} />
        </a>
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarOptions"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarOptions" class="navbar-menu">
        <div class="navbar-start">
          {createNavbarItem("home")}
          {createNavbarItem("articles")}
          {createNavbarItem("glossary")}
          {createNavbarItem("about")}
        </div>
        <div class="navbar-end">{createNavbarItem("end")}</div>
      </div>
    </nav>
  )
}
