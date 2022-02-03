import path from 'path'
import fs from 'fs'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'

export interface Manifest {
  title?: string,
  date?: string,
  index?: string,
}

export interface PostData {
  id: string,
  title: string,
  date: string,
  contentHtml?: string
}

const postsDirectory = path.join(process.cwd(), 'posts')

export const getAllPostsIds = () => {
  return  fs.readdirSync(postsDirectory).filter(subDir => {
    return fs.lstatSync(path.join(postsDirectory, subDir)).isDirectory()
  })
}

export const getAllPostsData = (): PostData[] => {
  const ids = getAllPostsIds()

  return ids.map<PostData>(id => {
    const postDir = path.join(postsDirectory, id)
    const manifestPath = path.join(postDir, 'manifest.json')
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as Manifest
    return {
      id,
      title: manifest.title || '',
      date: manifest.date || ''
    }
  }).sort((a, b) => {
    if (a.date > b.date) {
      return -1
    } else if (a.date < b.date) {
      return 1
    } else {
      return 0
    }
  })
}

export const getPostData = async (id?: string): Promise<PostData | undefined> => {
  if (!id) {
    return undefined
  }
  const dirPath = path.join(postsDirectory, id)
  const manifest = JSON.parse(fs.readFileSync(
    path.join(dirPath, 'manifest.json'),
    'utf8'
  )) as Manifest

  const indexMdFile = fs.readFileSync(
    path.resolve(dirPath, manifest.index || './index.md'),
    'utf8'
  )

  const contentHtml = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .use(rehypeHighlight)
      .process(indexMdFile)
  )


  return {
    id,
    title: manifest.title || '',
    date: manifest.date || '',
    contentHtml,
  }
}
