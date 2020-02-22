import React, { PureComponent } from 'react'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import Layout from "../components/layout"
import Api from '../services/api'

class Compose extends PureComponent {
  constructor (props) {
    super(props)

    this.api = new Api()
    this.state = {}
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(geo => {
      console.log({geo})
      this.setState({geo}, this.getMessages)
    }, e => console.log(e))
  }

  sendMessage = () => {
    console.log('send message')
  }

  render () {
    const { geo } = this.state
    return (
      <ThemeProvider theme={preset}>
        <Layout>
          {!geo && 'Loading...'}
          {geo && 'Compose'}
        </Layout>
      </ThemeProvider>
    )
  }
}

export default Compose
