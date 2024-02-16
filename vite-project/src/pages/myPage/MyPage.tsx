import React, { useEffect, useState } from 'react';
import Header from "../../components/header/Header";
import Btn from "../../components/button/Btn";
import Tab from "../../components/tab/Tab";
import PostDiv from "../../components/postDiv/PostDiv";
import { createUserPostConfig,createGetUserInfoConfig } from "../../components/state/AxiosModule";
import axios from 'axios';
import { getAccessToken,getRefreshToken } from '../../components/state/TokenAction';
import { UserListRequestInfo } from '../../components/dto/Dto';
import MyPost from './MyPost';
import MyInfo from './MyInfo';
import MyLikePost from './MyLikePost';

function MyPage() {
  const [selectedInfoTabContent, setSelectedInfoTabContent] = useState<string>('내가 작성한 글');

  const [page,setPage] = useState<number>(0);

  const [renderedComponent, setRenderedComponent] = useState<JSX.Element | null>(null); 
  
  const handleInfoTabSelect = (content: string) => {
    setSelectedInfoTabContent(content); // 선택된 Info 탭의 내용 설정
  };








    const modifyMyInfos = () => {
      const config = createGetUserInfoConfig();
      axios(config)
        .then(response => {
          // 가져온 포스트 처리
          console.log(response.data);
        })
        .catch(error => {
          // 오류 처리
          console.error(error);
        });
      }  
  
  


  useEffect(() => {
    // 여기서 selectedInfoTabContent에 따라 렌더링될 컴포넌트를 설정합니다.
    if (selectedInfoTabContent === '내가 작성한 글') {
      setRenderedComponent(
        <MyPost createUserPostConfig={createUserPostConfig}></MyPost>
      );
    } else if (selectedInfoTabContent === '사용자 정보') {
      setRenderedComponent(
        <div>
          <MyInfo></MyInfo>
        </div>
      );
    } else if (selectedInfoTabContent === '관심 글') {
      setRenderedComponent(
        
        <div>
          <MyLikePost/>
        </div>
      );
    } else {
      // 이 외의 경우를 처리하거나 필요에 따라 빈 값으로 설정합니다.
      setRenderedComponent(null);
    }
  }, [selectedInfoTabContent]);

  return (
    <div className="h-full  w-full">
      <div className="w-full ">
        <Header />
      </div>
      <div className="flex flex-row w-full h-full">
        <div className="bg-red-100 basis-1/3">
          <div className="w-full h-1/4 bg-blue-100 mt-10">
            <Tab className="flex flex-col p-2" content={["내가 작성한 글", "사용자 정보", "관심 글"]} onTabSelect={handleInfoTabSelect} />
          </div>
        </div>
        <div className="bg-blue-100 basis-3/4 ">
          {renderedComponent}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
