import HtmlEditor from "../../components/htmlEditor/HtmlEditor";

import { WritePostInfo } from "../../components/dto/Dto";
import Btn from "../../components/button/Btn";
import { useState } from "react";
import Input from "../../components/input/Input";
import axios from "axios";
import { createWriteConfig } from "../../components/state/AxiosModule";
import SelectComponent from "../../components/select/Select";
import { getNickName } from "../../components/state/TokenAction";
import { useNavigate } from "react-router-dom";
import MainLoyout from "../../layout/MainLoyout";

function WritePage() {
  const nick = getNickName();
  console.log(nick);
  const data = [
    { value: "CS", label: "CS" },
    { value: "코테", label: "코테" },
    { value: "프로젝트", label: "프로젝트" },
  ];
  const navigate = useNavigate();

  const [WriteInfo, setWriteInfo] = useState<WritePostInfo>({
    content: "",
    category: "",
    title: "",
    nickname: nick,
  });

  const handleInputChange = (key: keyof WritePostInfo, value: string) => {
    const sanitizedValue = value.replace(/<\/?p>/g, "");
    setWriteInfo({
      ...WriteInfo,
      [key]: sanitizedValue,
    });
  };

  const submitInfo = async () => {
    console.log(WriteInfo);
    const config = createWriteConfig(WriteInfo);
    try {
      const response = await axios(config);

      if (response.data.statusCode === 200) {
        console.log("성공", response.data);
        navigate(-1);
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <MainLoyout>
      <div className="ml-14 pb-4 pt-4 text-2xl font-bold">
        <Input onChange={(value) => handleInputChange("title", value)} size="full" placeHolder="제목에 핵심 내용을 요약해보세요."></Input>
      </div>
      <div className="flex ml-14 pb-4">
        <span>모집 구분</span>
        <div className="ml-8">
          <SelectComponent defaultValue="CS" onSelect={(value) => handleInputChange("category", value)} data={data}></SelectComponent>
        </div>
      </div>
      <div className="w-full">
        <HtmlEditor onChange={(value) => handleInputChange("content", value)}></HtmlEditor>
      </div>
      <div className="flex justify-end pt-3 h-12 mr-3">
        <Btn txt="취소" className="mr-3 w-16 " buttonColor="white" txtColor="black" size="small"></Btn>
        <Btn txt="등록" handleBtn={submitInfo} className=" w-16 " size="small"></Btn>
      </div>
    </MainLoyout>
  );
}
export default WritePage;
