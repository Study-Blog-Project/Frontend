//import  { useState } from 'react'

import Btn from "../../components/button/Btn";
//import search from '../../assets/search.png'
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../components/state/Login";
//import useAuthStore from '../../components/state/Login';
import { useEffect, useState } from "react";
import {
  createReadPostConfig,
  createRemovePostConfig,
  createPostLikePostConfig,
  createAdminRemovePostConfig,
} from "../../components/state/AxiosModule";
import { PostDto, AddParentCommentInfo } from "../../components/dto/Dto";
import axios from "axios";
import Comment from "../../components/comment/Comment";
import Input from "../../components/input/Input";
import { handleRegisterButtonClick } from "../../components/comment/handleCment";
import MainLoyout from "../../layout/MainLoyout";

function ReadPage() {
  const { isLogin, role } = useAuthStore();
  const { boardId } = useParams();
  const [postResponse, setPostResponse] = useState<PostDto | null>(null);
  const navigate = useNavigate();

  const [parentCommentInfo, setParentCommentInfo] = useState<AddParentCommentInfo>({
    boardId: Number(boardId),
    content: "",
  });

  const handleContentChange = (value: string) => {
    setParentCommentInfo({ ...parentCommentInfo, content: value });
  };
  const fetchData = async () => {
    if (boardId) {
      const config = createReadPostConfig(boardId);
      try {
        const response = await axios(config);

        if (response.data) {
          console.log(response.data);
          setPostResponse(response.data);
          setParentCommentInfo({
            boardId: parentCommentInfo.boardId,
            content: "",
          });
        }
      } catch (error: unknown) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log("^^");
    fetchData();
  }, []);

  const handleLikePostBtn = async () => {
    if (boardId) {
      const config = createPostLikePostConfig(boardId);
      try {
        const response = await axios(config);
        console.log(response);
      } catch (error: unknown) {
        console.log(error);
      }
    }
  };
  const removePost = async () => {
    if (boardId) {
      const config = createRemovePostConfig({ boardId });
      try {
        const response = await axios(config);

        if (response) {
          navigate(-1);
        }
      } catch (error: unknown) {
        console.log(error);
      }
    }
  };

  const adminRemovePost = async () => {
    if (boardId) {
      const config = createAdminRemovePostConfig(boardId);
      console.log(config);
      try {
        const response = await axios(config);

        if (response) {
          navigate(-1);
        }
      } catch (error: unknown) {
        console.log(error);
      }
    }
  };
  const handleModifyClick = () => {
    navigate(`/modify/${boardId}`, {
      state: {
        title: postResponse?.title,
        category: postResponse?.category,
        content: postResponse?.content,
      },
    });
  };
  useEffect(()=>{
    console.log(role)
    console.log(isLogin)
    console.log(postResponse)
  },[postResponse])
  return (
    <MainLoyout>
      {/* 타이틀 */}
      <div className="ml-4">
        <Btn category="text" size="big" txtColor="black" txt={postResponse?.title}></Btn>
      </div>
      {/* 글 Info / 버튼 */}
      <div className="flex w-full justify-between pb-2 border-b border-solid border-gray-300">
        <div className="ml-4 flex justify-around ">
          <Btn category="text" txtColor="black" size="small" txt={postResponse?.userId}></Btn>
          <span className="mr-2">{postResponse?.createTime}</span>
          <span>{postResponse?.viewCnt}</span>
        </div>
        <div className="mr-4 flex justify-around ">
          <Btn buttonColor="primary" className="mr-2" txt={postResponse?.recruit} size="small"></Btn>
          {postResponse?.myBoard && isLogin && (
            <div className="flex">
              <Btn handleBtn={handleModifyClick} className="mr-2" buttonColor="secondary" txt="수정" size="small"></Btn>
              {postResponse?.myBoard && <Btn handleBtn={removePost} buttonColor="headerBtn" txt="삭제" size="small"></Btn>}
            </div>
          )}
          {isLogin && role === "admin" && (
            <div className="flex mr-3">
              {<Btn handleBtn={adminRemovePost} buttonColor="headerBtn" txt="관리자삭제" size="small"></Btn>}
            </div>
          )}
          {isLogin && !postResponse?.myBoard && (
            <div className="flex">
              <Btn handleBtn={handleLikePostBtn} buttonColor="headerBtn" txt="관심" size="small"></Btn>
            </div>
          )}
        </div>
      </div>
      {/* 본문 */}
      <div className="w-full min-h-72 max-h-full px-4 py-4 border-b border-solid border-gray-300">{postResponse?.content}</div>
      {/* 댓글 입력창 */}
      <div className="w-full mt-2 flex items-center justify-between px-4 py-4">
        <div className="w-4/5 h-full">
          <Input size="full" onChange={handleContentChange} placeHolder="댓글을 작성해보세요."></Input>
        </div>
        <div className="h-full py-4">
          <Btn buttonColor="primary" onClick={() => handleRegisterButtonClick(parentCommentInfo, fetchData)} size="default" txt="등록"></Btn>
        </div>
      </div>
      {/* 댓글 목록 */}
      <div className="w-full h-full min-h-72 max-h-full pb-4">
        {postResponse?.replyResponseDto.replies.map((reply) => (
          <Comment depth={0} key={reply.replyId} isMyreply={reply.myReply} fetchData={fetchData} reply={reply} boardId={Number(boardId)} />
        ))}
      </div>
    </MainLoyout>
  );
}

export default ReadPage;
