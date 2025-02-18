import { Suspense } from "react";
import ListPost from "./components/ListPost";
import NavBar from "./components/NavBar";
import { Loading } from "./components/loading";


export default function Home() {
  return (
    <>
      <NavBar />
      <Loading>
        <ListPost />
      </Loading>
    </>
  );
}
