import Button from "@components/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    loginCheck();
  }, []);

  const loginCheck = () => {
    if (sessionStorage === null || !isLoggedIn) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
      navigate("/login");
    }
  };

  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const logIn = () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      alert("이메일과 비밀번호를 입력해주세요!!");
    } else {
      sessionStorage.setItem("isLoggedIn", "true");
      setIsLogin(true);
      navigate("/info");
    }
  };

  const logOut = () => {
    sessionStorage.clear();
    setIsLogin(false);
    navigate("/user/login");
  };

  return (
    <header className="px-8 min-w-80 bg-slate-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <nav className="flex flex-wrap justify-center items-center p-4 md:flex-nowrap md:justify-between">
        <div className="w-1/2 order-1 md:w-auto">
          <a href="/" className="flex items-center gap-2">
            <img
              className="mr-3 h-6 sm:h-9"
              src="/images/favicon.svg"
              alt="로고 이미지"
            />
            <span className="text-lg font-bold">멋사컴</span>
          </a>
        </div>
        <div className="w-auto order-2 text-base mt-4 md:mt-0">
          <ul className="flex items-center gap-6 uppercase">
            <li className="hover:text-amber-500 hover:font-semibold">
              <a href="/info">정보공유</a>
            </li>
            <li className="hover:text-amber-500 hover:font-semibold">
              <a href="/free">자유게시판</a>
            </li>
            <li className="hover:text-amber-500 a:font-semibold">
              <a href="/qna">질문게시판</a>
            </li>
          </ul>
        </div>

        <div className="w-1/2 order-1 flex justify-end items-center md:order-2 md:w-auto">
          <div className="flex justify-end">
            {isLogin ? (
              <Button size="sm" onClick={logOut}>
                로그아웃
              </Button>
            ) : (
              <>
                <Button size="sm" onClick={logIn}>
                  로그인
                </Button>
                <Button
                  size="sm"
                  bgColor="gray"
                  onClick={() => (location.href = "/user/signup")}
                >
                  회원가입
                </Button>
              </>
            )}
          </div>

          {/* <!-- 라이트/다크 모드 전환 --> */}
          <Button
            data-toggle-dark="dark"
            className="ml-4 flex items-center w-8 h-8 justify-center text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <svg
              data-toggle-icon="moon"
              className="w-3.5 h-3.5 hidden"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
            </svg>
            <svg
              data-toggle-icon="sun"
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
            </svg>
            <span className="sr-only">Toggle dark/light mode</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
