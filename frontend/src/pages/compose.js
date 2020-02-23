import React, { PureComponent } from 'react'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'
import Composer from '../components/Composer'
import Layout from "../components/layout"
import Api from '../services/api'
import Geo from '../services/geo'
import { navigate } from 'gatsby'

class Compose extends PureComponent {
  constructor (props) {
    super(props)

    this.api = new Api()
    this.state = { sending: false }
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
    }).then(resp => {
      this.setState({sending: false})
      navigate('messages')
    })
    this.setState({sending: true})
  }

  render () {
    const { geo, sending } = this.state
    return (
      <ThemeProvider theme={preset}>
        <Layout>
          {!geo && 'Loading...'}
          {geo && <Composer onSend={this.onSend} sending={sending} />}
        </Layout>
      </ThemeProvider>
    )
  }
}

export default Compose
