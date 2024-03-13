import { Todo } from "@/types/types";
import { Noto_Sans_KR, Angkor } from "next/font/google";
import React from "react";
const Noto_Sans_KR_Font = Noto_Sans_KR({ subsets: ["latin"] });
const Angkor_Font = Angkor({ subsets: ["latin"], weight: "400" });
const ReportPage = async () => {
  const response = await fetch(`http://localhost:4000/todos`, {
    next: {
      revalidate: 10,
    },
  });
  const results = await response.json();

  return (
    <>
      <div className="p-10 m-10  bg-yellow-200 rounded-3xl border-2 border-black">
        <div className="mb-4 font-bold text-lg">
          {`현재까지 ${results.length}개의 todolist가 등록되었습니다.`}
        </div>
        <div className="font-medium text-2xl">
          {`현재까지 ${
            results.filter((result: Todo) => result.isDone === true).length
          }개의 완료 리스트, ${
            results.filter((result: Todo) => result.isDone === false).length
          }개의 할일 리스트가 존재합니다.`}
        </div>
      </div>
      <div className="p-10 m-10  bg-yellow-200  border-2 border-black ">
        {results.map((result: Todo) => (
          <div key={result.id}>
            <div className="bg-green-500 p-5 m-10 border-2 border-gray-500 text-4xl">
              <div className="font-serif text-2xl">id: {result.id}</div>
              <div className={Angkor_Font.className}>title: {result.title}</div>
              <div className={Noto_Sans_KR_Font.className}>
                contents: {result.contents}
              </div>
              <div className="font-madimi-one">
                {" "}
                isDone : {result.isDone.toString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReportPage;
