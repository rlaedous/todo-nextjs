"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

import type { NewTodo, Todo } from "@/types/types";
import TodoReportButton from "@/Button";

const TodosPage = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:4000/todos`);
      const todos = await response.json();
      return todos;
    },
  });

  const newTodoMutation = useMutation({
    mutationFn: async (newTodo: NewTodo) => {
      const response = await fetch(`http://localhost:4000/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const todo = await response.json();
      return todo;
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
      <TodoReportButton />
      <section>
        <h2>새로운 투두 추가하기</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            newTodoMutation.mutate(
              { title, contents },
              {
                onSuccess: () => {
                  setTitle("");
                  setContents("");

                  queryClient.invalidateQueries({
                    queryKey: ["todos"],
                  });
                },
              }
            );
          }}
        >
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="contents">Contents</label>
            <input
              id="contents"
              type="text"
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />
          </div>
          <button type="submit">Add Todo</button>
        </form>
      </section>
      <h1>투두리스트입니다.</h1>
      <p>Here you can see all your todos</p>
      {todos.map((todo: Todo) => {
        return (
          <div
            key={todo.id}
            className="bg-blue-100 border border-blue-400 text-blue-700 p-8 m-2 rounded"
          >
            <h2>{todo.title}</h2>
            <p>{todo.contents}</p>
            {todo.isDone ? <p>Done</p> : <p>Not done</p>}
          </div>
        );
      })}
    </div>
  );
};

export default TodosPage;
