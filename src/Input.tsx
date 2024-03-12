"use client";
import React, { useState } from "react";

import { NewTodo } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Input = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const queryClient = useQueryClient();

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

  return (
    <section className="p-4 bg-gray-200">
      <h2 className="text-xl font-semibold mb-2">새로운 투두 추가하기</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          newTodoMutation.mutate(
            { title, contents, isDone: false },
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
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="contents"
            className="block text-sm font-medium text-gray-950"
          >
            Contents
          </label>
          <input
            id="contents"
            type="text"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Add Todo
        </button>
      </form>
    </section>
  );
};

export default Input;
