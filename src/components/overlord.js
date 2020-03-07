import React from "react"
import { Helmet } from "react-helmet"

import Header from "./header"
import Footer from "./footer"

import { Container } from "react-bootstrap"

import "bootstrap/dist/css/bootstrap.css"
import styles from "./overlord.module.css"

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
    <title>{title}</title>
    </Helmet>
    <Container fluid className={styles.Content + " m-0 p-0"}>
      <Header />
      <Container fluid className="mx-0 py-2 px-5">
        {children}
      </Container>
    </Container>
    <Footer className={styles.Footer} />
  </div>
)
