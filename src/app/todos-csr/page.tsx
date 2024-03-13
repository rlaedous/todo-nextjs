"use client";
import TodoReportButton from "@/app/components/Button";
import Input from "@/app/components/Input";
import TodoListPage from "@/app/components/TodoList";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const TodosCsrPage = () => {
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`);
      const todos = await response.json();
      return todos;
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <>
      <div className="flex mx-10 my-2 border-2 border-green-200 bg-red-200">
        <TodoReportButton />
      </div>
      <div className=" mx-10 my-2 border-2 border-rose-500 ">
        <Input />
      </div>
      <div className="flex flex-col border-yellow-500 border-2 p-10 mx-10 my-2 ">
        <TodoListPage isDone={true} todos={todos} />
        <TodoListPage isDone={false} todos={todos} />
      </div>
    </>
  );
};

export default TodosCsrPage;
