import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => {
  return (
    <Layout>
      <SEO title='Unrealistic - Success'/>
      <div className='container'>
        <div className='content has-text-centered'>
            <p>
                Thanks for submitting your form! We'll get back to you in the next 72 hours.<br/>Return to <Link to='/'>Home</Link>.
            </p>
        </div>
      </div>
    </Layout>
  )
}
