import HtmlEditor from "../../components/htmlEditor/HtmlEditor";
import Banner from "../../components/banner/Banner";
import { WriteInfo } from "../../components/dto/Dto";
import Btn from "../../components/button/Btn";
import { useState } from "react";
import Input from "../../components/input/Input";
import axios from "axios";
import { createWriteConfig } from "../../components/state/AxiosModule";
import SelectComponent from "../../components/select/Select";



function WritePage() {

  const data = [
    {"value": "cs", "label": "cs"},
    {"value": "코테", "label": "코테"},
    {"value": "프로젝트", "label": "프로젝트"},
  ]
  
  let userId =3;
  const [WriteInfo, setWriteInfo] = useState<WriteInfo>({
    recruit: "",
    content: "",
    category: "",
    title: "",
    id:userId,
  });

  const handleInputChange = (key: keyof WriteInfo, value: string) => {
    const sanitizedValue = value.replace(/<\/?p>/g, '');
    setWriteInfo({
      ...WriteInfo,
      [key]: sanitizedValue,
    });

  };



  const submitInfo = async () => {
    console.log(WriteInfo)
    const config = createWriteConfig(WriteInfo); 
    try {
      const response = await axios(config);

      if (response.data.statusCode === 200) {

        console.log('성공', response.data);
      }
    } catch (error: any) {
      const { status, data } = error.response;
      console.log(data.message)
      if (status === 404) {
       
        if (data.message === '사용자를 찾지 못했습니다.') {
          console.error('사용자를 찾지 못했습니다.');
        } else {
          console.error(data.message);
        }
      }
    }
  };


 return (
   <div className="w-full h-full">
    <div className="w-full flex justify-center py-4" >
      <Banner className="text-3xl font-black" size="full" txt="프로젝트 모집 예시를 참고해 주세요."></Banner>
    </div>
    <div className="ml-14 pb-4 text-2xl font-bold">
      <Input  onChange={(value) => handleInputChange("title", value)} size="full" placeHolder="제목에 핵심 내용을 요약해보세요." >
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
      <HtmlEditor onChange={(value) => handleInputChange("content", value)}></HtmlEditor>
    </div>
     <div className="flex justify-end pt-3 h-12 mr-3">
      <Btn txt="취소" className="mr-3 w-16 " buttonColor="white" txtColor="black" size="small"></Btn>
      <Btn txt="등록" handleBtn={submitInfo}  className=" w-16 " size="small"></Btn>
     </div>
   </div>
 );
}
export default WritePage;
