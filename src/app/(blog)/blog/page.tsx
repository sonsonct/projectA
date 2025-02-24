"use client";
import NavBar from '@/app/components/NavBar'
import ListPost from '@/app/components/ListPost'
import { useState, useEffect, Suspense } from 'react';
import { PostQuery } from '@/app/interfaces/queryPost.interface';
import { useSearchParams } from 'next/navigation';
import { Pagination } from '@/app/components/pagination';

function PageContent() {
  const [searchQuery, setSearchQuery] = useState<PostQuery>({ page: 1 });
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

  useEffect(() => {
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      hashtagId,
      searchKey,
      page: 1,
    }));
  }, [searchKey, hashtagId]);

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
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
