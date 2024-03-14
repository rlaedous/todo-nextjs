"use client";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import React from "react";

const RouterButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/report");
      }}
      className="bg-red-500 hover:bg-red-200"
    >
      <div>할일정보통계보러가기</div>
    </button>
  );
};

export default RouterButton;
