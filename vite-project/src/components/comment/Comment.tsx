import React, { useState, useEffect } from "react";
import Btn from "../button/Btn";
import Input from "../input/Input";
import { handleRegisterButtonClick } from "./handleCment";
import { createDeleteCommentConfig, createModifyCommentConfig } from "../state/AxiosModule";
import axios from "axios";
import { AddChildCommentInfo, ModifyCommentInfo, ReplyDto } from "../dto/Dto";

function Comment(props: {isMyreply:boolean,fetchData: () => void, reply: ReplyDto; boardId: number | undefined; onReplyButtonClick?: (replyId: number | null) => void }) {
  const { reply, onReplyButtonClick, boardId, fetchData, isMyreply } = props;

  const [childCommentInfo, setChildCommentInfo] = useState({
    boardId: boardId,
    parentId: reply.replyId,
    content: "",
  });
  const [modifyCommentInfo, setModifyCommentInfo] = useState({
    replyId: reply.replyId,
    content: reply.content,
  });
  const [isComment, setIsComment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleContentChange = (value: string) => {
    setChildCommentInfo({ ...childCommentInfo, content: value });
  };

  const handleModifyButtonClick = () => {
    setIsEditing(true);
  };

  const handleModifySubmit = () => {
    setIsEditing(false);
    setModifyCommentInfo({ ...modifyCommentInfo, content: childCommentInfo.content });
    handleRegisterButtonClick(childCommentInfo, fetchData); 
  };

  const isCmnt = () => {
    setIsComment(!isComment);
  };

  const deleteReply = (replyId:number) => {
    if (replyId) {
      const id = replyId.toString();
      const config = createDeleteCommentConfig(id);
      axios(config)
        .then((response) => {
          console.log(response);
          fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };



  useEffect(() => {
    console.log(childCommentInfo);
  }, [childCommentInfo]);

  return (
    <div className="mx-2 my-1">
      <div className="flex justify-between ">
        <div className="flex">
          <div className="mr-3">{reply.memberRequestDto?.nickname}</div>
          <div>{new Date(reply.updateTime).toString()}</div>
        </div>
        <div>
          {!isEditing && (
            <Btn category="text" txtColor="gray" handleBtn={handleModifyButtonClick} size="small" txt="수정"></Btn>
          )}
          <Btn category="text" txtColor="gray" handleBtn={() => deleteReply(reply.replyId)} size="small" txt="삭제"></Btn>
        </div>
      </div>
      {(isEditing) && (
        <div className="w-full mt-2 flex items-center justify-between ">
          <div className="w-4/5 h-full">
            <Input
              size="full"
              initialValue={reply.content}
              value={childCommentInfo.content}
              onChange={handleContentChange}
            ></Input>
          </div>
          <div className="h-full">
            <Btn buttonColor="primary" size="default" category="text" txtColor="gray" txt="등록" handleBtn={handleModifySubmit}></Btn>
          </div>
        </div>
        
      )}
      {!isEditing&&<div className="border-b border-solid border-gray-400">{reply.content}</div>}
      <div>
        <Btn buttonColor="primary" category="text" txtColor="gray" handleBtn={isCmnt} size="small" txt="답글"></Btn>
      </div>
      {isComment && (
        <div className="w-full mt-2 flex items-center justify-between px-4 py-4">
          <div className="w-4/5 h-full">
            <Input
              size="full"
              placeHolder="댓글을 작성해보세요."
              value={childCommentInfo.content}
              onChange={handleContentChange}
            ></Input>
          </div>
          <div className="h-full">
            <Btn buttonColor="primary" size="default" category="text" txtColor="gray" txt="등록" onClick={handleRegisterButtonClick}></Btn>
          </div>
        </div>
      )}
      {reply.children.length > 0 && (
        <div>
          <strong>답글:</strong>
          {reply.children.map((child) => (
            <Comment fetchData={fetchData} isMyreply={reply.myReply} boardId={boardId} key={child.replyId} reply={child} onReplyButtonClick={onReplyButtonClick}></Comment>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
