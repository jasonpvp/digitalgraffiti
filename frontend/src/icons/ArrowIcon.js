import React from 'react'
import Arrow from '../images/arrow.svg'
import styles from "./ArrowIcon.module.css"

const ArrowIcon = ({ direction, onClick }) => (
  <button className={styles.button} onClick={() => onClick(direction)}>
    <Arrow className={styles[direction]}/>
  </button>
)

export { ArrowIcon }
