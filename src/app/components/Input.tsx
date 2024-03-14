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
      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/todos`,
        `/api/todos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        }
      );
      const todo = await response.json();

      return todo;
    },
  });

  return (
    <section className="flex flex-col p-4  bg-green-500 ">
      <div className="flex mb-4">새로운 투두 추가하기</div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim() || !contents.trim()) {
            return alert("글을입력하세요!");
          }
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
        <div className="flex items-center ">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-950 mr-2"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mr-2"
            minLength={2}
            maxLength={20}
            placeholder="2글자 이상"
          />
        </div>
        <div className="flex items-center ">
          <label
            htmlFor="contents"
            className="block text-sm font-medium text-gray-950 mr-2"
          >
            Contents
          </label>
          <input
            id="contents"
            type="text"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            className="mr-2"
            minLength={2}
            maxLength={20}
            placeholder="2글자 이상"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-2 hover:bg-blue-300 rounded-md focus:ring-8 focus:bg-red-300"
        >
          Add Todo
        </button>
      </form>
    </section>
  );
};

export default Input;
