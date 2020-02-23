import React, { PureComponent } from 'react'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import Layout from "../components/layout"
import Api from '../services/api'
import Message from '../components/message'
import { Arrows } from '../components/Arrows'
import Geo from '../services/geo'
import styles from "./messages.module.css"
import { Link } from "gatsby"

//const dummyMessages = [
//  {
//    from: 'Griffon',
//    to: 'Friends',
//    timestamp: new Date(),
//    message: "It is cold in the winter. The nights are dark."
//  },
//  {
//    from: 'Griffon',
//    to: 'My friend',
//    timestamp: new Date(),
//    message: "I like this place."
//  }
//]

const arrowMap = {
  forward: (current) => current + 1,
  backward: (current) => current - 1
}

class Messages extends PureComponent {
  constructor (props) {
    super(props)

    this.api = new Api()
    this.state = {
      currentMessageIndex: 0
    }
  }

  componentDidMount () {
    Geo.get().then(geo => {
      console.log({geo})
      this.setState({geo}, this.getMessages)
    })
  }

  getMessages = () => {
    const { latitude, longitude } = this.state.geo.coords

    this.api.getMessages({latitude, longitude}).then((resp) => {
      console.log({messages: resp.body})
      const { messages } = resp.data
      this.setState({messages, totalMessages: messages.length})
    })
  }

  onArrowClick = (dir) => {
    const { currentMessageIndex, totalMessages } = this.state

    if (currentMessageIndex + 1 === totalMessages) {
      this.setState({ currentMessageIndex: 0 })
      return
    }

    const nextMessageIndex = arrowMap[dir](currentMessageIndex)
    this.setState({ currentMessageIndex: nextMessageIndex })
  }

  render () {
    const { currentMessageIndex, messages } = this.state
    console.log("THIS STATE", this.state)
    const hasMessages = !!(messages && messages.length)
    return (
      <ThemeProvider theme={preset}>
        <Layout>
          <div className={styles.messagesWrapper}>
            {hasMessages &&
              <Arrows onClick={this.onArrowClick} currentMessageIndex={currentMessageIndex} >
                <Message messageContent={messages[currentMessageIndex]} />
              </Arrows>
            }
            {!hasMessages && <Link to='compose'>Leave a message here</Link>}
          </div>
        </Layout>
      </ThemeProvider>
    )
  }
}

export default Messages
