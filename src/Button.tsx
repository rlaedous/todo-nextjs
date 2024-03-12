"use client";
import Link from "next/link";
import React from "react";

const TodoReportButton = () => {
  return (
    <Link href="/report">
      <button>할일정보통계보러가기</button>
    </Link>
  );
};

export default TodoReportButton;
