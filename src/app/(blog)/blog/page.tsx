
import Link from 'next/link'
import { getPosts } from '../lib/getData'
import { Post } from '../ui/post'
import NavBar from '@/app/components/NavBar'

 
export default async function Page() {
  const posts = await getPosts()
 
  return (
    <>
    <NavBar/>
    <ul>
      {posts.data.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
    </>
  )
}