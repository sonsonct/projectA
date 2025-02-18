import { getPosts } from "../(blog)/lib/getData";

export default async function ListPost() {
    const listPost = await getPosts();

    return (
        <>
            <div className="bg-white" >
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8" >
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900" > Customers also purchased </h2>
                    < div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8" >
                        {
                            listPost.data.map((post, index) => (

                                <div key={index} className="group relative" >
                                    <img
                                        alt={post.title}
                                        src={'https://titan-blog.s3.amazonaws.com/' + post.thumbnail}
                                        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                                    />
                                    <div className="mt-4 flex justify-between" >
                                        <div>
                                            <h3 className="text-sm text-gray-700" >
                                                <a href={'/blog/' + post.id}>
                                                    <span className="absolute inset-0" />
                                                    {post.title}
                                                </a>
                                            </h3>

                                        </div>

                                    </div>
                                </div>

                            ))
                        }
                    </div>
                </div>
            </div>

        </>
    )
}