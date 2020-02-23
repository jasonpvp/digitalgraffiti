import React, { PureComponent } from 'react'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import Layout from "../components/layout"
import Image from '../components/image'
import styles from './index.module.css'
import Geo from '../services/geo'
import { navigate } from 'gatsby'
import { LogoIcon } from '../icons/LogoIcon'

export default class IndexPage extends PureComponent {
  componentDidMount () {
    Geo.get().then(this.showMessages)
  }

  showMessages = () => {
    setTimeout(() => {
      navigate('messages')
    }, 1000)
  }

  render () {
    return (
      <ThemeProvider theme={preset}>
        <Layout>
          <div className={styles.logo}>
            <LogoIcon />
          </div>
        </Layout>
      </ThemeProvider>

    )
  }
}
