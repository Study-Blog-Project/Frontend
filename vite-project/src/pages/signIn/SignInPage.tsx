
import Modal from '../../components/modal/Modal'
import Input from '../../components/input/Input'
import Btn from '../../components/button/Btn'
import {  useState } from 'react';
import axios from 'axios';
import { SignInInfo } from '../../components/dto/Dto';
import { createSignInConfig } from '../../components/state/AxiosModule';

const test=
  {
    "name": "김구",
    "pwd": "1234"
    ,"email":"2dd2dd4@naver.c1om"
    ,"checkPwd":"1234"
}


function SignIn (){

  const [signInInfo, setSignInInfo] = useState<SignInInfo>({
    name: "",
    pwd: "",
    email: "",
    checkPwd: "",
  });

  const handleInputChange = (key: keyof SignInInfo, value: string) => {
    setSignInInfo({
      ...signInInfo,
      [key]: value,
    });
  };


  const submitInfo = async () => {
    const config = createSignInConfig(test); 
    try {
      const response = await axios(config);

      if (response.data.statusCode === 200) {
          
        console.log('성공', response.data);
      }
    } catch (error: any) {
      const { data } = error.response;
      console.log(data.message);
     
    }
  };
  return (
    <Modal>
        <div className="relative flex flex-col border  items-center border-solid border-black z-10 bg-white rounded-3xl ">
          <div className=' py-5 text-2xl font-extrabold'>회원가입</div>
          <div className=" flex flex-col w-full ml-10">
          <CustomLabel text={"이름"}></CustomLabel>
            <Input value={signInInfo.name}
          onChange={(value) => handleInputChange("name", value)}
           size="full" className='mb-4'>
           </Input>
          <CustomLabel text={"이메일"}></CustomLabel>
            <Input value={signInInfo.email}
          onChange={(value) => handleInputChange("email", value)}
           size="full"  className='mb-4'></Input>
          <CustomLabel text={"비밀번호"}></CustomLabel>
            <Input value={signInInfo.pwd}  type='password'
          onChange={(value) => handleInputChange("pwd", value)}
           size="full"  className='mb-4'></Input>
          <CustomLabel text={"비밀번호 확인"}></CustomLabel>
            <Input value={signInInfo.checkPwd}  type='password'
          onChange={(value) => handleInputChange("checkPwd", value)}
           size="full"  className='mb-4'></Input>
          </div>
          <div className='w-full mb-2 pl-10 mr-10'>
            <Btn handleBtn={submitInfo} className='w-full' txt='가입하기' size="big" ></Btn>
          </div>
        </div>
        
    </Modal>
  )
}

function CustomLabel( { text }: { text: string }) {
  return (
    <span className='text-sm text-neutral-400'>{text}</span>
  );
}


export default SignIn;