import React from "react"
import { Helmet } from "react-helmet"

import Header from "./header"
import Footer from "./footer"

import favicon16 from "../images/favicon16.png"

export default ({ children, title }) => (
  <>
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
      <html className="has-navbar-fixed-top" lang='en' />
    </Helmet>
    <Header />
    <section className="section has-background-light">
      <div class="container">{children}</div>
    </section>
    <Footer />
  </>
)
