import React, { PureComponent } from 'react'
import styles from './Composer.module.css'

export default class Composer extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      message: '',
      rows: 1,
      minRows: 1,
      maxRows: 10
    }
  }

  componentDidMount () {
    this.textareaRef.focus()
  }

  onChange = (event) => {
    // Thanks codepen: https://codepen.io/JaKto/pen/qeBpZM
    const textareaLineHeight = 35;
    const { minRows, maxRows } = this.state;

    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    this.setState({
      message: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
  }

  getTextAreaRef = (ref) => {
    this.textareaRef = ref
  }

  render () {
    const { rows, message } = this.state

    return (
      <div className={styles.container} >
        <textarea
          rows={rows}
          value={message}
          className={styles.input}
          maxLength={180}
          ref={this.getTextAreaRef}
          onChange={this.onChange}
          placeholder='Leave a message...'
        />
      </div>
    )
  }
}
