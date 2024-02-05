
import { useEffect, useState } from "react";
import { ModifyPostInfo } from "../../components/dto/Dto"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Banner from "../../components/banner/Banner";
import Input from "../../components/input/Input";
import SelectComponent from "../../components/select/Select";
import HtmlEditor from "../../components/htmlEditor/HtmlEditor";
import Btn from "../../components/button/Btn";
import { createModifyPostConfig } from "../../components/state/AxiosModule";
import axios from "axios";

function ModifyPostPage() {
  const navigate = useNavigate();
  const data = [
    {"value": "cs", "label": "cs"},
    {"value": "코테", "label": "코테"},
    {"value": "프로젝트", "label": "프로젝트"},
  ]
  const { boardId } = useParams();
  const location = useLocation();
  const [ModifyPostInfo, setModifyPostInfo] = useState<ModifyPostInfo>({
    title: "",
    category: "",
    content: "",
    boardId: boardId || ""
  });
  
  const handleInputChange = (key: keyof ModifyPostInfo, value: string) => {
    const sanitizedValue = value.replace(/<\/?p>/g, '');
    setModifyPostInfo({
      ...ModifyPostInfo,
      [key]: sanitizedValue,
    });
  };

  useEffect(() => {

    const { title, content ,category} = location.state;
    setModifyPostInfo({
      ...ModifyPostInfo,
      title: title,
      content: content,
      category:category,
    });
  }, []);

  const goBack = () =>{
    navigate(-1)
  }

  const submitInfo = async () => {
    const config = createModifyPostConfig(ModifyPostInfo);
    console.log(ModifyPostInfo)
    try {
      const response = await axios(config);

      if (response.data.statusCode === 200) {

        console.log('성공', response.data);
      }
    } catch (err: any) {
      console.log(err)
      if (err.response) {
        console.error(err.response.data.message);
      } else if (err.request) {
        console.error(err.request);
      } else {
        console.error(err.message);
      }

    }

  };

  return (
    <div className="w-full h-full">
    <div className="w-full flex justify-center py-4" >
      <Banner className="text-3xl font-black" title="프로젝트 모집 예시를 참고해 주세요."></Banner>
    </div>
    <div className="ml-14 pb-4 text-2xl font-bold">
      <Input initialValue={ModifyPostInfo.title} onChange={(value) => handleInputChange("title", value)} size="full" placeHolder="제목에 핵심 내용을 요약해보세요." >
      </Input>
    </div>
    <div className="flex ml-14 pb-4">
      <span>
        모집 구분
      </span>
      <div className="ml-8">
        <SelectComponent defaultValue="cs" onSelect={(value) => handleInputChange("category", value)} data={data}></SelectComponent>
      </div>
    </div>
    <div className="w-full" >
      <HtmlEditor initialValue={ModifyPostInfo.content} onChange={(value) => handleInputChange("content", value)}></HtmlEditor>
    </div>
     <div className="flex justify-end pt-3 h-12 mr-3">
      <Btn handleBtn={goBack} txt="취소" className="mr-3 w-16 " buttonColor="white" txtColor="black" size="small"></Btn>
      <Btn handleBtn={submitInfo} txt="수정"  className=" w-16 " size="small"></Btn>
     </div>
   </div>
  )
}

export default ModifyPostPage