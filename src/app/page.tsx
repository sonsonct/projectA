"use client";
import { useState } from "react";
import ListPost from "./components/ListPost";
import NavBar from "./components/NavBar";
import { PostQuery } from "./interfaces/queryPost.interface";
import { Pagination } from "./components/pagination";


export default function Home() {
  const [searchQuery, setSearchQuery] = useState<PostQuery>({
    page: 1,
    pageSize: 9,
    sortType: 1,
  });

  const [data, setData] = useState({
    data: [],
    page: 1,
    pageSize: 9,
    sortType: 1,
    totalItem: 0,
    totalPage: 1,
  });

  const handlePageChange = (newPage: number) => {
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      page: newPage,
    }));
  };

  return (
    <>
      <NavBar onSearch={(newQuery) => setSearchQuery({ ...searchQuery, ...newQuery, page: 1 })} />
      <ListPost query={searchQuery} onGetData={setData} />
      <Pagination currentPage={data.page} totalPages={data.totalPage} onPageChange={handlePageChange} />
    </>
  );
}
