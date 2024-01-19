import axios from "axios";
import { create } from 'zustand';
import {createLoginConfig} from "./AxiosModule";

interface AuthStore  {
  isLogin: boolean;
  email: string;
  role: 'ADMIN' | 'USER' | 'GUEST';
  login: (email, password) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  email: 'abcd1234@naver.com',
  role: 'GUEST',
  login: (email, password) => {
    // axios.post('/auth/login', {
    //   email,
    //   password
    // }, createLoginConfig()).then((res) => {
    //   console.log(res);
    //   set({ isLogin: true });
    // }).catch((err) => {
    //   console.log(err);
    // });
  },
  logout: () => set({ isLogin: false }),
}));

