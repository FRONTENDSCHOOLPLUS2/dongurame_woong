import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import Spinner from "./components/Spinner";
import { RecoilRoot } from "recoil";
import useThemeStore from "./zustand/themeStore";

// react-query 사용하기 위해선
const quieryClient = new QueryClient();
function App() {
  //전체를 다 가져오는건 불필요한 렌더링이 일어나기 때문에 아래의 방법을 이용하여 렌더링 해주는것이좋음(현재는 똑같음)
  // const { isDarkMode } = useThemeStore();

  //렌더링 최적화를 위해서 수동으로 필요한 속성만 반환하여 사용.
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <QueryClientProvider client={quieryClient}>
      <RecoilRoot>
        <React.Suspense fallback={<Spinner.FullScreen />}>
          {/* Fallback = 로딩중일때 보여주는 화면 전체적용 */}
          <RouterProvider router={router} />
        </React.Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
