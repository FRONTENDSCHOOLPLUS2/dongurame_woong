import Button from "@components/Button";
import { InputStyle, LabelStyle } from "@components/Style.style";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login(posts) {
  const [email, setEmail] = useState("dongurame@naver.com");
  const [pw, setPw] = useState("11111111");

  const navigate = useNavigate();

  const validation = (e) => {
    const targetId = e.target.id;
    const value = e.target.value;

    if (targetId === "user-email") {
      setEmail(value);
    } else if (targetId === "user-pw") {
      setPw(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    fetch("https://api.fesp.shop/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password: pw,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.ok === 1) {
          // result.success가 로그인 성공 여부를 나타낸다고 가정
          console.log("결과: ", result);
          sessionStorage.setItem("isLoggedIn", result.item.token.accessToken);

          navigate("/info"); // 로그인 성공 시 홈 화면으로 이동
        } else if (result.ok === 0) {
          alert(result.message);
        }
      })
      .catch((error) => {
        console.error("에러: ", error);
      });
  };

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            로그인
          </h2>
        </div>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <LabelStyle htmlFor="email">이메일</LabelStyle>
            <InputStyle
              id="user-email"
              type="email"
              placeholder="E-mail을 입력해주세요."
              value={email}
              onChange={validation}
              required
            />
          </div>
          <div className="mb-4">
            <LabelStyle htmlFor="password">뭘꺼용</LabelStyle>
            <InputStyle
              id="user-pw"
              type="password"
              placeholder="비밀번호를 적어주세요"
              value={pw}
              onChange={validation}
              autoComplete="false"
              required
            />

            <a
              href="#"
              className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline"
            >
              비밀번호를 잊으셨나요?
            </a>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <Button
              type="submit"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              로그인
            </Button>
            <a href="/" className="ml-8 text-gray-800 hover:underline">
              회원가입
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
