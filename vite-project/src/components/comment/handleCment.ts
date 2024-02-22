import axios from "axios";
import { AddChildCommentInfo, AddParentCommentInfo, ModifyCommentInfo } from "../dto/Dto";
import { createAddCommentConfig,createModifyCommentConfig } from "../state/AxiosModule";

export const handleRegisterButtonClick = async (commentInfo:AddChildCommentInfo|AddParentCommentInfo|ModifyCommentInfo,fetchData: () => void  , isModifyCmnt: boolean ) => {


  console.log(commentInfo)

  // 댓글 등록
  if(isModifyCmnt === true)
  {
    const config = createModifyCommentConfig(commentInfo as ModifyCommentInfo);
    console.log(config)
    try {
      const response = await axios(config);
      if (response.status === 200) {
        console.log("성공", response.data);
  
        
        fetchData(); //새로고침안해도 댓글이 보이게하고싶다.
  
  
      }
    } catch (err: unknown) {
      console.log(err);
    }
  }
  else{
    const config = createAddCommentConfig(commentInfo as AddChildCommentInfo|AddParentCommentInfo );
    try {
      const response = await axios(config);
      if (response.status === 200) {
        console.log("성공", response.data);
  
        
        fetchData(); //새로고침안해도 댓글이 보이게하고싶다.
  
  
      }
    } catch (err: unknown) {
      console.log(err);
    }
  }
  
};
