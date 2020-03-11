import React, { PureComponent } from 'react'
import Api from '../services/api'
import Geo from '../services/geo'

const MessageContext = React.createContext()

class Provider extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      messages: []
    }
  }

  getMessages = () => {
    const promise = new Promise((resolve, reject) => {
      Geo.get().then((geo) => {
        const { latitude, longitude } = geo.coords

        Api.getMessages({latitude, longitude}).then((resp) => {
          const { messages } = resp.data
          this.setState({messages, loading: false})
          resolve()
        })
      })
    })
    return promise
  }

  sendMessage = ({message}) => {
    Geo.get().then((geo) => {
      const { latitude, longitude } = geo.coords
      Api.sendMessage({latitude, longitude, message}).then(this.getMessages)
    })
  }

  render() {
    const { children, ...passThroughProps } = this.props

    const context = {
      ...passThroughProps,
      ...this.state,
      getMessages: this.getMessages,
      sendMessage: this.sendMessage
    }

    return (
      <MessageContext.Provider value={context}>
        {children}
      </MessageContext.Provider>
    )
  }
}

export default {
  Provider,
  Context: MessageContext
}
