"use client";
import Image from "next/image";
import { getPosts } from "../(blog)/lib/getData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./loading";
import sleep from "@/utils/sleep";
import { useRouter } from "next/navigation";

interface PostQuery {
    searchQuery?: string;
}

interface PostData {
    data: any[];
    page: number;
    pageSize: number;
    sortType: number;
    totalItem: number;
    totalPage: number;
}

interface ListPostProps {
    query?: PostQuery;
    onGetData?: (query: PostData) => void;
}

export default function ListPost({ query, onGetData }: ListPostProps) {
    const [listPost, setListPost] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getPosts(query);
                setListPost(data.data || []);
                onGetData?.({
                    data: data.data || [],
                    page: data.page,
                    pageSize: data.pageSize,
                    sortType: data.sortType,
                    totalItem: data.totalItem,
                    totalPage: data.totalPage
                });
                await sleep(3000);
            } catch (error) {
                console.error("Lỗi khi tải bài viết:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [query]);

    if (loading) return <Loading />;

    const handleSearch = (hashtag: number) => {
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set("hashtagId", hashtag.toString());

        router.push(`/blog?${currentParams.toString()}`);
    };


    return (
        <div className="bg-white-900  py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listPost?.map((post, index) => (
                        <div
                            key={index}
                            className="bg-[#000000] border-zinc-800 overflow-hidden hover:border-green-500 transition-colors rounded-xl"
                        >
                            <div className="p-0">
                                <Link href={`/blog/${post.id}`}>
                                    <div className="relative aspect-[1.91/1]">
                                        <img
                                            src={post.thumbnail ? `https://titan-blog.s3.amazonaws.com/` + post.thumbnail : "/placeholder.svg"}
                                            alt={post.title}
                                            className="object-cover fill"
                                        />
                                    </div>
                                </Link>
                                <div className="p-4 space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {post.hashtags?.map((tag, tagIndex) => (
                                            <button
                                                key={tagIndex}
                                                className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 rounded-xl p-2"
                                                onClick={() => handleSearch(tag.id)}
                                            >
                                                {tag.hashtagName}
                                            </button>
                                        ))}
                                    </div>
                                    <Link href={`/blog/${post.id}`}>
                                        <h3 className="text-lg font-semibold text-white line-clamp-2">{post.title}</h3>
                                        <div className="flex items-center gap-4 text-zinc-400">
                                            <div className="flex items-center gap-1">
                                                <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                                                <span className="text-sm">{post.viewCount ?? 0}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                                                <span className="text-sm">{post.likeCount ?? 0}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                                                <span className="text-sm">{post.commentCount ?? 0}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
