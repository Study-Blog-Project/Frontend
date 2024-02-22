import { useState, useEffect } from "react";
import Btn from "../button/Btn";
import Input from "../input/Input";
import { handleRegisterButtonClick } from "./handleCment";
import { deleteComment } from "../state/AxiosModule";
import { ReplyDto } from "../dto/Dto";

function Comment(props: {
  depth: number;
  isMyreply: boolean;
  fetchData: () => void;
  reply: ReplyDto;
  boardId: number | undefined;
  onReplyButtonClick?: (replyId: number | null) => void;
}) {
  const { depth, reply, onReplyButtonClick, boardId, fetchData } = props;

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

  const handleModifyContentChange = (value: string) => {
    setModifyCommentInfo({ ...modifyCommentInfo, content: value });
  };
  const handleModifyButtonClick = () => {
    setIsEditing(true);
  };

  const handleModifySubmit = () => {
    setIsEditing(false);

    console.log(modifyCommentInfo);
    handleRegisterButtonClick(modifyCommentInfo, fetchData,true);
  };

  const handleCreateReply = () => {
    setIsComment(false);
    handleRegisterButtonClick(childCommentInfo, fetchData,false);
  };

  const isCmnt = () => {
    setIsComment(!isComment);
  };

  const deleteReply = async (replyId: number) => {
    if (replyId) {
      if ((await deleteComment(replyId)).success) {
        fetchData();
      } else {
        console.log("삭제 실패");
      }
    }
  };

  useEffect(() => {
    console.log(childCommentInfo);
  }, [childCommentInfo]);

  return (
    <div className="ml-4 mt-4 flex-1">
      <div className="border border-[1px] border-gray-200 p-4 rounded-lg">
        {/* 이름, 작성일 */}
        <div className="flex justify-between ">
          <div className="flex items-center">
            <div className="mr-3 font-bold text-gray-600">{reply.memberRequestDto?.nickname}</div>
            <div className="text-gray-400 text-xs">{new Date(reply.updateTime).toString()}</div>
          </div>
          <div>
            {!isEditing && <Btn category="text" txtColor="gray" handleBtn={handleModifyButtonClick} size="small" txt="수정"></Btn>}
            {reply.replyId && (
              <Btn buttonColor="primary" category="text" txtColor="gray" handleBtn={() => deleteReply(reply.replyId!)} size="small" txt="삭제"></Btn>
            )}
          </div>
        </div>
        {/* 수정모드 가 아닌경우 Contents */}
        {!isEditing && <div className="p-4 min-h-18">{reply.content}</div>}
        {/* 수정모드 */}
        {isEditing && (
          <div className="w-full mt-2 flex items-center justify-between ">
            <div className="w-4/5 h-full">
              <Input size="full" initialValue={reply.content} value={childCommentInfo.content} onChange={handleModifyContentChange}></Input>
            </div>
            <div className="h-full">
              <Btn buttonColor="primary" size="default" category="text" txtColor="gray" txt="등록" handleBtn={handleModifySubmit}></Btn>
            </div>
          </div>
        )}
        {/* 답글 버튼 */}
        <div>{depth < 2 && <Btn buttonColor="primary" category="text" txtColor="gray" handleBtn={isCmnt} size="small" txt="답글"></Btn>}</div>
      </div>
      {/* 댓글 작성 모드 */}
      {depth < 2 && isComment && (
        <div className="w-full mt-2 flex items-center justify-between px-4 py-4">
          <div className="w-4/5 h-full">
            <Input size="full" placeHolder="댓글을 작성해보세요." value={childCommentInfo.content} onChange={handleContentChange}></Input>
          </div>
          <div className="h-full">
            <Btn buttonColor="primary" size="default" category="text" txtColor="gray" txt="등록" handleBtn={handleCreateReply}></Btn>
          </div>
        </div>
      )}
      {/* 댓글이 있는 경우 - 댓글 */}
      {reply.children.length > 0 && (
        <div className="flex">
          {depth === 0 && <div className="mt-2 ml-2 w-2 bg-gray-100"></div>}
          <div className="flex flex-col flex-1">
            {reply.children.map((child) => (
              <Comment
                depth={depth + 1}
                fetchData={fetchData}
                isMyreply={reply.myReply}
                boardId={boardId}
                key={child.replyId}
                reply={child}
                onReplyButtonClick={onReplyButtonClick}
              ></Comment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Comment;
