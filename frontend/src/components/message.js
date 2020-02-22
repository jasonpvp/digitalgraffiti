import React from 'react'
import moment from 'moment'

import styles from './message.module.css'


const Message = (props) => {
  const { date, to, message, from } = props.messageContent

  return (
    <div className={styles.container}>
      <div className={styles.date}>{moment(date).format("LLLL")}</div>
      <div className={styles.to}>Dearest {to},</div>
      <div className={styles.message}>{message}</div>
      <div className={styles.from}>Yours truly,</div>
      <div className={styles.fromName}>{from}</div>
    </div>
  )
}

export { Message }