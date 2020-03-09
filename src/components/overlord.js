import React from "react"
import { Helmet } from "react-helmet"

import Header from "./header"
import Footer from "./footer"

import "../styles/global.scss"
import styles from "./overlord.module.scss"

import favicon16 from "../images/favicon16.png"

export default ({children, title}) => (
  <div className={styles.Body} style={{ minHeight: "100vh" }}>
    <Helmet
      link={[
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: `${favicon16}`,
        },
      ]}
    >
    <html class='has-navbar-fixed-top'/>
    <title>{title}</title>
    </Helmet>
    <Header />
    <section class='hero is-fullheight is-dark'>
      <div class='hero-body'>
        {children}
      </div>
    </section>
    <Footer className={styles.Footer} />
  </div>
)
