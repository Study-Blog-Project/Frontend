import React from "react";
import Banner from "../components/banner/Banner";
import Header from "../components/header/Header";
import { useAuthStore } from "../components/state/Login";
//import useAuthStore from "../components/state/Login";
import {useLocation} from "react-router-dom";

const banner = {
  "/main": {
    bannerColor: "secondary",
    title: "프로젝트 팀원을 모집해보세요.",
    description: "협업을 통한 경험 노하우 쌓기!",
  },
  "/write": {
    bannerColor: "secondary",
    title: "프로젝트 팀원을 모집해보세요.",
    description: "협업을 통한 경험 노하우 쌓기!",
  }
}


type MainLoyoutProps = {
  children: React.ReactNode;
}

const MainLoyout = ({children}: MainLoyoutProps) => {
  const {isLogin} = useAuthStore();
  const location = useLocation();
  const { pathname } = location;
  // const { title, bannerColor, description } = banner[pathname];


  return (
    <div className="w-screen h-screen">
      <div className="max-w-[1136px] mx-[auto]">
        <Header isLogin={isLogin}></Header>
      </div>
      {/*{banner[pathname] &&*/}
      {/*  <div className='flex justify-center'>*/}
      {/*    <Banner bannerColor={bannerColor} title={title}>{description}</Banner>*/}
      {/*  </div>*/}
      {/*}*/}
      <div className="content max-w-[1136px] mx-[auto]">
        {children}
      </div>
    </div>
  )
}
export default MainLoyout;
