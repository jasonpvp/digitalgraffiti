import React, { PureComponent } from 'react'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import Layout from "../components/layout"

export default class IndexPage extends PureComponent {
  render () {
    return (
      <ThemeProvider theme={preset}>
        <Layout>{this.props.children}testing</Layout>
      </ThemeProvider>

    )
  }
}
