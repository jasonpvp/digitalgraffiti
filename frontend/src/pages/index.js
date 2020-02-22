import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import Layout from "../components/layout"


export default props =>
  <ThemeProvider theme={preset}>
    <Layout>{props.children}</Layout>
  </ThemeProvider>
