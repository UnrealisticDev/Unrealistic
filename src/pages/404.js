import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => {
  return (
    <Layout>
      <SEO title='Unrealistic - 404'/>
      <div className='container'>
        <div className='content has-text-centered'>
            <p>
                Something went wrong :(<br/>Return to <Link to='/'>Home</Link>.
            </p>
        </div>
      </div>
    </Layout>
  )
}
