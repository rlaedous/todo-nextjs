"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Todo } from "@/types/types";

const TodoListPage = ({ isDone }: Pick<Todo, "isDone">) => {
  const queryClient = useQueryClient();
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:4000/todos`);
      const todos = await response.json();
      return todos;
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE",
      });
      const todo = await response.json();
      return todo;
    },
  });

  const switchTodoMutation = useMutation({
    mutationFn: async (payload: { id: string; isDone: boolean }) => {
      const response = await fetch(
        `http://localhost:4000/todos/${payload.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isDone: !payload.isDone }),
        }
      );
      const switchedTodo = await response.json();
      return switchedTodo;
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div>
      <div className="p-4 bg-gray-200">{isDone ? "해야할일" : "끝낸일"}</div>
      {todos
        ?.filter((item) => item.isDone === !isDone)
        ?.map((todo: Todo) => {
          return (
            <div
              key={todo.id}
              className="bg-blue-900 p-4 mb-4 text-black rounded-md border-red-400"
            >
              <div className="text-xl font-semibold mb-2">{todo.title}</div>
              <div className="mb-4">{todo.contents}</div>
              {todo.isDone ? <p>Done</p> : <p>Not done</p>}
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                onClick={() =>
                  deleteTodoMutation.mutate(todo.id, {
                    onSuccess: () => {
                      queryClient.invalidateQueries({ queryKey: ["todos"] });
                    },
                  })
                }
              >
                Delete
              </button>
              <button
                onClick={() => {
                  switchTodoMutation.mutate(todo, {
                    onSuccess: () => {
                      queryClient.invalidateQueries({ queryKey: ["todos"] });
                    },
                  });
                }}
              >
                수정하기
              </button>
            </div>
          );
        })}
    </div>
  );
};
export default TodoListPage;
