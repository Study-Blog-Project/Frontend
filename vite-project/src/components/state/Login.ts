import axios from "axios";
import { create } from 'zustand';
import {createLoginConfig} from "./AxiosModule";
import { LoginInfo } from "../dto/Dto";
import { removeAccessToken, removeRefreshToken, setAccessToken, setNickName } from '../../components/state/TokenAction';
import { setRefreshToken } from '../../components/state/TokenAction';

interface AuthStore  {
  isLogin: boolean;
  email: string;
  login: (loginInfo: LoginInfo) => void;
  logout: () => void;
  role:"admin"|"user"|undefined;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  email: 'abcd1234@naver.com',
  role:undefined,
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
        if(nickName === "admin"){
          set({role:"admin"});
          console.log("관리자계정으로 로그인하셨습니다!")
        }else{
          set({role:"user"});
        }
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

