/* eslint-disable */
import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import styled from "styled-components";

import router from "../scripts/router";
import Searchbar from "./searchbar";

const Nav = styled.nav`
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

const Initials = styled.a`
  font-family: "Bungee", cursive;
  font-size: 2rem;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }

  &:hover {
    color: hsl(204, 86%, 53%) !important;
  }
`;

const Toggle = styled.input`
  &#nav-toggle-state {
    display: none;
  }

  &#nav-toggle-state:checked ~ .navbar-menu {
    display: block;
  }
`;

const NavLink = styled(Link)`
  @media screen and (min-width: 769px) {
    &:hover {
      border-bottom: solid 5px hsl(204, 86%, 53%);
    }
  }
`;

const NavDropdown = styled.div`
  &:hover {
    &::after {
      background-color: hsl(204, 86%, 53%) !important;
    }
  }
`;

const ProductLink = styled(Link)`
  &:hover {
    border-left: solid 5px hsl(204, 86%, 53%);
    color: hsl(204, 86%, 53%) !important;
  }
`;

export default () => {
  const { logo } = useStaticQuery(
    graphql`
      query {
        logo: contentfulAsset(title: { eq: "Logo" }) {
          file {
            url
          }
        }
      }
    `
  );

  return (
    <Nav
      className="navbar is-fixed-top is-transparent is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <Helmet>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Bungee&display=swap');
        </style>
      </Helmet>
      <div className="container">
        <div className="navbar-brand">
          <Initials className="navbar-item" href="/">
            UN
          </Initials>

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
            <NavLink className="navbar-item" href="/">
              Home
            </NavLink>
            <NavLink className="navbar-item" href="/posts">
              Library
            </NavLink>
            <div className="navbar-item has-dropdown is-hoverable" href="/">
              <NavDropdown className="navbar-link">Products</NavDropdown>
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
            <NavLink className="navbar-item" href="/glossary">
              Glossary
            </NavLink>
            <NavLink className="navbar-item" href="/about">
              About
            </NavLink>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <Searchbar index="Articles" />
            </div>
          </div>
        </div>
      </div>
    </Nav>
  );
};
