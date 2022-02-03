import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getAllPostsIds, getPostData, PostData } from '../../lib/posts'
import React from 'react'
import { ParsedUrlQuery } from 'querystring'
import Layout from '../../components/Layout'
import DateTime from '../../components/Date'
import Head from 'next/head'

export interface PostParams extends ParsedUrlQuery {
  id: string
}

export interface PostProps {
  postData?: PostData
}



export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllPostsIds().map(id => ({
      params: {
        id
      }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<PostProps, PostParams> = async ({ params }) => {
  const postData = await getPostData(params?.id)

  return {
    props: {
      postData
    }
  }
}



const Post: NextPage<PostProps> = ({ postData }) => {
  return postData ? (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        {/*<h1 className="headingXl">{postData.title}</h1>*/}
        <div className="lightText">
          <DateTime dateString={postData.date}/>
        </div>
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}/>
      </article>
    </Layout>
  ) : null
}

export default Post
