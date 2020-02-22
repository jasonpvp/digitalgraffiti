import React, { PureComponent } from 'react'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import Layout from "../components/layout"
import Api from '../services/api'
import { Message } from '../components/message'
import Geo from '../services/geo'

class Messages extends PureComponent {
  constructor (props) {
    super(props)

    this.api = new Api()
    this.state = { 
      dummyMessages: [
        {
          from: 'Griffon',
          to: 'Friends',
          timestamp: new Date(),
          message: "It is cold in the winter. The nights are dark."
        },
        {
          from: 'Griffon',
          to: 'My friend',
          timestamp: new Date(),
          message: "I like this place."
        }
      ]
    }
  }

  componentDidMount () {
    Geo.get().then(geo => {
      console.log({geo})
      this.setState({geo}, this.getMessages)

      // TODO: move this lookup to use the coords from the current message
      Geo.findLocation({latitude: geo.coords.latitude, longitude: geo.coords.longitude}).then(resp => {
        const city = resp?.data?.address?.city || 'Somewhere in time'
        this.setState({city: `${city}-wrong-location`})
      })
    })
  }

  getMessages = () => {
    const { latitude, longitude } = this.state.geo.coords
    console.log('get msgs')
    this.api.getMessages({latitude, longitude}).then((resp) => {
      console.log({messages: resp.body})
      this.setState({messages: resp.body})
    })
  }

  render () {
    const { dummyMessages, city } = this.state

    console.log("DUMMY", dummyMessages)
    return (
      <ThemeProvider theme={preset}>
        <Layout>
          {/* {JSON.stringify(messages)} */}
          <Message messageContent={this.state.dummyMessages[0]} city={city}/>
          {city}
        </Layout>
      </ThemeProvider>
    )
  }
}

export default Messages
