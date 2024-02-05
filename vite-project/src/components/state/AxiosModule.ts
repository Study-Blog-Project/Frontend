
import axios, { AxiosRequestConfig } from "axios";
import { LoginInfo ,SignInInfo , WritePostInfo,MainListInfo,ReadPostInfo,UserPostInfo, UserListRequestInfo, ModifyPostInfo, DeletePostInfo, ModifyUserInfo, AddParentCommentInfo} from "../dto/Dto";
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
  const refresh = getRefreshToken()
  const access = getAccessToken()
  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080',
    url: '/board/member/writing',
    method: 'POST',
    headers: {
      'Access_Token': access,
      'Refresh-Token': refresh,
      'Content-Type': 'application/json',
    },
    data: requestBody,
  };

  return config;
};

// export const createMainlistConfig = (requestBody:any): AxiosRequestConfig => {
//   const config: AxiosRequestConfig = {
//     baseURL: 'http://54.180.21.153:8080',
//     url: '/',
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     params: requestBody,
//     withCredentials: true,
//   };

//   return config;
// };
export const createMainlistConfig = (requestBody:any): AxiosRequestConfig => {
  const refresh = getRefreshToken()
  const access = getAccessToken()
  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080',
    url: '/',
    method: 'GET',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    params: requestBody,
    withCredentials: true,
  };

  return config;
};

export const createReadPostConfig = (requestBody: string): AxiosRequestConfig => {
  const refresh = getRefreshToken()
  const access = getAccessToken()
  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/board/${requestBody}`,
    method: 'GET',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  return config;
};

export const createUserPostConfig = (requestBody: UserListRequestInfo): AxiosRequestConfig => {
  const { recruit, category, order } = requestBody;
  const access = getAccessToken();
  const refresh = getRefreshToken();
  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/user/list`,
    method: 'GET',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    params: {
      recruit,
      category,
      order,
    },
    withCredentials: true,
  };

  return config;
};

export const createModifyPostConfig = (requestBody: ModifyPostInfo): AxiosRequestConfig => {

  const access = getAccessToken();
  const refresh = getRefreshToken();

  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/board/member/updateWrite`,
    method: 'PATCH',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    data: requestBody,
    withCredentials: true,
  };

  return config;
};

export const createRemovePostConfig = (requestBody: DeletePostInfo): AxiosRequestConfig => {

  const access = getAccessToken();
  const refresh = getRefreshToken();

  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/board/member/delete`,
    method: 'DELETE',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    params: requestBody,
    withCredentials: true,
  };

  return config;
};

export const createGetUserInfoConfig = (): AxiosRequestConfig => {

  const access = getAccessToken();
  const refresh = getRefreshToken();

  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/user/info`,
    method: 'GET',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  return config;
};


export const createModifyUserInfoConfig = (requestBody:ModifyUserInfo): AxiosRequestConfig => {

  const access = getAccessToken();
  const refresh = getRefreshToken();

  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/user/info/update`,
    method: 'PATCH',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    data: requestBody,
    withCredentials: true,
  };

  return config;
};

export const createAddCommentConfig = (requestBody:AddParentCommentInfo): AxiosRequestConfig => {

  const access = getAccessToken();
  const refresh = getRefreshToken();

  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/reply/insertReply`,
    method: 'POST',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    data: requestBody,

  };

  return config;
};

export const createModifyCommentConfig = (requestBody:ModifyUserInfo): AxiosRequestConfig => {

  const access = getAccessToken();
  const refresh = getRefreshToken();

  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/reply/updateReply`,
    method: 'PATCH',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    data: requestBody,
    withCredentials: true,
  };

  return config;
};

export const createDeleteCommentConfig = (requestBody:ModifyUserInfo): AxiosRequestConfig => {

  const access = getAccessToken();
  const refresh = getRefreshToken();

  const config: AxiosRequestConfig = {
    baseURL: 'http://54.180.21.153:8080', 
    url: `/reply/deleteReply`,
    method: 'DELETE',
    headers: {
      'Access_Token': access,
      'Refresh_Token': refresh,
      'Content-Type': 'application/json',
    },
    data: requestBody,
    withCredentials: true,
  };

  return config;
};

