
import { AxiosRequestConfig } from "axios";
import { LoginInfo ,SignInInfo , WritePostInfo,MainListInfo,ReadPostInfo} from "../dto/Dto";
import { getAccessToken, getRefreshToken } from "./TokenAction";


//인스턴스만들기
//로그인돼있는지 , 토큰 만료검사 한 1분전쯤이면 리프래시토큰으로 재발급





export const createSignInConfig = (requestBody: SignInInfo): AxiosRequestConfig => {
  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: '/sign',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: requestBody,
  };

  return config;
};

// export const createLoginConfig = (requestBody: LoginInfo): AxiosRequestConfig => {
//   const config: AxiosRequestConfig = {
//     baseURL: 'http://54.180.21.153',
//     url: '/get',
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json',
//     },
    
//     withCredentials: true,
//   };

//   return config;
// };
export const createLoginConfig = (requestBody: LoginInfo): AxiosRequestConfig => {
  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080',
    url: '/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: requestBody,
    withCredentials: true,
  };

  return config;
};


export const createWriteConfig = (requestBody: WritePostInfo): AxiosRequestConfig => {
  const refresh = getRefreshToken();
  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153',
    url: '/board/member/writing',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${refresh}`,
      'Content-Type': 'application/json',
    },
    data: requestBody,
  };

  return config;
};

export const createMainlistConfig = (requestBody:MainListInfo ): AxiosRequestConfig => {
  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080',
    url: '/',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',

    },
    data: requestBody,
    withCredentials: true,
  };

  return config;
};


export const createReadPostConfig = (requestBody: ReadPostInfo): AxiosRequestConfig => {
  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/board/${requestBody.boardId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: requestBody,
  };

  return config;
};