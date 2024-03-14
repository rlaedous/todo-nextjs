"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Todo } from "@/types/types";

const TodoListPage = ({
  isDone,
  todos,
}: {
  isDone: boolean;
  todos: Todo[];
}) => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/todos/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const switchTodoMutation = useMutation({
    mutationFn: async ({ id, isDone }: { id: string; isDone: boolean }) => {
      await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDone: !isDone }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (!todos || todos.length === 0) {
    return <div>No todos found.</div>;
  }

  return (
    <div>
      <div className="p-4 mb-4 border-2 border-blue-500 bg-red-200 text-purple-600 font-bold">
        해야할일
      </div>
      {todos
        .filter((item: Todo) => item.isDone === !isDone)
        .map((todo: Todo) => {
          return (
            <div
              key={todo.id}
              className="bg-blue-400 p-4 mb-4 text-black border-4 border-red-400"
            >
              <div className="text-xl font-semibold mb-2">{todo.title}</div>
              <div className="mb-4">{todo.contents}</div>
              {todo.isDone ? <p>Done</p> : <p>Not done</p>}
              <button
                className="mr-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:ring focus:border-blue-300"
                onClick={() => {
                  deleteTodoMutation.mutate(todo);
                }}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-300  focus:ring focus:border-blue-600"
                onClick={() => {
                  switchTodoMutation.mutate(todo);
                }}
              >
                {todo.isDone ? "완료" : "취소"}
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default TodoListPage;
