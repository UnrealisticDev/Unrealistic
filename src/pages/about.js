import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hireme from "../components/hireme"

export default () => (
  <Layout>
    <SEO title="About" />
    <div class="container">
      <div class="columns">
        <div class="column is-8"></div>
        <div class="column is-4">
          <Hireme />
        </div>
      </div>
    </div>
  </Layout>
)
