"use client";
import Input from "@/app/components/Input";
import TodoListPage from "@/app/components/TodoList";
import { useQuery } from "@tanstack/react-query";
import RouterButton from "../components/RouterButton";
import { Todo } from "@/types/types";

const TodosCsrPage = () => {
  const {
    data: todos,
    isPending,
    // isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async (): Promise<Todo[]> => {
      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/todos`
        `/api/todos`
        //위에상대경로
      );
      const { todos } = await response.json();
      return todos;
    },
  });

  // if(todos){
  //   return
  // }
  // if (is) {
  //   return <div>is펜딩...</div>;
  // }

  if (isPending) {
    return <div>is로딩...</div>;
  }

  // const isLoading = status === 'fetching';
  // const isPending = status === 'pending'; 처음불러올때 언디파인드

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
