import { marked } from "marked";
import { getDetailPosts } from "../../lib/getData";
import NavBar from "@/app/components/NavBar";

export default async function PostPage({ params }: { params: { id: number } }) {
  const { id } = await params

  try {
    const post = await getDetailPosts(id);

    return (
      <>
        <NavBar />
        <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
          <img
            alt={post.title}
            src={'https://titan-blog.s3.amazonaws.com/' + post.thumbnail}
            className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-red-900">{post.title}</h1>
          <p className="text-1xl text-[#d0d5ddda] mt-1">{post.createdAt}</p>
          <div className="mt-4 prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: marked(post?.content) }} />
        </div>
      </>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    return <p>Post not found</p>;
  }
}
