//import  { useState } from 'react'
import Header from "../../components/header/Header";
import Btn from "../../components/button/Btn";
//import search from '../../assets/search.png'
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../components/state/Login";
//import useAuthStore from '../../components/state/Login';
import { useEffect, useState } from "react";
import { createAddCommentConfig, createReadPostConfig, createRemovePostConfig } from "../../components/state/AxiosModule";
import { PostDto, AddParentCommentInfo, AddChildCommentInfo } from "../../components/dto/Dto";
import axios from "axios";
import Comment from "../../components/comment/Comment";
import Input from "../../components/input/Input";
import { handleRegisterButtonClick } from "../../components/comment/handleCment";

function ReadPage() {
  const { isLogin } = useAuthStore();
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
      } catch (error: any) {
        console.log(error);
        const { status, data } = error.response;
        console.log(data.message);
        if (status === 404) {
          if (data.message === "사용자를 찾지 못했습니다.") {
            console.error("사용자를 찾지 못했습니다.");
          } else {
            console.error(data.message);
          }
        }
      }
    }
  };

  useEffect(() => {
    console.log("^^")
    fetchData();
  }, []);
  const removePost = async () => {
    if (boardId) {
      const config = createRemovePostConfig({ boardId });
      try {
        const response = await axios(config);

        if (response.data) {
          console.log(response.data);
          setPostResponse(response.data);
        }
      } catch (error: any) {
        console.log(error);
        const { status, data } = error.response;
        console.log(data.message);
        if (status === 404) {
          if (data.message === "사용자를 찾지 못했습니다.") {
            console.error("사용자를 찾지 못했습니다.");
          } else {
            console.error(data.message);
          }
        }
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

  return (
    <div className="h-full w-full">
      <div className="w-full border-b border-solid border-gray-100">
        <Header></Header>
      </div>
      <div className="w-full h-full">
        <div className="ml-4">
          <Btn category="text" size="big" txtColor="black" txt={postResponse?.title}></Btn>
        </div>
        <div className="flex w-full justify-between pb-2 border-b border-solid border-gray-300">
          <div className="ml-4 flex justify-around ">
            <Btn category="text" txtColor="black" size="small" txt={postResponse?.userId}></Btn>
            <span className="mr-2">{postResponse?.createTime}</span>
            <span>{postResponse?.viewCnt}</span>
          </div>
          <div className="mr-4 flex justify-around ">
            <Btn buttonColor="primary" className="mr-2" txt="모집중" size="small"></Btn>
            {/* {isLogin && (
            <div className='flex'>
              <Btn handleBtn={handleModifyClick} className='mr-2' buttonColor='secondary' txt="수정" size="small"></Btn>
              {postResponse?.myBoard && <Btn  handleBtn={removePost}  buttonColor='headerBtn' txt="삭제" size="small"></Btn>}
            </div>
            )} */}
            {/* 여기부터 */}
            {
              <div className="flex">
                <Btn handleBtn={handleModifyClick} className="mr-2" buttonColor="secondary" txt="수정" size="small"></Btn>
                {<Btn handleBtn={removePost} buttonColor="headerBtn" txt="삭제" size="small"></Btn>}
              </div>
            }
            {/* 여기까지 지워야함 */}
            {!isLogin && (
              <div className="flex">
                <Btn buttonColor="headerBtn" txt="관심" size="small"></Btn>
              </div>
            )}
          </div>
        </div>
        <div className="w-full min-h-72 max-h-full px-4 py-4 border-b border-solid border-gray-300">{postResponse?.content}</div>
        <div className="w-full mt-2 flex items-center justify-between px-4 py-4">
          <div className="w-4/5 h-full">
            <Input size="full" onChange={handleContentChange} placeHolder="댓글을 작성해보세요."></Input>
          </div>
          <div className="h-full py-4">
          <Btn buttonColor="primary" onClick={() => handleRegisterButtonClick(parentCommentInfo, fetchData)} size="default" txt="등록"></Btn>

          </div>
        </div>
        <div className="w-full h-full min-h-72 max-h-full">
          {postResponse?.replyResponseDto.replies.map((reply) => (
            <Comment key={reply.replyId} isMyreply={reply.myReply} fetchData={fetchData} reply={reply} boardId={boardId} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReadPage;
