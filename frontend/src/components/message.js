import React, { PureComponent } from 'react'
import moment from 'moment'

import styles from './message.module.css'
import Geo from '../services/geo'

export default class Message extends PureComponent {
  state = {
    city: null
  }

  componentDidMount () {
    const { messageContent: { latitude, longitude } } = this.props
    // TODO: get the geo from the message when it is returned
    Geo.findLocation({latitude, longitude}).then(resp => {
      const city = resp?.data?.address?.city || 'Somewhere in time'
      this.setState({city})
    })

  }

  render () {
    const { date, to, message, from } = this.props.messageContent
    const { city } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.date}>{moment(date).format("LLLL")}</div>
        <div className={styles.to}>Dearest {to},</div>
        <div className={styles.message}>{message}</div>
        <div className={styles.from}>Yours truly,</div>
        <div className={styles.fromName}>{from}</div>
        <div className={styles.location}>{city}</div>
      </div>
    )
  }
}
