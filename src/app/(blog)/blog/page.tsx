"use client";
import NavBar from '@/app/components/NavBar'
import ListPost from '@/app/components/ListPost'
import { useState } from 'react';
import { PostQuery } from '@/app/interfaces/queryPost.interface';
import { useSearchParams } from 'next/navigation';
import { Pagination } from '@/app/components/pagination';


export default function Page() {
  const [searchQuery, setSearchQuery] = useState<PostQuery>({
    page: 1,
  });
  const [data, setData] = useState({
    data: [],
    page: 1,
    pageSize: 9,
    sortType: 1,
    totalItem: 0,
    totalPage: 1,
  });

  const searchParams = useSearchParams();
  const searchKey = searchParams.get("searchKey") || "";
  const hashtagId = searchParams.get("hashtagId") || "";

  if (searchKey !== searchQuery.searchKey) {
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      hashtagId,
      searchKey,
      page: 1,
    }));
  }

  const handlePageChange = (newPage: number) => {
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      page: newPage,
    }));
  };

  return (
    <>
      <NavBar onSearch={setSearchQuery} />
      <ListPost query={searchQuery} onGetData={setData} />
      <Pagination currentPage={data.page} totalPages={data.totalPage} onPageChange={handlePageChange} />
    </>
  )
}