import React from "react";
import CommentList from "./CommentList";
import Button from "@components/Button";

function Detail() {
  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <div className="font-semibold text-xl">제목 :</div>
        <div className="text-right text-gray-400">작성자 : 제이지</div>
        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
              좋은 소식을 가지고 왔습니다.
              <br />
              오늘 드디어 최종 면접을 합니다.
              <br />
              많이 응원해 주세요^^
            </pre>
          </div>
          <hr />
        </div>
        <div className="flex justify-end my-4">
          <Button
            className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            // onClick={}
          >
            목록
          </Button>
          <Button
            className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            // onClick={}
          >
            수정
          </Button>
          <Button
            className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            // onClick={}
          >
            삭제
          </Button>
        </div>
      </section>
      <CommentList />
    </main>
  );
}

export default Detail;
