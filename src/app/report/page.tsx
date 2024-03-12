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
