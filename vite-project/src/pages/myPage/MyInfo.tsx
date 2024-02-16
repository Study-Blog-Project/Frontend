import axios from "axios";
import { createGetUserInfoConfig, createModifyUserInfoConfig } from "../../components/state/AxiosModule";
import { UserInfoDto,ModifyUserInfo } from "../../components/dto/Dto";
import { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import Btn from "../../components/button/Btn";


function MyInfo() {
  const [infoResponse, setInfoResponse] = useState<UserInfoDto | null>(null);
  const [ModifyUserInfo, setModifyUserInfo] = useState<ModifyUserInfo>({
    username: "",
    nickname: "",
  });

  const fetchMyInfos = () => {
    const config = createGetUserInfoConfig();
    axios(config)
      .then(response => {
        console.log(response.data);
        setInfoResponse(response.data)
      })
      .catch(error => {
        // 오류 처리
        console.error(error);
      });
    }

  const fetchMyNewInfos = () => {
    const config = createModifyUserInfoConfig(ModifyUserInfo);
    axios(config)
      .then(response => {
        console.log(response.data);
        fetchMyInfos();
      })
      .catch(error => {
        // 오류 처리
        console.error(error);
      });
    }

  useEffect(()=>{
    fetchMyInfos();
  },[])

  useEffect(()=>{
    setModifyUserInfo({
      ...ModifyUserInfo,
      
      username: infoResponse?.username,
      nickname: infoResponse?.nickname,
    });
  },[infoResponse])


  const handleInputChange = (key: keyof ModifyUserInfo, value: string) => {
    const sanitizedValue = value.replace(/<\/?p>/g, '');
    setModifyUserInfo({
      ...ModifyUserInfo,
      [key]: sanitizedValue,
    });
  };



  return (
    <>
      {infoResponse && 
      <div className="w-full h-24 rounded-lg flex flex-col items-center pt-4 pl-6 ">
        <div>
          <span>
            이름
          </span>
          <Input className="mb-4" initialValue={infoResponse.username} onChange={(value) => handleInputChange("username", value)} size="default" ></Input>
        </div>
        <div>
          <span>
            닉네임
          </span>
          <Input className="mb-4" initialValue={infoResponse.nickname} onChange={(value) => handleInputChange("nickname", value)} size="default" ></Input>
        </div>
        <div>
          <span>
            이메일
          </span>
          <div className="mb-4">
            {infoResponse.email}
          </div>
        </div>
        <div>
          <span>
            권한
          </span>
          <div className="mb-4">
            {infoResponse.role}
          </div>
        </div>
          
        <div>
          <Btn buttonColor="primary" size="default" handleBtn={fetchMyNewInfos} txt="수정하기" ></Btn>
        </div>
          
      </div>
      }
    </>
  )
}

export default MyInfo