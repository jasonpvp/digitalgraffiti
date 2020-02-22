import React, { PureComponent } from 'react'
import styles from './Button.module.css'
import PropTypes from 'prop-types'

export default class Button extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    isDisabled: PropTypes.bool
  }

  static defaultProps = {
    isDisabled: false,
    onClick: null
  }

  render () {
    const { onClick, label, isDisabled } = this.props

    return (
      <button onClick={onClick} className={styles.button} disabled={isDisabled} >
        {label}
      </button>
    )
  }
}
