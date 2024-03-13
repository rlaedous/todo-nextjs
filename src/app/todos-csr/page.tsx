import TodoReportButton from "@/app/components/Button";
import Input from "@/app/components/Input";
import TodoListPage from "@/app/components/TodoList";
import React from "react";

const TodosCsrPage = () => {
  return (
    <>
      <div className="flex mx-10 my-2 border-2 border-green-200 bg-red-200">
        <TodoReportButton />
      </div>
      <div className=" mx-10 my-2 mb-20 border-2 border-rose-500 bg-blue-500 ">
        <Input />
      </div>
      <div className="flex flex-col border-blue-500 border-2 p-10 mx-10 my-2 ">
        <TodoListPage isDone={true} />
        <TodoListPage isDone={false} />
      </div>
    </>
  );
};

export default TodosCsrPage;
