"use client";
import Image from "next/image";
import { getPosts } from "../(blog)/lib/getData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { PostQuery } from "../interfaces/queryPost.interface";

export default function ListPost(query?: PostQuery) {
    const [listPost, setListPost] = useState([] | null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getPosts(query.searchQuery);
                setListPost(data.data);
            } catch (error) {
                console.error("Lỗi khi tải bài viết:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);
    if (loading) return <Loading />;

    return (
        <div className="bg-white-900 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listPost && listPost.map((post, index) => (
                        <div
                            key={index}
                            className="bg-[#000000] border-zinc-800 overflow-hidden hover:border-green-500 transition-colors rounded-xl"
                        >
                            <Link href={'/blog/' + post.id}>
                                <div className="p-0">
                                    <div className="relative aspect-[1.91/1]">
                                        <Image src={"https://titan-blog.s3.amazonaws.com/" + post.thumbnail || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                                    </div>
                                    <div className="p-4 space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            {post.hashtags.map((tag, tagIndex) => (
                                                <div key={tagIndex} className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 rounded-xl p-2">
                                                    {tag.hashtagName}
                                                </div>
                                            ))}
                                        </div>
                                        <h3 className="text-lg font-semibold text-white line-clamp-2">{post.title}</h3>
                                        <div className="flex items-center gap-4 text-zinc-400">
                                            <div className="flex items-center gap-1">
                                                <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                                                <span className="text-sm">{post.viewCount}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                                                <span className="text-sm">{post.likeCount}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                                                <span className="text-sm">{post.commentCount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}