import TodoReportButton from "@/Button";
import Input from "@/Input";
import TodoListPage from "@/TodoList";
import React from "react";

const TodosCsrPage = () => {
  return (
    <>
      <TodoReportButton />
      <Input />
      <div className="flex-row gap-4 ">
        <TodoListPage isDone={true} />
        <TodoListPage isDone={false} />
      </div>
    </>
  );
};

export default TodosCsrPage;
