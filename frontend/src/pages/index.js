import React, { PureComponent } from 'react'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import Layout from "../components/layout"
import Api from '../services/api'

export default class IndexPage extends PureComponent {
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
      <ThemeProvider theme={preset}>
        <Layout>{this.props.children}</Layout>
      </ThemeProvider>

    )
  }
}
  