import React, { Fragment } from 'react'
import { ArrowIcon } from '../icons/ArrowIcon'

const Arrows = (props) => (
  <Fragment>
    {props.currentMessageIndex > 0 && <ArrowIcon direction="backward" onClick={props.onClick} />}
    {props.children}
    <ArrowIcon direction="forward" onClick={props.onClick} />
  </Fragment>
)

export { Arrows }