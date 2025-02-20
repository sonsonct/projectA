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
  return (
    <>
      <NavBar onSearch={setSearchQuery} />
      <ListPost searchQuery={searchQuery} />
      <Pagination />
    </>
  );
}
