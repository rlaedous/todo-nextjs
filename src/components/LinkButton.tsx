"use client";
import Link from "next/link";
import React from "react";

const LinkButton = () => {
  return (
    <Link href="/report" className="bg-red-500 hover:bg-red-200">
      <div> 할일정보통계보러가기</div>
    </Link>
  );
};

export default LinkButton;
