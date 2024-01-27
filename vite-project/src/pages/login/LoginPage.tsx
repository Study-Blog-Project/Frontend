
import Modal from '../../components/modal/Modal'
import Input from '../../components/input/Input'
import Btn from '../../components/button/Btn'
import { useEffect, useState } from 'react';

import {useAuthStore} from '../../components/state/Login';
import { LoginInfo } from '../../components/dto/Dto';

const test=
{
  "email": "admin@naver.com",
  "pwd": "1234"
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
    console.log(test)
    login(test);
  };

  return (
    <Modal size={"narrow"} open={true}>
      <div className="relative flex flex-col w-full h-full items-center b z-10 bg-white rounded-3xl">
        <div className='mt-5'>
          <Btn className="mt-3 mb-3" size='small' txt='이미지'></Btn>
        </div>
        <div className="flex mb-3 mt-8 flex-col justify-center ml-5 w-full">
          <Input value={loginInfo.email}
          onChange={(value) => handleInputChange("email", value)} 
          size='full' className='mb-4' placeHolder={"이메일"}></Input>
          <Input value={loginInfo.pwd}
          onChange={(value) => handleInputChange("pwd", value)} 
          size='full' placeHolder={"비밀번호"}></Input>
        </div>
        <div className='w-full mb-2 mt-10 pl-10 mr-10'>
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
