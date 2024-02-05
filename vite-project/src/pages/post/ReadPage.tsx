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
    
    fetchData();
  }, [boardId, isLogin]);

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

  const handleRegisterButtonClick = async () => {
    // 댓글 등록
    const config = createAddCommentConfig(parentCommentInfo);
    try {
      const response = await axios(config);
  
      if (response.data.statusCode === 200) {
        console.log("성공", response.data);
  
        
        fetchData(); //새로고침안해도 댓글이 보이게하고싶다.
  
        setParentCommentInfo({
          boardId: parentCommentInfo.boardId,
          content: "",
        });
      }
    } catch (err: any) {
      console.log(err);
      if (err.response) {
        console.error(err.response.data.message);
      } else if (err.request) {
        console.error(err.request);
      } else {
        console.error(err.message);
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
      <div className="w-full ">
        <Header></Header>
      </div>
      <div className="w-full h-full bg-red-100">
        <div className="ml-4">
          <Btn category="text" size="big" txtColor="black" txt={postResponse?.title}></Btn>
        </div>
        <div className="flex w-full justify-between pb-2" style={{ borderBottom: "1px solid #B3B3B3" }}>
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
        <div className="w-full min-h-72 max-h-full px-4 py-4">{postResponse?.content}</div>
        <div className="w-full bg-blue-100 flex justify-between px-4 py-4">
          <div className="w-4/5 h-full">
            <Input size="full" onChange={handleContentChange} placeHolder="댓글을 작성해보세요."></Input>
          </div>
          <div className="h-full py-4">
            <Btn buttonColor="primary" onClick={handleRegisterButtonClick} size="default" txt="등록"></Btn>
          </div>
        </div>
        <div className="w-full h-full min-h-72 max-h-full bg-red-100">
          {postResponse?.replyResponseDto.replies.map((reply) => (
            <Comment key={reply.replyId} reply={reply} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReadPage;
