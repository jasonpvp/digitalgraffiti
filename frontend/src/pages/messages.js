import React, { PureComponent } from 'react'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import Layout from "../components/layout"
import Api from '../services/api'

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
    navigator.geolocation.getCurrentPosition(
      geo => {
        console.log({geo})
        this.setState({geo}, () => this.getMessages)
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
    const { dummyMessages } = this.state
    console.log("DUMMY", dummyMessages)
    return (
      <ThemeProvider theme={preset}>
        <Layout>
          {/* {JSON.stringify(messages)} */}
          <div>THIS</div>
          <Message messageContent={this.state.dummyMessages[0]} />
        </Layout>
      </ThemeProvider>
    )
  }
}

const Message = (props) => {
  const { date, to, message, from } = props.messageContent
  return (
    <div style={{ color: 'black' }}>
      {date}
      To: {to}
      {message}
      Yours truly, {from}
    </div>
  )
}

export default Messages
