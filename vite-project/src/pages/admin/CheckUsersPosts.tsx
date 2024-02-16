import React, { useEffect, useState } from 'react';
import Header from "../../components/header/Header";
import Btn from "../../components/button/Btn";
import Tab from "../../components/tab/Tab";
import PostDiv from "../../components/postDiv/PostDiv";
import { createUserPostConfig,createGetUserInfoConfig } from "../../components/state/AxiosModule";
import axios from 'axios';
import { getAccessToken,getRefreshToken } from '../../components/state/TokenAction';
import { UserListRequestInfo } from '../../components/dto/Dto';
import MyPost from '../myPage/MyPost';

import { createGetAllUsersPostConfig } from '../../components/state/AxiosModule';
import MainLoyout from '../../layout/MainLoyout';
function CheckUsersPosts() {
  
  const [page,setPage] = useState<number>(0);
  useEffect(()=>{

  },[])


  return (
    <MainLoyout>
    <div className="h-full  w-full">
      <div className="w-full ">
        <Header />
      </div>
      <div className="flex flex-row w-full h-full">
          <MyPost/>
      </div>
    </div>
    </MainLoyout>
  );
}

export default CheckUsersPosts;
