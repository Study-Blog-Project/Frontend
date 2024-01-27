import Modal from '../../components/modal/Modal'
import Input from '../../components/input/Input'
import Btn from '../../components/button/Btn'
import {useState} from 'react';
import axios, { AxiosError } from 'axios';
import {SignInInfo} from '../../components/dto/Dto';
import {createSignInConfig} from '../../components/state/AxiosModule';

const test =
  {
    "name": "김구",
    "pwd": "1234"
    , "email": "2dd2dd4@naver.c1om"
    , "checkPwd": "1234"
  }


function SignIn() {

  const [signInInfo, setSignInInfo] = useState<SignInInfo>({
    name: "",
    pwd: "",
    email: "",
    checkPwd: "",
  });
  const [open, setOpen] = useState<boolean>(false);

  const handleInputChange = (key: keyof SignInInfo, value: string) => {
    setSignInInfo({
      ...signInInfo,
      [key]: value,
    });
  };


  const submitInfo = async () => {
    const config = createSignInConfig(signInInfo);
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
    // axios.post('http://54.180.21.153:8080/sign', {
    //   test
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  };
  return (
    <>
      <Btn onClick={() => {
        setOpen(true);
        console.log('open');
      }} txt={"회원가입오픈"}/>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="relative flex flex-col items-center z-10 rounded-3xl ">
          <div className=' py-5 text-2xl font-extrabold'>회원가입</div>
          <div className=" flex flex-col w-full">
            <CustomLabel text={"이름"}></CustomLabel>
            <Input value={signInInfo.name}
                   onChange={(value) => handleInputChange("name", value)}
                   size="full" className='mb-4'>
            </Input>
            <CustomLabel text={"이메일"}></CustomLabel>
            <Input value={signInInfo.email}
                   onChange={(value) => handleInputChange("email", value)}
                   size="full"
                   className='mb-4'></Input>
            <CustomLabel text={"비밀번호"}></CustomLabel>
            <Input value={signInInfo.pwd} type='password'
                   onChange={(value) => handleInputChange("pwd", value)}
                   size="full" className='mb-4'></Input>
            <CustomLabel text={"비밀번호 확인"}></CustomLabel>
            <Input value={signInInfo.checkPwd} type='password'
                   onChange={(value) => handleInputChange("checkPwd", value)}
                   size="full" className='mb-4'></Input>
          </div>
          <div className='w-full mb-2 pl-10 mr-10'>
            <Btn handleBtn={submitInfo} className='w-full' txt='가입하기' size="big"></Btn>
          </div>
        </div>
      </Modal>
    </>
  )
}

function CustomLabel({text}: { text: string }) {
  return (
    <span className='text-sm text-neutral-400'>{text}</span>
  );
}


export default SignIn;
