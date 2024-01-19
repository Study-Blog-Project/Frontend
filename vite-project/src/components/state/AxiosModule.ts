
import { AxiosRequestConfig } from "axios";
import { LoginInfo ,SignInInfo , WriteInfo} from "../dto/Dto";


//인스턴스만들기
//로그인돼있는지 , 토큰 만료검사 한 1분전쯤이면 리프래시토큰으로 재발급


export const createSignInConfig = (requestBody: SignInInfo): AxiosRequestConfig  => {
  const config:AxiosRequestConfig = {
    baseURL: `52.79.162.144:8080/sign`,
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    data: requestBody,
  };

  return config;
};

export const createLoginConfig = (requestBody: LoginInfo): AxiosRequestConfig => {
  const config: AxiosRequestConfig = {
    baseURL: 'http://52.79.162.144:8080',
    url: '/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: requestBody,
  };

  return config;
};

export const createWriteConfig = (requestBody: WriteInfo): AxiosRequestConfig => {
  const config: AxiosRequestConfig = {
    baseURL: 'http://52.79.162.144:8080',
    url: '/board/member/updateWrite',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: requestBody,
  };

  return config;
};
