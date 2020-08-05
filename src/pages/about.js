import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hireme from "../components/hireme"

export default () => (
  <Layout>
    <SEO title="About" />
    <section class="section">
      <div class="container">
        <div className="columns">
          <div className="column is-3">
            <Hireme />
          </div>
          <div className="column is-1" />
          <div className="column is-4">
            <div className="container">
              <div className="content">
                <div className="title is-size-1">About Unrealistic</div>
                <p>
                  Unrealistic's mission is to inform, empower, and inspire our
                  game developer readership. We do this through journalism, as
                  well as criticism, and also by providing game developers a
                  prominent platform to explore all matters related to the art and
                  business of making video games via our comment system.
                </p>
              </div>
              <div className="content">
                <div className="title is-size-1">About Nokternel Games</div>
                <p>
                  Everything we do at Nokternel Games is based on the success of
                  the gaming experiences we provide our players. The goal of each
                  discipline within the company -- be it art, programming or
                  customer support -- is to make our games as fun as possible for
                  as many people as we can reach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)
