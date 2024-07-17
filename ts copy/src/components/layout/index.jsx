import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-700 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <Header />
      <React.Suspense fallback={<Spinner.WithHeader />}>
        {/* 헤더와 푸터는 보이는 상태로 로딩창보이기 */}
        <Outlet />
      </React.Suspense>
      <Footer />
    </div>
  );
}
