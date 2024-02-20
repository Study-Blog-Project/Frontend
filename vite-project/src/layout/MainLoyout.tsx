import React from "react";
import Banner from "../components/banner/Banner";

import Header from "../components/header/Header";
import { useAuthStore } from "../components/state/Login";
import { useLocation } from "react-router-dom";
//import useAuthStore from "../components/state/Login";

const bannerSelect = (pathname: string): { show: boolean; bannerColor: "primary" | "secondary"; title: string; description: string } => {
  switch (pathname) {
    case "/":
      return {
        show: true,
        bannerColor: "secondary",
        title: "프로젝트 팀원을 모집해보세요.",
        description: "협업을 통한 경험 노하우 쌓기!",
      };
    case "/write":
      return {
        show: true,
        bannerColor: "secondary",
        title: "프로젝트 팀원을 모집해보세요.",
        description: "협업을 통한 경험 노하우 쌓기!",
      };
    default:
      return {
        show: false,
        bannerColor: "primary",
        title: "",
        description: "",
      };
  }
};

type MainLoyoutProps = {
  children: React.ReactNode;
};

const MainLoyout = ({ children }: MainLoyoutProps) => {
  const { isLogin } = useAuthStore();
  const location = useLocation();
  const { pathname } = location;

  const { title, bannerColor, description, show } = bannerSelect(pathname);

  return (
    <div className="w-full h-screen">
      <div className="max-w-[1136px] mx-[auto]">
        <Header isLogin={isLogin}></Header>
      </div>
      {show && (
        <div className="flex justify-center">
          <Banner bannerColor={bannerColor} title={title}>
            {description}
          </Banner>
        </div>
      )}
      <div className="content max-w-[1136px] mx-[auto]">{children}</div>
    </div>
  );
};
export default MainLoyout;
