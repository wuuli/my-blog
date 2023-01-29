import React from 'react'
import Layout from '../Layout'
import Head from 'next/head'
import DateTime from '../Date'

export interface PostLayoutProps {
  title: string;
  date: string;
}

const PostLayout: React.FC<PostLayoutProps> = ({ title, date, children }) => {
  return (
    <Layout >
      <Head>
        <title>{title}</title>
      </Head>
      <article >
        <h1 className="headingXl">{title}</h1>
        <div className="lightText">
          <DateTime dateString={date}/>
        </div>
        <div className="markdown-body">
          {children}
        </div>
      </article>
    </Layout>
  )
}

export default PostLayout
