"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "@components/Header";
import Home from "@components/Home";
import Nav from "@components/Nav";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <Header />
      <Nav/>
      <Home />
    </>
  );
};

export default page;
