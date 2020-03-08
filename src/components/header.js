import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap"

import logo from "../images/logo-and-name.png"
import "bootstrap/dist/css/bootstrap.css"
import styles from "./header.module.scss"

import voca from "voca"

export default () => {
  function getPath(name) {
    return "/" + name + "/"
  }

  function capsWord(name) {
    return voca.capitalize(name)
  }

  // create a standalone navbar item
  function createNavbarItem(name) {
    return (
      <Nav.Item>
        <Nav.Link
          href={getPath(name)}
          className={styles.Link}
          activeClassName={styles.LinkActive}
        >
          {capsWord(name)}
        </Nav.Link>
      </Nav.Item>
    )
  }

  // create a navbar dropdown with desired items
  function createNavbarDropdown(name, items) {
    return (
      <NavDropdown
        title={capsWord(name)}
        className={"basic-nav-dropdown " + styles.Dropdown}
      >
        {items.map(it => (
          <NavDropdown.Item href={getPath(it)}>{capsWord(it)}</NavDropdown.Item>
        ))}
      </NavDropdown>
    )
  }

  return (
    <Navbar
      text="light"
      expand="sm"
      sticky="top"
      className={"px-4 my-0 py-2 " + styles.Navbar}
    >
      <Navbar.Brand className="mr-2">
        <Link to="/" className={styles.brand}>
          <Image src={logo} alt="" width="175" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {createNavbarItem("articles")}
          {/* {createNavbarItem("glossary")} */}
          {/* {createNavbarDropdown("creations", ["remapt"])} */}
          {/* {createNavbarItem("aliph")} */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
