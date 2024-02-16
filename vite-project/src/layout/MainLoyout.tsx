import React from "react";

import Header from "../components/header/Header";
import { useAuthStore } from "../components/state/Login";
//import useAuthStore from "../components/state/Login";




type MainLoyoutProps = {
  children: React.ReactNode;
}

const MainLoyout = ({children}: MainLoyoutProps) => {
  const {isLogin} = useAuthStore();
 

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
