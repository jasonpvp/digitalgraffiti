import React, { PureComponent } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Api from '../services/api'

class IndexPage extends PureComponent {
  constructor (props) {
    super(props)

    this.api = new Api()
    this.state = {}
    navigator.geolocation.getCurrentPosition(geo => {
      console.log({geo})
      this.setState({geo}, this.getMessages)
    }, e => console.log(e))
  }

  getMessages = () => {
    const { latitude, longitude } = this.state.geo.coords
    this.api.getMessages({latitude, longitude}).then((resp) => {
      console.log({messages: resp.body})
    })
  }

  render () {
    return (
      <Layout>
        <SEO title="Home" />
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        <Link to="/page-2/">Go to page 2</Link>
      </Layout>
    )
  }
}

export default IndexPage
