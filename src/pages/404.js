import React from "react"
import { Link } from "gatsby"

import Layout from "../shared/components/layout"
import Seo from "../shared/components/seo"

const Page = () => {
  return (
    <Layout>
      <Seo title='404 - Page Not Available'/>
      <section className="section">
        <div className='container'>
          <div className='content has-text-centered'>
              <p>
                  It looks like this page no longer exists.<br/>Return to <Link to='/'>Home</Link>.
              </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Page;
