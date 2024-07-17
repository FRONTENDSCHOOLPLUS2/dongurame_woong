import Button from "@components/Button";
import { InputStyle, LabelStyle } from "@components/Style.style";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function New() {
  const [isTitle, setIsTitle] = useState("");
  const [isContent, setIsContent] = useState("");

  const navigate = useNavigate();

  const validation = (e) => {
    const targetId = e.target.id;
    const value = e.target.value;

    if (targetId === "title") {
      setIsTitle(value);
    } else if (targetId === "content") {
      setIsContent(value);
    }
  };
  const accessKey = sessionStorage.getItem("isLoggedIn");
  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      type: "post",
      title: isTitle,
      content: isContent,
    };

    fetch("https://api.fesp.shop/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessKey,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.ok === 1) {
          // result.success가 로그인 성공 여부를 나타낸다고 가정
          console.log("결과: ", result);

          navigate("/info"); // 로그인 성공 시 홈 화면으로 이동
        }
      })
      .catch((error) => {
        console.error("게시글 업로드 실패");
        // 에러 시 처리 로직
      });
  };
  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 등록
        </h2>
      </div>
      <section className="mb-8 p-4">
        <form
        // onSubmit={(event) => {
        //   event.preventDefault();
        //   history.back();
        // }}
        >
          <div className="my-4">
            <LabelStyle htmlFor="title">제목</LabelStyle>
            <InputStyle
              id="title"
              type="text"
              placeholder="제목을 입력하세요."
              name="title"
              value={isTitle}
              onChange={validation}
            />
          </div>
          <div className="my-4">
            <LabelStyle htmlFor="content">내용</LabelStyle>
            <textarea
              onChange={validation}
              id="content"
              rows="15"
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              name="content"
            ></textarea>
          </div>
          <hr />
          <form className="flex justify-end my-6">
            <Button
              onClick={onSubmit}
              type="submit"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              등록
            </Button>
            <Button
              type="reset"
              className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              onClick={() => {
                navigate("/info");
              }}
            >
              취소
            </Button>
          </form>
        </form>
      </section>
    </main>
  );
}

export default New;
