import React, { useEffect, useState } from 'react';

import Btn from "../../components/button/Btn";
import Tab from "../../components/tab/Tab";
import PostDiv from "../../components/postDiv/PostDiv";
import { createUserPostConfig } from "../../components/state/AxiosModule";
import axios from 'axios';

import { UserListRequestInfo, UserPostDto } from '../../components/dto/Dto';
import { useNavigate } from 'react-router-dom';
function MyPost() {
  const navigate = useNavigate();
  const [selectedRecruitTabContent, setSelectedRecruitTabContent] = useState<string>('전체');
  const [selectedCategoryTabContent, setSelectedCategoryTabContent] = useState<string>('전체');
  const [boardResponse, setBoardResponse] = useState<UserPostDto | null>(null);
  
  
  const fetchMyPosts = ({ recruit, category,order }: UserListRequestInfo) => {
    // 서버로 요청을 보내어 해당 조건에 맞는 포스트 가져오기
    if (recruit !== null && category !== null && order!==null) {
      if (recruit === '전체') recruit = null;
      if (category === '전체') category = null;
      const config = createUserPostConfig({ recruit, category,order });
      console.log("recruit:",recruit,"category:", category,"order:",order )
    axios(config)
      .then(response => {
          
        console.log(response.data);
        setBoardResponse(response.data)
      })
      .catch(error => {
        // 오류 처리
        console.error(error);
      });
    }
  };
  
  const handleRecruitTabSelect = (content: string) => {
    setSelectedRecruitTabContent(content); // 선택된 recruit 탭의 내용 설정
    fetchMyPosts({ recruit: content, category: selectedCategoryTabContent,order:0 }); // 포스트 가져오기
  };

  const handleCategoryTabSelect = (content: string) => {
    setSelectedCategoryTabContent(content); // 선택된 category 탭의 내용 설정
    fetchMyPosts({ recruit: selectedRecruitTabContent, category: content,order:0}); // 포스트 가져오기
  };



  useEffect(()=>{
    fetchMyPosts({ recruit: selectedRecruitTabContent, category: selectedCategoryTabContent,order:0})
  },[selectedRecruitTabContent,selectedCategoryTabContent])

  const PostDivs = (boardResponse: UserPostDto) => {
    return boardResponse.content.map((boardItem) => (
      <PostDiv
        key={boardItem.boardId}
        firstPin={{txt: boardItem.recurit}}
        secondPin={{txt: boardItem.type}}
        title={boardItem.title}
        boardId={boardItem.boardId}
        content={boardItem.content}
        id={boardItem.nickname} 
        time={boardItem.time}
        view={boardItem.hitCnt}
        comment={boardItem.replyCnt}
        handlePost={() => linkToPost(boardItem.boardId)}
      />
    ));
  };

  const linkToPost = (boardId: number) => {
    navigate(`/read/${boardId}`);
  };

  return (
    <>
      <div className="w-full bg-red-100 h-24 border-2 border-gray-400 border-solid rounded-lg flex pl-6 items-center">
          <Tab content={["전체", "모집중", "모집완료"]} onTabSelect={handleRecruitTabSelect} />
      </div>
      <div className="w-full bg-green-100 h-24 flex pl-6 items-center justify-between border-b border-solid border-gray-400 ">
        <Tab content={["전체", "코테", "프로젝트", "CS", "ETC"]} onTabSelect={handleCategoryTabSelect} />
        <div className="basis-32 pr-8 ">
          <Btn size="big" txt="글쓰기" buttonColor="secondary" />
        </div>
      </div>
      <div className="w-full flex flex-col">
        {boardResponse && PostDivs(boardResponse)}
      </div>
    </>
  );
}

export default MyPost;
