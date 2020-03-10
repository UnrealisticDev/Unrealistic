import React from "react"
import { Helmet } from "react-helmet"

import Header from "./header"

import favicon16 from "../images/favicon16.png"

export default ({children, title}) => (
  <>
    <Header />
    <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
  </>
)