import axios from "axios";
import { create } from 'zustand';
import {createLoginConfig} from "./AxiosModule";
import { LoginInfo } from "../dto/Dto";
import { removeAccessToken, removeRefreshToken, setAccessToken, setNickName } from '../../components/state/TokenAction';
import { setRefreshToken } from '../../components/state/TokenAction';

// email
// :
// "test@gmail.com"
// nickname
// :
// "test"
// role
// :
// "ROLE_USER"
// seq
// :
// 10
// username
// :
// "TEST"
interface AuthStore  {
  isLogin: boolean;
  email: string;
  login: (loginInfo: LoginInfo) => void;
  logout: () => void;
  role:"admin"|"user"|undefined;
  setAuth: ({ email, nickname, role, username }: { email: string; nickname: string; role: string; username: string }) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  email: 'abcd1234@naver.com',
  role:undefined,
  setAuth: ({ email, nickname, role, username }) => {
    set({ isLogin: true, email, role: getRole(nickname) });
  },
  login: async (loginInfo: LoginInfo) => {
    const config  = createLoginConfig(loginInfo);
    try {
      const response = await axios(config);
      console.log(response.data)
      if (response.data.statusCode === 200) {
        removeAccessToken();
        removeRefreshToken();
        console.log(response.headers)
        console.log(response.data)
        const accessToken = response.headers['access_token'];
        console.log("accessToken",accessToken)
        const refreshToken = response.headers['refresh_token'];
        console.log("refreshToken",refreshToken)
        const nickName = response.data.nickname;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken)
        setNickName(nickName);
        set({role:getRole(nickName)});

        set({ isLogin: true });
        console.log('성공', response.data);
        
      }
    }  catch (error: unknown) {
      console.log(error)

    }
  },
  logout: () => {
    removeAccessToken();
    removeRefreshToken();
    set({role:undefined});
    set({ isLogin: false })},
}));

const getRole = (role:string) => {
  if(role === "admin"){
    return "admin";
  }else{
    return "user";
  }
}
