import axios from "axios";
import { AddChildCommentInfo, AddParentCommentInfo } from "../dto/Dto";
import { createAddCommentConfig } from "../state/AxiosModule";

export const handleRegisterButtonClick = async (commentInfo:AddChildCommentInfo|AddParentCommentInfo,fetchData: () => void) => {


  console.log(commentInfo, 'in handleRegisterButtonClick');

  // 댓글 등록
  const config = createAddCommentConfig(commentInfo);
  try {
    const response = await axios(config);
    if (response.status === 200) {
      console.log("성공", response.data);

      
      fetchData(); //새로고침안해도 댓글이 보이게하고싶다.


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
