import React, { PureComponent } from 'react'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'
import Composer from '../components/Composer'
import Layout from "../components/layout"
import Api from '../services/api'
import Geo from '../services/geo'

class Compose extends PureComponent {
  constructor (props) {
    super(props)

    this.api = new Api()
    this.state = {}
  }

  componentDidMount () {
    Geo.get().then(geo => {
      this.setState({geo}, this.getMessages)
    })
  }

  onSend = (message) => {
    const { geo } = this.state
    if (!geo) return
    const { latitude, longitude } = geo.coords
    this.api.sendMessage({
      message,
      latitude,
      longitude
    })
  }

  render () {
    const { geo } = this.state
    return (
      <ThemeProvider theme={preset}>
        <Layout>
          {!geo && 'Loading...'}
          {geo && <Composer onSend={this.onSend} />}
        </Layout>
      </ThemeProvider>
    )
  }
}

export default Compose
