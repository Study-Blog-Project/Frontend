
import { useEffect, useState } from "react";
import { ModifyPostInfo, ModifyRecruitInfo } from "../../components/dto/Dto"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Banner from "../../components/banner/Banner";
import Input from "../../components/input/Input";
import SelectComponent from "../../components/select/Select";
import HtmlEditor from "../../components/htmlEditor/HtmlEditor";
import Btn from "../../components/button/Btn";
import { createModifyPostConfig, createModifyRecruitConfig } from "../../components/state/AxiosModule";
import axios from "axios";
import MainLoyout from "../../layout/MainLoyout";

function ModifyPostPage() {
  const navigate = useNavigate();
  const data = [
    {"value": "cs", "label": "cs"},
    {"value": "코테", "label": "코테"},
    {"value": "프로젝트", "label": "프로젝트"},
  ]
  const recruit = [
    {"value": "모집중", "label": "모집중"},
    {"value": "모집완료", "label": "모집완료"},
  ]
  const { boardId } = useParams();
  const location = useLocation();
  const [ModifyPostInfo, setModifyPostInfo] = useState<ModifyPostInfo>({
    title: "",
    category: "",
    content: "",
    boardId: boardId || ""
  });

  const [ModifyRecruitInfo, setModifyRecruitInfo] = useState<ModifyRecruitInfo>({
    boardId: boardId || "",
    recruit: "모집중"||"모집완료",
  });

  const handleInputChange = (key: keyof ModifyPostInfo, value: string) => {
    const sanitizedValue = value.replace(/<\/?p>/g, '');
    setModifyPostInfo({
      ...ModifyPostInfo,
      [key]: sanitizedValue,
    });
  };

  const handleRecruitChange = (key: keyof ModifyRecruitInfo, value: string) => {
    const sanitizedValue = value.replace(/<\/?p>/g, '');
    setModifyRecruitInfo({
      ...ModifyRecruitInfo,
      [key]: sanitizedValue,
    });
  };


  useEffect(() => {
    console.log(location.state, 'location state');
    if(location.state) {
      const { title, content ,category} = location.state;
      setModifyPostInfo({
        ...ModifyPostInfo,
        title: title,
        content: content,
        category:category,
      });
    }
  }, []);

  const goBack = () =>{
    navigate(-1)
  }
  const submitInfo = async () => {
    const config = createModifyPostConfig(ModifyPostInfo);
    const recruitConfig = createModifyRecruitConfig(ModifyRecruitInfo)
    console.log(ModifyPostInfo)
    try {
      const response = await axios(config);

      if (response.data.statusCode === 200) {

        console.log('성공', response.data);
      }
    } catch (err: unknown) {
      console.log(err)  
    }

    try {
      const response = await axios(recruitConfig);

      if (response.data.statusCode === 200) {

        console.log('성공', response.data);
        navigate(-1)
      }
    } catch (err: unknown) {
      console.log(err)  
    }
    
  };

  return (
    <MainLoyout>
    <div className="w-full flex justify-center py-4" >
      <Banner className="text-3xl font-black" title="프로젝트 모집 예시를 참고해 주세요."></Banner>
    </div>
    <div className="ml-14 pb-4 text-2xl font-bold">
      <Input initialValue={ModifyPostInfo.title} onChange={(value) => handleInputChange("title", value)} size="full" placeHolder="제목에 핵심 내용을 요약해보세요." >
      </Input>
    </div>
    <div className="flex ml-14 pb-4">
      <div className="w-auto">
        <SelectComponent defaultValue="모집중" onSelect={(value) => handleRecruitChange("recruit", value)} data={recruit}></SelectComponent>
      </div>
      <div className="ml-4 w-auto">
        <SelectComponent defaultValue="cs" onSelect={(value) => handleInputChange("category", value)} data={data}></SelectComponent>
      </div>
    </div>
    <div className="w-full h-[400px]" >
      <HtmlEditor initialValue={ModifyPostInfo.content} onChange={(value) => handleInputChange("content", value)}></HtmlEditor>
    </div>
     <div className="flex justify-end pt-3 h-12 mr-3">
      <Btn handleBtn={goBack} txt="취소" className="mr-3 w-16 " buttonColor="white" txtColor="black" size="small"></Btn>
      <Btn handleBtn={submitInfo} txt="수정"  className=" w-16 " size="small"></Btn>
     </div>
    </MainLoyout>
  )
}

export default ModifyPostPage
