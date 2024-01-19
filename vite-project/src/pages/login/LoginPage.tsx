
import Modal from '../../components/modal/Modal'
import Input from '../../components/input/Input'
import Btn from '../../components/button/Btn'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { setAccessToken } from '../../components/state/TokenAction';
import { setRefreshToken } from '../../components/state/TokenAction';
import { createLoginConfig } from '../../components/state/AxiosModule';
import {useAuthStore} from '../../components/state/Login';
import { LoginInfo } from '../../components/dto/Dto';

const test=
  {
    "pwd": "1234"
    ,"email":"2dd2dd@naver.c1om"
}

function Login() {
  const {isLogin, login } = useAuthStore();
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    pwd: ""
  });

  const handleInputChange = (key: keyof LoginInfo, value: string) => {
    setLoginInfo({
      ...loginInfo,
      [key]: value,
    });
  };
  useEffect(()=>{
    console.log(isLogin)
  },[isLogin])
  
  const submitInfo = async () => {
    const config = createLoginConfig(test); 
    try {
      const response = await axios(config);

      if (response.data.statusCode === 200) {
       
        const accessToken = response.headers['Access_Token'];
        const refreshToken =response.headers['Refresh_Token'];

        setAccessToken(accessToken);
        setRefreshToken(refreshToken)
        console.log(isLogin);
        login();
        
        
        console.log('성공', response.data);
      }
    } catch (error: any) {
      const { status, data } = error.response;

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
    <Modal size={"narrow"}>
      <div className="relative flex flex-col border  items-center border-solid border-black z-10 bg-white rounded-3xl">
        <div>
          <Btn className="mt-3 mb-3" size='small' txt='이미지'></Btn>
        </div>
        <div className="flex mb-3 flex-col ml-10 w-full">
          <Input  value={loginInfo.email}
          onChange={(value) => handleInputChange("email", value)} 
          size='full' className='mb-2' place={"이메일"}></Input>
          <Input value={loginInfo.pwd}
          onChange={(value) => handleInputChange("pwd", value)} 
          size='full' place={"비밀번호"}></Input>
        </div>
        <div className='w-full mb-2 pl-10 mr-10'>
          <Btn  handleBtn={submitInfo} className='w-full'  txt='로그인' size="big" ></Btn>
        </div>
        <div className='flex'>
          <Btn size='small' category='text' txt='아이디 찾기' txtColor='black'></Btn>
          <Btn size='small' category='text' txt='비밀번호 찾기' txtColor='black'></Btn>
          <Btn size='small' category='text' txt='회원가입' txtColor='black'></Btn>
        </div>
      </div>
    </Modal>
  )
}

export default Login