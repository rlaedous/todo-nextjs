"use client";
import Input from "@/components/Input";
import TodoListPage from "@/components/TodoList";
import { useQuery } from "@tanstack/react-query";
import RouterButton from "@/components/RouterButton";

const TodosCsrPage = () => {
  const {
    data: todos,

    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/todos`
        `/api/todos`
        //위에상대경로
      );
      const { todos } = await response.json();
      return todos;
    },
  });

  if (isLoading) {
    return <div>로딩중입니다..!.!.!.!.!.!.!.!</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="flex mx-10 my-2 border-2 border-green-200 bg-red-200">
        <RouterButton />
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
