import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Layout from '../components/Layout'
import classnames from 'classnames'
import packageJson from '../package.json'
import React from 'react'
import Link from 'next/link'
import DateTime from '../components/Date'
import { getAllPostsData, PostData } from '../lib/posts'

export interface HomeProps {
  allPostsData: PostData[]
}

export const getStaticProps: GetStaticProps<HomeProps> = () => {
  const allPostsData = getAllPostsData()

  return {
    props: {
      allPostsData
    }
  }
}

const Home: NextPage<HomeProps> = ({ allPostsData }) => {
  return (
    <Layout home>
      <Head>
        <title>{packageJson.description}</title>
      </Head>
      <header className={styles.header}>
        <Image
          src="/images/profile.jpg"
          width={144}
          height={144}
          className="borderCircle"
          alt={packageJson.author}
        />
        {/*<h1 className="heading2Xl">哈哈哈</h1>*/}
      </header>
      <section className="headingMd">
        <p>这里是旭林的博客。</p>
      </section>
      <section className={classnames('headingMd', 'padding1px')}>
        <h2 className="headingLg">文章</h2>
        <ul className="list">
          {allPostsData.map(({ id, date, title }) => (
            <li className="listItem" key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br/>
              <small className="lightText">
                <DateTime dateString={date}/>
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default Home
