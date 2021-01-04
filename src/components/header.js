/* eslint-disable */
import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Helmet from 'react-helmet'
import styled from "styled-components";

import router from "../scripts/router";
import Searchbar from "./searchbar";

const Nav = styled.nav`
  width: 100vw;
`;

const Initials = styled.div`
  font-family: 'Bungee', cursive;
  font-size: 2rem;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
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

const ProductLink = styled(Link)``;

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
    <>
      <Helmet>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Bungee&display=swap');
        </style>
      </Helmet>
      <Nav
        className="navbar is-fixed-top is-transparent is-light"
        role="navigation"
        aria-label="main navigation"
        style={{
          boxShadow: "0 2px 2px -2px rgba(0,0,0,.2)",
          maxWidth: "320px !important",
          overflowX: "hidden !important",
          padding: "0px !important"
        }}
      >
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" href="/">
              {/* <img src={logo.file.url} alt="Logo" /> */}
              <Initials>UN</Initials>
            </Link>

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
              <Link className="navbar-item" href="/">
                Home
              </Link>
              <Link className="navbar-item" href="/posts">
                Library
              </Link>
              <div className="navbar-item has-dropdown is-hoverable" href="/">
                <div className="navbar-link">Products</div>
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
              <Link className="navbar-item" href="/glossary">
                Glossary
              </Link>
              <Link className="navbar-item" href="/about">
                About
              </Link>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <Searchbar />
              </div>
            </div>
          </div>
        </div>
      </Nav>
    </>
  );
};
