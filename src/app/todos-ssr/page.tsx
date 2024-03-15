import LinkButton from "@/components/LinkButton";
import { Todo } from "@/types/types";
import React from "react";

// export const revalidate = 0;
const TodosSsrPage = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/todos`, {
    cache: "no-cache",
  });
  const results = await response.json();

  return (
    <>
      <div className="flex my-2 mx-2 border-2 border-black bg-green-400">
        <LinkButton />
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
