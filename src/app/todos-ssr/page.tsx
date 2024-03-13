import TodoReportButton from "@/app/components/Button";
import { Todo } from "@/types/types";
import React from "react";

const TodosSsrPage = async () => {
  const response = await fetch(`http://localhost:4000/todos`, {
    cache: "no-cache",
  });
  const results = await response.json();

  return (
    <>
      <div className="my-2 mx-2 border-2 border-black bg-green-400">
        <TodoReportButton />
      </div>
      {results.map((result: Todo, idx: number) => (
        <div
          key={result.id}
          className={`m-2 border-4 ${
            idx % 2 === 0 ? "border-red-300" : "border-black"
          }`}
        >
          <div>id: {result.id}</div>
          <div>title: {result.title}</div>
          <div>contents: {result.contents}</div>
          <div>isDone: {result.isDone.toString()}</div>
        </div>
      ))}
    </>
  );
};
export default TodosSsrPage;
