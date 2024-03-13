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
    <section className="flex flex-col p-4 m-2 bg-green-500 ">
      {/* <section className="flex flex-col p-4 m-2 bg-orange-200"> */}
      <div className="flex mb-4">새로운 투두 추가하기</div>

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
        className="flex"
      >
        <div className="flex">
          <div className="flex items-center ">
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
            />
          </div>
          <div className="flex items-center ">
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
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white ">
            Add Todo
          </button>
        </div>
      </form>
    </section>
  );
};

export default Input;
