import { useState } from "react";
import Btn from "../button/Btn";
import { AddChildCommentInfo, ReplyDto } from "../dto/Dto";
import Input from "../input/Input";

function Comment(props: { reply: ReplyDto, onReplyButtonClick?: (replyId: number | null) => void }) {
  const { reply, onReplyButtonClick } = props;
  const [childCommentInfo, setChildCommentInfo] = useState<AddChildCommentInfo>({
    boardId: reply.replyId, // 댓글이 속한 게시글 ID
    parentId: reply.parentId, // 대댓글의 경우 부모 댓글의 ID를 parentId로 설정
    content: "", // 댓글 내용
  });


  const handleReplyButtonClick = () => {
    if (onReplyButtonClick && reply.replyId) {
      onReplyButtonClick(reply.replyId);
    }
  };
  
  const handleContentChange = (value: string) => {
    setChildCommentInfo({ ...childCommentInfo, content: value });
  };

  const handleRegisterButtonClick = () => {
    
    console.log("Register button clicked for comment:", childCommentInfo);

    setChildCommentInfo({
      boardId: reply.replyId,
      parentId: reply.parentId,
      content: "",
    });
  };

  return (
    <div>
      <div>Reply ID: {reply.replyId}</div>
      <div>Replyer: {reply.memberRequestDto.nickname}</div>
      <div>Content: {reply.content}</div>
      <div>Update Time: {new Date(reply.updateTime).toString()}</div>
      <div>Is My Reply: {reply.myReply ? 'Yes' : 'No'}</div>
      <div>
        <Btn buttonColor="primary" size="default" txt="답글" onClick={handleReplyButtonClick}></Btn>
      </div>
      {/* Nested comments */}
      {reply.children.length > 0 && (
        <div style={{ marginLeft: '20px' }}>
          <strong>대댓글:</strong>
          {reply.children.map(child => (
            <Comment key={child.replyId} reply={child} onReplyButtonClick={onReplyButtonClick} />
          ))}
        </div>
      )}
      {/* 입력 필드와 등록 버튼 */}
      <div className="w-full bg-blue-100 flex justify-between px-4 py-4">
        <div className="w-4/5 h-full">
          <Input
            size="full"
            placeHolder="댓글을 작성해보세요."
            value={childCommentInfo.content}
            onChange={handleContentChange}
          ></Input>
        </div>
        <div className="h-full py-4">
          <Btn buttonColor="primary" size="default" txt="등록" onClick={handleRegisterButtonClick}></Btn>
        </div>
      </div>
    </div>
  );
}
export default Comment