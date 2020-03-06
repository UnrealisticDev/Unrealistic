import React from "react"
import { Container, Navbar, Nav, Image } from "react-bootstrap"

import "bootstrap/dist/css/bootstrap.css"
import localStyles from './footer.module.scss'
import logo from "../images/logo-and-name.png"

export default () => (
  <Navbar
    text="light"
    className={"m-0 px-4 py-2 " + localStyles.Footer}
  >
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    {/* <Navbar.Brand className="mx-2">
      <Image alt="" src={logo} width="140" />
    </Navbar.Brand> */}
    <Nav className="mr-auto">
      <Nav.Item style={{ fontSize: "13px", color: "#545454" }}>
        © 2020 Nokternel Games.
      </Nav.Item>
    </Nav>
  </Navbar>
)
