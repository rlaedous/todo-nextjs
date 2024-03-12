import TodoReportButton from "@/Button";
import { Todo } from "@/types/types";
import React from "react";

const TodosSsrPage = async () => {
  const response = await fetch(`http://localhost:4000/todos`);
  const results = await response.json();

  return (
    <>
      {results.map((result: Todo) => {
        return (
          <>
            <TodoReportButton />
            <div>id : {result.id}</div>
            <div>title : {result.title}</div>
            <div>contents : {result.contents}</div>
            <div>isDone : {result.isDone.toString()}</div>
          </>
        );
      })}
    </>
  );
};

export default TodosSsrPage;
