import React, { PureComponent } from 'react'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import Layout from "../components/layout"
import Image from '../components/image'
import styles from './index.module.css'

export default class IndexPage extends PureComponent {
  render () {
    return (
      <ThemeProvider theme={preset}>
        <Layout>
          <div className={styles.logo}>
            <Image />
          </div>
        </Layout>
      </ThemeProvider>

    )
  }
}
