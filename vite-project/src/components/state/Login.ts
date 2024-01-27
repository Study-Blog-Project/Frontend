import axios from "axios";
import { create } from 'zustand';
import {createLoginConfig} from "./AxiosModule";
import { LoginInfo } from "../dto/Dto";
import { setAccessToken } from '../../components/state/TokenAction';
import { setRefreshToken } from '../../components/state/TokenAction';

interface AuthStore  {
  isLogin: boolean;
  email: string;
  role: 'ADMIN' | 'USER' | 'GUEST';
  login: (loginInfo: LoginInfo) => void;
  logout: () => void;

}

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  email: 'abcd1234@naver.com',
  role: 'GUEST',
 
  login: async (loginInfo: LoginInfo) => {
    const config  = createLoginConfig(loginInfo);
    try {
      const response = await axios(config);

      if (response.data.statusCode === 200) {
       
        const accessToken = response.headers['Access_Token'];
        const refreshToken =response.headers['Refresh_Token'];

        setAccessToken(accessToken);
        setRefreshToken(refreshToken)
        set({ isLogin: true });
        console.log('성공', response.data);
      }
    }  catch (error: any) {
      console.log(error)
      if (error.response) {
        const { status, message } = error.response;
        console.log(status)
        console.log(message)
        if (status === 404) {
          if (message === '사용자를 찾지 못했습니다.') {
            console.error('User not found.');
          } else {
            console.error(message);
          }
        }
      } 
    }
  },
  logout: () => set({ isLogin: false }),
}));

