"use client";
import NavBar from '@/app/components/NavBar'
import ListPost from '@/app/components/ListPost'
import { useState } from 'react';
import { PostQuery } from '@/app/interfaces/queryPost.interface';


export default function Page() {
  const [searchQuery, setSearchQuery] = useState<PostQuery>({
    searchKey: "",
    category: "",
    page: 1,
  });
  return (
    <>
      <NavBar onSearch={setSearchQuery} />
      <ListPost searchQuery={searchQuery} />
    </>
  )
}