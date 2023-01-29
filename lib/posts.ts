import path from 'path'
import fs from 'fs'

export interface Manifest {
  title?: string,
  date?: string,
  hide?: boolean,
}

export interface PostData {
  id: string,
  title: string,
  date: string,
}

const postsDirectory = path.join(process.cwd(), '/pages/posts')

export const getAllPostsIds = () => {
  return  fs.readdirSync(postsDirectory).filter(subDir => {
    return fs.lstatSync(path.join(postsDirectory, subDir)).isDirectory()
  })
}

export const getAllPostsData = (): PostData[] => {
  const ids = getAllPostsIds()

  return ids.map<PostData | null>(id => {
    const postDir = path.join(postsDirectory, id)
    const manifestPath = path.join(postDir, 'manifest.json')
    const manifestStr = fs.readFileSync(manifestPath, 'utf8')
    if (!manifestStr) return null
    const manifest = JSON.parse(manifestStr) as Manifest
    if (manifest.hide) return null
    return {
      id,
      title: manifest.title || '',
      date: manifest.date || ''
    }
  })
    .filter<PostData>((item): item is PostData => Boolean(item))
    .sort((a, b) => {
    if (a.date > b.date) {
      return -1
    } else if (a.date < b.date) {
      return 1
    } else {
      return 0
    }
  })
}
