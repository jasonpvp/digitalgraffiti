import React, { PureComponent } from 'react'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import Layout from "../components/layout"
import Api from '../services/api'

export default class IndexPage extends PureComponent {
  render () {
    return (
      <ThemeProvider theme={preset}>
        <Layout>{this.props.children}</Layout>
      </ThemeProvider>

    )
  }
}
