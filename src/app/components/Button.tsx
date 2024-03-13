"use client";
import Link from "next/link";
import React from "react";

const TodoReportButton = () => {
  return (
    <Link href="/report">
      <div> 할일정보통계보러가기</div>
    </Link>
  );
};

export default TodoReportButton;
