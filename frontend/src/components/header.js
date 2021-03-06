import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styles from './header.module.css'

const Header = ({ siteTitle }) => (
  <header className={styles.container}>
    <Link to="/">{siteTitle}</Link>
    <Link to="messages">Messages</Link>
    <Link to="compose">Compose</Link>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
