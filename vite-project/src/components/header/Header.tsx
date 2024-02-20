import  { useEffect, useState } from 'react'
import Btn from '../button/Btn';
import Modal from '../modal/Modal';
import Input from '../input/Input';
import { LoginInfo, SignInInfo } from '../dto/Dto';
import {createSignInConfig, createLogOutConfig, createGetUserInfoConfig} from '../state/AxiosModule';
import axios from 'axios';
import { useAuthStore } from '../state/Login';
import { useNavigate } from 'react-router-dom';
import {getAccessToken} from "../state/TokenAction";


interface headerProps{
  isLogin?:boolean
}
function Header({isLogin}:headerProps) {
  const {logout,role, setAuth} = useAuthStore();

  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [signInModal, setSigninModal] = useState<boolean>(false);
  const renderLoginModal = () =>{
    setLoginModal(true);
  }
  const renderSignInModal = () =>{
    setSigninModal(true);
  }

  const [signInInfo, setSignInInfo] = useState<SignInInfo>({
    name: "",
    pwd: "",
    email: "",
    checkPwd: "",
  });

  useEffect(() => {
    if (!isLogin) {
      const accessToken = getAccessToken();
      if (accessToken) {
        const config = createGetUserInfoConfig();
        axios(config)
          .then((response) => {
            if (response.status === 200) {
              setAuth(response.data);
            }
          })
          .catch((err) => {
            console.log(err, '로그인 정보 가져오기 실패');
          })
      }
    }
  }, [isLogin])
 

  const handleInputChange = (key: keyof SignInInfo, value: string) => {
    setSignInInfo({
      ...signInInfo,
      [key]: value,
    });
  };


  const submitSignInInfo = async () => {
    const config = createSignInConfig(signInInfo);
    try {
      const response = await axios(config);

      if (response.data.statusCode === 200) {

        console.log('성공', response.data);
      }
    } catch (err: unknown) {
      console.log(err)


    }
  };
  const logOut = async () =>{
    const config = createLogOutConfig();
    try {
      const response = await axios(config);
      console.log(response)
      if (response.data.statusCode === 200) {
        logout();
        console.log('성공', response.data);
      }
    } catch (err: unknown) {
      console.log(err)
      
    }
  }



  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    pwd: ""
  });
  const handleLoginInputChange = (key: keyof LoginInfo, value: string) => {
    setLoginInfo({
      ...loginInfo,
      [key]: value,
    });
  };
  useEffect(()=>{
    if(isLogin === true )
    {
      setLoginModal(false);
      setSigninModal(false);
    }
  },[isLogin])

  const {login } = useAuthStore();
  const submitInfo = async () => {
    login(loginInfo);
  };
  const navigate = useNavigate();
  const goMyPage = () =>{
    navigate("/myPage");
  }
  const goWirtePage = () =>{
    navigate("/write");
  }
  const goCheckUsersInfoPage = () =>{
    navigate("/admin/checkUsersInfo");
  }
  const goDashBoardPage = () =>{
    navigate("/admin/dashBoard");
  }
  const goMainPage = () =>{
    navigate("/");
  }
  return (
    <div className='flex justify-between items-center px-2 py-2 mb-2'>
      {/* 회원가입 모달 */}
      <Modal open={signInModal} onClose={() => setSigninModal(false)}>
        <div className="relative flex flex-col items-center z-10 rounded-3xl ">
          <div className=' py-5 text-2xl font-extrabold'>회원가입</div>
          <div className=" flex flex-col w-4/5">
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
            <Btn handleBtn={submitSignInInfo} className='w-full' txt='가입하기' size="big"></Btn>
          </div>
        </div>
      </Modal>

      {/* 로그인모달 */}
      <Modal size={"narrow"} open={loginModal} onClose={() => setLoginModal(false)}>
      <div className="relative flex flex-col w-full h-full items-center b z-10 bg-white rounded-3xl">
        <div className='mt-5'>
          <Btn className="mt-3 mb-3" size='small' txt='StartStudy'></Btn>
        </div>
        <div className="flex mb-3 mt-8 flex-col w-4/5">
          <Input value={loginInfo.email}
          onChange={(value) => handleLoginInputChange("email", value)} 
          size='full' className='mb-4' placeHolder={"이메일"}></Input>
          <Input value={loginInfo.pwd}  type='password'
          onChange={(value) => handleLoginInputChange("pwd", value)} 
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

      <div className='flex-grow text-center'>
      <Btn category='outlined' className='mr-4' handleBtn={goMainPage} txt="StartStudy" size="small"></Btn>
      </div>
      <div>
        {!isLogin && <div className='flex'>
          <Btn category='outlined' className='mr-4' handleBtn={renderLoginModal} txt="로그인" size="small"></Btn>
          <Btn category='outlined' handleBtn={renderSignInModal} buttonColor="headerBtn" txt="회원가입" size="small"></Btn>
        </div>}
        {isLogin && <div className='flex'>
          <Btn category='outlined' className='mr-4' handleBtn={logOut} size="small"  txt="로그아웃"></Btn>
          {role === "admin" &&<div className='mr-4'>
            <Btn category='outlined' className='mr-4' handleBtn={goCheckUsersInfoPage} size="small"  txt="회원 정보 조회"></Btn>
            <Btn category='outlined' handleBtn={goDashBoardPage} size="small"  txt="전체 글조회"></Btn>
          </div>
          }
          <Btn category='outlined' className='mr-4' handleBtn={goMyPage} size="small"  txt="마페"></Btn>
          <Btn category='outlined' handleBtn={goWirtePage} size="small"  txt="글쓰기"></Btn>
        </div>}
      </div>
    </div>

    

  )
}

function CustomLabel({text}: { text: string }) {
  return (
    <span className='text-sm text-neutral-400'>{text}</span>
  );
}

export default Header
