import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header>
    <Link
      to="/"
      style={{
        color: `black`,
        textDecoration: `none`,
      }}
    >
      {siteTitle}
    </Link>
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
