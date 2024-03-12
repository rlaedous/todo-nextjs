import { Todo } from "@/types/types";
import React from "react";

const ReportPage = async () => {
  const response = await fetch(`http://localhost:4000/todos`, {
    next: {
      revalidate: 10,
    },
  });
  const results = await response.json();

  return (
    <>
      <div>{`현재까지 ${results.length}개의 todolist가 등록되었습니다.`}</div>
      <div>{`현재 까지 ${
        results.filter((result: Todo) => result.isDone === true).length
      }개의 완료 리스트, ${
        results.filter((result: Todo) => result.isDone === false).length
      }개의 할일 리스트가 존재합니다.`}</div>
      {results.map((result: Todo) => (
        <div key={result.id}>
          <div>id: {result.id}</div>
          <div>title: {result.title}</div>
          <div>contents: {result.contents}</div>
          <div>isDone: {result.isDone.toString()}</div>
        </div>
      ))}
    </>
  );
};

export default ReportPage;
