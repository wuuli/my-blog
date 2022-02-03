import Head from 'next/head'
import styles from './index.module.scss'
import Link from 'next/link'
import React from 'react'
import packageJson from '../../package.json'

export interface LayoutProps {
  home?: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, home = false }) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={packageJson.description}
        />
      </Head>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}


export default Layout
