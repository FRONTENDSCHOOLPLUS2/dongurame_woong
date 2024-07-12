import Button from "@components/Button";
import { Incorrect, InputStyle, LabelStyle } from "@components/Style.style";
import Submit from "@components/Submit";
// import { update } from "lodash";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

function Signup() {
  // 인풋 상태
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();

  //입력지연 타이며
  const [typingTimer, setTypingTimer] = useState(null);

  // 유효성 검사 상태
  // const [emailValid, setEmailValid] = useState(false);

  // 이메일 패턴 정규식
  const emailPattern = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.(com|net)$/;

  // 에러 메시지 상태
  const [nickNameErrorMessage, setNickNameErrorMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleFileChange = (e) => {
    const files = e.target.files[0];
    if (files) {
      setProfileImage(files);
      console.log(files);
    }
  };

  useEffect(() => {
    if (!(email && pw.length >= 8 && nickName)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email, pw, nickName]);

  const validation = (e) => {
    const targetId = e.target.id;
    const value = e.target.value;
    if (typingTimer) {
      clearTimeout(typingTimer);
    }

    if (targetId === "user-nickname") {
      setNickName(value);
      if (value.length < 1) {
        setNickNameErrorMessage(true);
      } else {
        setNickNameErrorMessage(false);
      }
    } else if (targetId === "user-email") {
      setEmail(value);
      const isEmailValid = emailPattern.test(value);

      if (!value) {
        setEmailErrorMessage(false);
      } else if (!isEmailValid) {
        const timer = setTimeout(() => {
          setEmailErrorMessage(true);
        }, 500);
        setTypingTimer(timer);
      } else {
        setEmailErrorMessage(false);
      }
    } else if (targetId === "user-pw") {
      setPw(value);
      if (value.length < 8) {
        const timer = setTimeout(() => {
          setPasswordErrorMessage(true);
        }, 500);
        setTypingTimer(timer);
      } else if (value.length === 0) {
        setPasswordErrorMessage(false);
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // 이미지 업로드 요청
    const formData = new FormData();
    formData.append("attach", profileImage);
    fetch("https://api.fesp.shop/files", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        const imagePath = result.item[0].path;

        fetch("https://api.fesp.shop/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password: pw,
            name: nickName,
            profileImage: imagePath,
            type: "user",
          }),
        })
          .then((response) => response.json())
          .then(() => {
            //result 입력시 회원정보 콘솔에 노출
            console.log("회원가입 성공"); //result 입력시 회원정보 콘솔에 노출
            navigate("/user/login"); // 로그인 성공하면 홈화면으로 가기

            // 성공 시 처리 로직
          })
          .catch((error) => {
            console.error(alert(), "로그인 실패 ");
            // 에러 시 처리 로직
          });
      });
  };
  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8  border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            회원 가입
          </h2>
        </div>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <LabelStyle htmlFor="user-nickname">이름</LabelStyle>
            <InputStyle
              id="user-nickname"
              type="text"
              placeholder="이름을 입력해주세요."
              value={nickName}
              onChange={validation}
              required
            />
            {nickNameErrorMessage && (
              <Incorrect>* 이름을 입력해주세요.</Incorrect>
            )}
          </div>
          <div className="mb-4">
            <LabelStyle htmlFor="user-email">이메일</LabelStyle>
            <InputStyle
              id="user-email"
              type="email"
              placeholder="사용하실 E-mail을 입력해주세요."
              value={email}
              onChange={validation}
              required
            />
            {emailErrorMessage && <Incorrect>이메일형식이 아닙니다.</Incorrect>}
          </div>
          <div className="mb-4">
            <LabelStyle htmlFor="user-pw">비밀번호</LabelStyle>
            <InputStyle
              id="user-pw"
              type="password"
              placeholder="비밀번호를 적어주세요"
              value={pw}
              onChange={validation}
              autoComplete="false"
              required
            />
            {passwordErrorMessage && (
              <Incorrect>* 비밀번호는 8자 이상이어야 합니다.</Incorrect>
            )}
          </div>
          <div className="mb-4">
            <LabelStyle htmlFor="user-profile">포로필이미지</LabelStyle>
            <InputStyle
              id="user-profile"
              type="file"
              placeholder="프로필이미지를 등록해주세요"
              accept="image/*"
              // value={profileImage}
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="mt-10 flex justify-center items-center">
            <Submit disabled={disabled}>회원가입</Submit>
            <Button type="reset" bgColor="gray" onClick={() => history.back()}>
              취소
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Signup;
