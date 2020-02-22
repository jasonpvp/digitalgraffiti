import React, { PureComponent } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Api from '../services/api'

class Messages extends PureComponent {
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
      this.setState({messages: resp.body})
    })
  }

  render () {
    const { messages } = this.state
    return (
      <Layout>
        <SEO title="Messages" />
        {JSON.stringify(messages)}
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    )
  }
}

export default Messages
