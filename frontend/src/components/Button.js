import React, { PureComponent } from 'react'

export default class Button extends PureComponent {
  render () {
    const { onClick, label } = this.props

    return (
      <button onClick={onClick}>
        {label}
      </button>
    )
  }
}
